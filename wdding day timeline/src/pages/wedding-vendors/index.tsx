import { Grid, Stack } from '@mui/material';
import { Category, CategoryType, Wedding } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLoader } from 'components/common/AppLoader';
import NewTopComponent from 'components/common/NewTopComponent';
import CustomText from 'components/pages/home/NewDashboard/CustomText';
import GuestVendorCard from 'components/pages/parents-vendors/GuestVendorCard';
import GuestVendorCardAccordion from 'components/pages/parents-vendors/GuestVendorCardAccordion';
import VendorCardForm from 'components/pages/parents-vendors/VendorCardForm';
import Layout from 'components/ui/Layout';
import useGetQuery from 'hooks/useGetQuery';
import { PageProps } from 'interfaces/pages';
import { ICreateVendorBody } from 'interfaces/vendor';
import prisma from 'config/prisma';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import VendorService from 'services/vendortype.service';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { submitImageVendor } from 'utils/submitImage';
import { errorToast } from 'utils/toast';
import { getGuestVendorType } from 'utils/types/guest-vendors';

type Props = PageProps & {
  types: Category[];
};

const vendorService = new VendorService();

export default function Page({ types }: Props) {
  const queryClient = useQueryClient();
  const [vendors, setVendors] = useState<null | any[]>(null);
  const [weddingDetails, setWeddingDetails] = useState<Wedding | null>(null);
  const [isLoadingBottom, setIsLoadingBottom] = useState(true);
  const [showAddVendorForm, setShowAddVendorForm] = useState(false);

  const toggleForm = () => setShowAddVendorForm(!showAddVendorForm);

  useGetQuery(
    { key: REACT_QUERY_KEYS.WEDDING_DETAILS },
    {
      onSuccess(data) {
        if (data) {
          setWeddingDetails(data.data.data);
        }
      },
    },
  );

  const getVendors = useGetQuery(
    { key: REACT_QUERY_KEYS.VENDOR },
    {
      onSuccess: (res) => {
        setVendors(res.data.data);
      },
      onError(error) {
        errorToast(ERROR_MESSAGES.GETTING_VENDORS);
      },
    },
  );

  const createVendor = useMutation(vendorService.CreateVendor, {
    onSuccess: () => {
      toggleForm();
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.VENDOR] });
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

  const updateVendor = useMutation(vendorService.UpdateVendor, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.VENDOR] });
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

  const deleteVendor = useMutation(vendorService.DeleteVendor, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.VENDOR] });
    },
    onError(error: any) {
      const err = error;
      if (err?.response?.status === 400) {
        errorToast(ERROR_MESSAGES.DELETING_VENDOR);
        return;
      }
      errorToast(err.message);
    },
  });

  const onSubmit = async (values: {
    name: string;
    email: string;
    phone?: string | null;
    picture?: File | null;
    address?: string | null;
    roles: Category[];
    id: number | null;
    pictureName?: string;
    vendor_has_wedding: number | null;
  }) => {
    const body: ICreateVendorBody = {
      data: {
        name: values.name,
        picture: values.pictureName ? values.pictureName : null,
        wedding_id: weddingDetails!.id,
        phone: values.phone ? values.phone : null,
        address: values.address ? values.address : null,
        categories: [...values.roles.map((i) => Number(i.id))],
        email: values.email ? values.email.toLowerCase() : null,
      },
    };

    if (values.phone) {
      body['data'] = { ...body.data, phone: values.phone };
    }
    let imageKey;
    if (values.picture && (!values.pictureName!.includes('https') || !values.pictureName)) {
      imageKey = await submitImageVendor(values.picture, values.name, values.pictureName!, 'profile');
      body['data'].picture = imageKey;
    }

    if (values.id && values.vendor_has_wedding) {
      updateVendor.mutate({
        data: {
          id: values.id,
          name: body.data.name,
          email: body.data.email,
          phone: body.data.phone,
          picture: body.data.picture,
          address: body.data.address,
          categories: body.data.categories,
          vendor_has_wedding: values.vendor_has_wedding,
        },
      });
      return;
    }

    createVendor.mutate(body);
  };

  const RenderAccordion = ({
    id,
    index,
    vendor,
    categories,
  }: {
    id: number;
    index: number;
    categories: number[];
    vendor: { id: number; name: string; email: string; address: string; phone: string | null; picture: string | null };
  }) => {
    const [deleteBox, setDeleteBox] = useState(false);
    return (
      <GuestVendorCardAccordion
        index={index}
        key={vendor.name}
        name={vendor.name}
        email={vendor.email}
        deleteBox={deleteBox}
        phone_no={vendor.phone ?? ''}
        address={vendor.address}
        picture={vendor.picture}
        title={getGuestVendorType(types, categories)}
        form={(toggleAccordion) => (
          <VendorCardForm
            key={vendor.name}
            vendor_types={types}
            deleteBox={deleteBox}
            setDeleteBox={setDeleteBox}
            handleCancel={toggleAccordion}
            onSubmit={(values) => onSubmit({ ...values, vendor_has_wedding: id })}
            onDelete={(id) => {
              deleteVendor.mutate({
                data: {
                  id: id,
                },
              });
            }}
            vendor={{
              id: vendor.id,
              name: vendor.name,
              email: vendor.email,
              phone: vendor.phone,
              address: vendor.address,
              picture: vendor.picture || '',
              roles: types.filter((i) => categories.includes(i.id)),
            }}
          />
        )}
      />
    );
  };

  return (
    <Stack>
      {getVendors.isLoading && !vendors ? (
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: { lg: '0px 63px', xs: '0px 16px' },
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
                marginTop: '1.75rem',
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
                img={null}
                toggleForm={toggleForm}
                showNewform={showAddVendorForm}
                addButtonText={'Add Vendors'}
                sxContainer={{ margin: '0.75rem auto' }}
                couple_name={'Wedding Vendors & Venues'}
                newForm={(expanded) =>
                  !showAddVendorForm ? (
                    <></>
                  ) : (
                    <Stack
                      sx={{
                        pb: '24px',
                        backgroundColor: 'rgba(243, 243, 243, 1)',
                        borderBottomRightRadius: { lg: '0px', xs: showAddVendorForm && expanded ? '0px' : '16px' },
                        borderBottomLeftRadius: { lg: '0px', xs: showAddVendorForm && expanded ? '0px' : '16px' },
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
                          text={'Add Vendor'}
                          sx={{
                            fontSize: '12px',
                            color: 'var(--Neutral, rgba(0, 0, 0, 0.40))',
                            lineHeight: '18px',
                            fontWeight: '400',
                            textAlign: 'center',
                          }}
                        />
                      </Stack>
                      <VendorCardForm
                        sxContainer={{ px: 2 }}
                        vendor={null}
                        onSubmit={(value) => onSubmit({ ...value, vendor_has_wedding: null })}
                        vendor_types={types}
                        handleCancel={toggleForm}
                      />
                    </Stack>
                  )
                }
              >
                <>
                  {vendors &&
                    vendors.map(({ id, vendor, categories }, index: number) => (
                      <RenderAccordion key={index} index={index} id={id} vendor={vendor} categories={categories} />
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
  return <Layout heading="Wedding Vendors">{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
  const types = await prisma.category.findMany({
    select: {
      id: true,
      type: true,
      label: true,
    },

    where: {
      type: { equals: CategoryType.VENDOR },
    },
  });

  return {
    props: { types },
    revalidate: 86400,
  };
};
