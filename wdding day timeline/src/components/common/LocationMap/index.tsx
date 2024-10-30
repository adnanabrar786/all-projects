import { Wrapper } from '@googlemaps/react-wrapper';
import Map from 'components/pages/location/Map';
import Marker from 'components/pages/location/Marker';
import { API_KEY_GOOGLE_MAPS } from 'config/environment';

type Props = {
  getLocation: {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  locations: {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
  }[];
};

export default function LocationMap({ getLocation, locations }: Props) {
  return (
    <Wrapper apiKey={API_KEY_GOOGLE_MAPS}>
      <Map
        center={{ lat: getLocation.lat, lng: getLocation.lng }}
        zoom={13}
        style={{ flexGrow: '1', height: '100%' }}
        onClick={undefined}
        onIdle={undefined}
        fullscreenControl={false}
        streetViewControl={false}
        zoomControl={false}
        panControl={false}
        mapTypeControl={false}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </Map>
    </Wrapper>
  );
}
