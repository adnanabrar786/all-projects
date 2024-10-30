import { Stack, SxProps } from '@mui/material';
import { API_KEY_GOOGLE_MAPS } from 'config/environment';
import Image from 'next/image';
import { SyntheticEvent, useEffect, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { CiLocationOn } from 'react-icons/ci';
import { GetLocationPlaceName } from 'services/location.service';

type Props = {
  setValue?: any;
  error?: string;
  val?: string;
  setIsLoading?: any;
  sx?: SxProps;
  icon?: boolean;
  inputStyle?: React.CSSProperties;
  disabled?: boolean;
};

const MapFieldCopy = ({ setValue, error, val, setIsLoading, sx, icon, inputStyle, disabled }: Props) => {
  const [required, setRequired] = useState(false);

  useEffect(() => {
    if (error !== '') setRequired(true);
  }, [error]);

  return (
    <Stack
      sx={{
        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.12)',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...sx,
      }}
    >
      {icon && (
        <Stack>
          <Image
            src="/images/onboarding/location.svg"
            alt="sunset"
            className="w-[30px] h-[30px]"
            width={20}
            height={20}
          />
        </Stack>
      )}

      {!icon && <CiLocationOn className="absolute top-2 left-2 text-xl" />}

      <Autocomplete
        style={{
          width: '100%',
          height: '40px',
          borderRadius: '50px',
          paddingLeft: '2rem',
          ...inputStyle,
        }}
        className="focus:outline-bright_navy_blue text-w_xs1 xl:text-sm"
        placeholder="Location name or address"
        apiKey={API_KEY_GOOGLE_MAPS}
        onPlaceSelected={async (place) => {
          try {
            setIsLoading(true);
            const res = await GetLocationPlaceName(`${place.place_id}`);
            setIsLoading(false);
            setValue(res.data.data.result);
          } catch (e) {
            setRequired(true);
            setIsLoading(false);
          }
        }}
        inputAutocompleteValue={val}
        defaultValue={val}
        options={{
          types: ['geocode', 'establishment'],
        }}
        onSelect={(e: SyntheticEvent) => {
          if ((e.target as HTMLTextAreaElement).value === '') {
            setRequired(true);
          }
        }}
        onChange={(e: SyntheticEvent) => {
          if ((e.target as HTMLTextAreaElement).value !== '') {
            setRequired(false);
          }
        }}
      />
      {error && required && error !== 'Not selected' && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </Stack>
  );
};
export default MapFieldCopy;
