import { useState, useMemo, useEffect } from 'react';

export default function Marker(options) {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const infoWindow = useMemo(() => new window.google.maps.InfoWindow(), []);

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      infoWindow.setContent(
        `<div id="iw-container">
             ${options.position.name}
            ${options.position.couple_name ? `<br>${options.position.couple_name}` : ''}${
              options.position.type ? ` ${options.position.type}` : ''
            }<br>${
              options.position.address_name
                ? options.position.address_name + ', ' + options.position.address
                : options.position.address
            }</p>
            </div>`,
      );
      marker.setOptions(options);

      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          shouldFocus: false,
        });
      });
    }
  }, [infoWindow, marker, options]);

  return null;
}
