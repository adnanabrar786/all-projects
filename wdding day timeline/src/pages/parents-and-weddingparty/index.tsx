import { Grid, Stack } from '@mui/material';
import { Category, CategoryType } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLoader } from 'components/common/AppLoader';
import NewTopComponent from 'components/common/NewTopComponent';
import CustomText from 'components/pages/home/NewDashboard/CustomText';
import GuestCardForm from 'components/pages/parents-vendors/GuestCardForm';
import GuestVendorCard from 'components/pages/parents-vendors/GuestVendorCard';
import GuestVendorCardAccordion from 'components/pages/parents-vendors/GuestVendorCardAccordion';
import Layout from 'components/ui/Layout';
import prisma from 'config/prisma';
import useGetQuery from 'hooks/useGetQuery';
import { ICreateGuestBody } from 'interfaces/guests';
import { PageProps } from 'interfaces/pages';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import GuestService from 'services/guest.service';
import { useCoupleInfo } from 'state/useCouple';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { submitImageGuest } from 'utils/submitImage';
import { errorToast } from 'utils/toast';
import { getGuestVendorType } from 'utils/types/guest-vendors';

type Props = PageProps & {
  types: Category[];
};

type Couple = {
  id: number;
  name: string;
  image: string;
  fullName: string;
  wedding_id: number;
};

const guestService = new GuestService();

