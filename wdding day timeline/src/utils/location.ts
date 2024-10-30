export function generateLocationLink(place_id: string) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place_id}`;

  return googleMapsUrl;
}

export function getLocationMarkLogo() {
  return 'https://weddingdaytimelinedev-serverless-storage.s3.amazonaws.com/public/email-template-images/location-mark.png';
}
