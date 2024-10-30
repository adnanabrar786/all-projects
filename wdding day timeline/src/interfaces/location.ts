export interface ILocation {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  name?: string;
  formatted_address: string;
  address_components: [
    {
      types: [string];
      long_name: string;
      short_name: string;
    },
    {
      types: [string, string];
      long_name: string;
      short_name: string;
    },
    {
      types: [string, string];
      long_name: string;
      short_name: string;
    },
    {
      types: [string, string];
      long_name: string;
      short_name: string;
    },
  ];
}