export default function Page({ types }: Props) {
  const queryClient = useQueryClient();
  const [isLoadingBottom, setIsLoadingBottom] = useState(true);
  const [primaryCouple, setPrimaryCouple] = useState<Couple | null>(null);
  const [secondaryCouple, setSecondaryCouple] = useState<Couple | null>(null);
  const [primaryGuests, setPrimaryGuests] = useState<null | any[]>(null);
  const [secondaryGuests, setSecondaryGuests] = useState<null | any[]>(null);
  const coupleInfo = useCoupleInfo();

  const [showPrimaryAddGuestForm, setShowPrimaryAddGuestForm] = useState(false);
  const [showSecondaryAddGuestForm, setShowSecondaryAddGuestForm] = useState(false);

  const togglePrimaryForm = () => setShowPrimaryAddGuestForm(!showPrimaryAddGuestForm);
  const toggleSecondaryForm = () => setShowSecondaryAddGuestForm(!showSecondaryAddGuestForm);

  const getGuests = useGetQuery(
    { key: REACT_QUERY_KEYS.GUEST, params: primaryCouple && primaryCouple.id },
    {
      onSuccess: (res) => {
        if (primaryCouple && primaryCouple.id) {
          const guests = res.data.data;

          const getGuestsForCouple = (couple) => {
            return guests.filter((guest) => guest.guest.couple_id == couple);
          };

          setPrimaryGuests(getGuestsForCouple(primaryCouple.id));
          setSecondaryGuests(getGuestsForCouple(secondaryCouple!.id));
        }
      },
      onError(error) {
        errorToast(ERROR_MESSAGES.GETTING_GUEST);
      },
    },
  );

  useEffect(() => {
    if (!coupleInfo.isInit && !coupleInfo.coupleInfo) {
      errorToast(coupleInfo.error?.message!);
      return;
    }

    const couples = coupleInfo.coupleInfo;
    let primaryCouple;
    let secondaryCouple;
    if (couples) {
      primaryCouple = couples.find((couple) => couple.createdBy === couple.user_id);
      secondaryCouple = couples.find((couple) => couple.createdBy !== couple.user_id);

      const setCoupleState = (couple, setState) => {
        if (couple) {
          setState({
            id: couple.id,
            name: couple.user.first_name,
            image: couple?.user?.picture,
            fullName: `${couple.user.first_name} ${couple.user.last_name}`,
            wedding_id: couple.wedding_id,
          });
        }
      };

      setCoupleState(primaryCouple, setPrimaryCouple);
      setCoupleState(secondaryCouple, setSecondaryCouple);
    }
  }, [coupleInfo.coupleInfo, coupleInfo.isInit]);

  const createGuest = useMutation(guestService.CreateGuest, {
    onSuccess: ({ data }) => {
      const couple_id = data.data.couple_id;
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GUEST] });
      if (couple_id === primaryCouple!.id) {
        togglePrimaryForm();
        return;
      }
      toggleSecondaryForm();
    },
    onError(error: any) {
      const err = error;
      if (err?.response?.status === 400) {
        errorToast(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
        return;
      }
      errorToast(err.message);
    },
  });

  const updateGuest = useMutation(guestService.UpdateGuest, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GUEST] });
    },
    onError(error: any) {
      const err = error;
      if (err?.response?.status === 400) {
        errorToast(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
        return;
      }
      errorToast(err.message);
    },
  });

  const deleteGuest = useMutation(guestService.DeleteGuest, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GUEST] });
    },
    onError(error: any) {
      const err = error;
      if (err?.response?.status === 400) {
        errorToast(ERROR_MESSAGES.DELETE_GUEST);
        return;
      }
      errorToast(err.message);
    },
  });

  const onSubmit = async (values: {
    email: string;
    phone?: string | null;
    picture?: File | null;
    id: number | null;
    couple_id: number;
    roles: Category[];
    first_name: string;
    last_name?: string;
    pictureName?: string | null;
    guest_has_wedding?: number;
  }) => {
    const body: ICreateGuestBody = {
      data: {
        couple_id: values.couple_id,
        picture: values.pictureName ? values.pictureName : null,
        last_name: values.last_name,
        first_name: values.first_name,
        wedding_id: primaryCouple!.wedding_id,
        phone: values.phone ? values.phone : null,
        email: values.email ? values.email.toLowerCase() : null,
        categories: [...values.roles.map((i) => Number(i.id))],
      },
    };

    if (values.phone) {
      body['data'] = { ...body.data, phone: values.phone };
    }

    let imageKey;
    if (values.picture && (!values.pictureName!.includes('https') || !values.pictureName)) {
      imageKey = await submitImageGuest(values.picture, values.first_name, values.pictureName!, 'profile');
      body['data'].picture = imageKey;
    }

    if (values.id && values.guest_has_wedding) {
      updateGuest.mutate({
        data: {
          id: values.id,
          phone: body.data.phone,
          email: body.data.email,
          picture: body.data.picture,
          first_name: body.data.first_name,
          last_name: body.data.last_name,
          categories: body.data.categories,
          guest_has_wedding: values.guest_has_wedding,
          couple_id: values.couple_id,
          wedding_id: primaryCouple!.wedding_id,
        },
      });
      return;
    }

    createGuest.mutate(body);
  };

  const RenderAccordion = ({
    id,
    guest,
    index,
    couple_id,
    categories,
    itemBackgroundColor,
  }: {
    id: number;
    index: number;
    couple_id: number;
    categories: number[];
    itemBackgroundColor?: string;
    guest: {
      id: number;
      first_name: string;
      last_name: string | null;
      email: string;
      phone: string | null;
      picture: string | null;
    };
  }) => {
    const [deleteBox, setDeleteBox] = useState(false);
    return (
      <GuestVendorCardAccordion
        index={index}
        address={null}
        email={guest.email}
        deleteBox={deleteBox}
        key={guest.first_name}
        phone_no={guest.phone ?? ''}
        picture={guest.picture}
        itemBackgroundColor={itemBackgroundColor}
        name={`${guest.first_name} ${guest.last_name}`}
        title={getGuestVendorType(types, categories)}
        form={(toggleAccordion) => (
          <GuestCardForm
            key={guest.email}
            guest_types={types}
            deleteBox={deleteBox}
            setDeleteBox={setDeleteBox}
            handleCancel={toggleAccordion}
            onDelete={(id) => {
              deleteGuest.mutate({
                data: {
                  id,
                },
              });
            }}
            onSubmit={(values) => onSubmit({ ...values, guest_has_wedding: id, couple_id: couple_id })}
            guest={{
              id: guest.id,
              email: guest.email,
              phone: guest.phone,
              picture: guest.picture || '',
              last_name: guest.last_name ?? '',
              first_name: guest.first_name,
              roles: types.filter((i) => categories.includes(i.id)),
            }}
          />
        )}
      />
    );
  };

  return (
    <Stack>
      {getGuests.isLoading || !primaryCouple ? (
        <Stack
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppLoader
            sx={{
              color: '#fff',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
              '& .MuiCircularProgress-circleStatic': {
                strokeLinecap: 'round',
              },
            }}
            size={40}
          />
        </Stack>
      ) : (
        <div className="overflow-y-auto w-full h-[85vh]">
          <Stack sx={{ p: { lg: '0px 63px', xs: '0px 16px' } }}>
            <NewTopComponent />
          </Stack>
          <Grid
            container
            spacing={{ xs: 0, lg: 3 }}
            sx={{
              justifyContent: 'center',
              padding: { lg: '0px 63px', xs: '0px 16px' },
            }}
          >
            <Grid
              item
              sm={10}
              xs={12}
              md={7}
              lg={6}
              sx={{
                gap: '12px',
                marginTop: '0.75rem',
                alignItems: { lg: 'flex-start', xs: 'center' },
                justifyContent: { lg: 'space-between', xs: 'center' },
              }}
            >
              <CustomText
                text="Wedding Party, Parents & Family"
                sx={{
                  color: '#512F6F',
                  fontSize: '0.875rem',
                  width: '21rem',
                  margin: '.5rem auto !important',
                  fontWeight: '600',
                  letterSpacing: '0.00875rem',
                  lineHeight: 'normal',
                  display: { lg: 'none', xs: 'block' },
                }}
              />

              <GuestVendorCard
                img={primaryCouple.image}
                toggleForm={togglePrimaryForm}
                showNewform={showPrimaryAddGuestForm}
                couple_name={`${primaryCouple.name}'s Wedding Party & Family`}
                sxContainer={{ margin: '0.75rem auto' }}
                addButtonText={`Add to Wedding Party`}
                newForm={(expanded) =>
                  !showPrimaryAddGuestForm ? (
                    <></>
                  ) : (
                    <Stack
                      sx={{
                        pb: '24px',
                        backgroundColor: 'rgba(243, 243, 243, 1)',
                        borderBottomRightRadius: {
                          lg: '0px',
                          xs: showPrimaryAddGuestForm && expanded ? '0px' : '16px',
                        },
                        borderBottomLeftRadius: { lg: '0px', xs: showPrimaryAddGuestForm && expanded ? '0px' : '16px' },
                      }}
                    >
                      <Stack
                        sx={{
                          height: '40px',
                          justifyContent: 'center',
                          borderBottom: '1px solid #EAEAEA',
                        }}
                      >
                        <CustomText
                          text={'Add Family Member'}
                          sx={{
                            fontSize: '12px',
                            color: 'var(--Neutral, rgba(0, 0, 0, 0.40))',
                            lineHeight: '18px',
                            fontWeight: '400',
                            textAlign: 'center',
                          }}
                        />
                      </Stack>
                      <GuestCardForm
                        sxContainer={{ px: 2 }}
                        guest={null}
                        guest_types={types}
                        handleCancel={togglePrimaryForm}
                        onSubmit={(values) =>
                          onSubmit({
                            ...values,
                            couple_id: primaryCouple.id,
                          })
                        }
                      />
                    </Stack>
                  )
                }
              >
                <>
                  {primaryGuests &&
                    primaryGuests.map(({ id, guest, categories }, index) => (
                      <RenderAccordion
                        id={id}
                        key={index}
                        index={index}
                        guest={guest}
                        categories={categories}
                        couple_id={primaryCouple.id}
                      />
                    ))}
                </>
              </GuestVendorCard>
            </Grid>
            <Grid
              item
              sm={10}
              xs={12}
              md={7}
              lg={6}
              sx={{
                marginTop: { lg: '0.75rem', xs: '0px' },
                justifyContent: { lg: 'space-between', xs: 'center' },
                alignItems: { lg: 'flex-start', xs: 'center' },
                gap: '12px',
              }}
            >
              <GuestVendorCard
                img={secondaryCouple!.image}
                itemBackgroundColor="bg-[#C8A2C8]"
                toggleForm={toggleSecondaryForm}
                addButtonText={`Add to Wedding Party`}
                showNewform={showSecondaryAddGuestForm}
                sxContainer={{ margin: '0.75rem auto' }}
                couple_name={`${secondaryCouple!.name}'s Wedding Party & Family`}
                newForm={(expanded) =>
                  !showSecondaryAddGuestForm ? (
                    <></>
                  ) : (
                    <Stack
                      sx={{
                        pb: '24px',
                        backgroundColor: 'rgba(243, 243, 243, 1)',

                        borderBottomRightRadius: {
                          lg: '0px',
                          xs: showSecondaryAddGuestForm && expanded ? '0px' : '16px',
                        },
                        borderBottomLeftRadius: {
                          lg: '0px',
                          xs: showSecondaryAddGuestForm && expanded ? '0px' : '16px',
                        },
                      }}
                    >
                      <Stack
                        sx={{
                          height: '40px',
                          justifyContent: 'center',
                          borderBottom: '1px solid #EAEAEA',
                        }}
                      >
                        <CustomText
                          text={'Add Family Member'}
                          sx={{
                            fontSize: '12px',
                            color: 'var(--Neutral, rgba(0, 0, 0, 0.40))',
                            lineHeight: '18px',
                            fontWeight: '400',
                            textAlign: 'center',
                          }}
                        />
                      </Stack>
                      <GuestCardForm
                        sxContainer={{ px: 2 }}
                        guest={null}
                        guest_types={types}
                        handleCancel={toggleSecondaryForm}
                        onSubmit={(values) =>
                          onSubmit({
                            ...values,
                            couple_id: secondaryCouple!.id,
                          })
                        }
                      />
                    </Stack>
                  )
                }
              >
                <>
                  {secondaryGuests &&
                    secondaryGuests.map(({ id, guest, categories }, index) => (
                      <RenderAccordion
                        id={id}
                        key={index}
                        index={index}
                        guest={guest}
                        categories={categories}
                        couple_id={secondaryCouple!.id}
                        itemBackgroundColor={'#C8A2C8'}
                      />
                    ))}
                </>
              </GuestVendorCard>
            </Grid>
          </Grid>
        </div>
      )}
    </Stack>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading="Parents & Wedding Party">{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
  const types = await prisma.category.findMany({
    select: {
      id: true,
      type: true,
      label: true,
    },
    where: {
      type: { equals: CategoryType.GUESTS },
    },
  });

  return {
    props: {
      types: types,
    },
    revalidate: 86400,
  };
};
