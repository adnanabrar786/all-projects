export function getFileExtension(file: string) {
  const fileextension = file.lastIndexOf('.');
  return file.slice(fileextension + 1);
}

export const getFirstLetterOfEachWord = (str: string): string => {
  const matches = str.match(/\b(\w)/g);
  if (matches) {
    const acronym = matches.join('');
    return acronym;
  }
  return '';
};

export const getCategories = (arr: any[] = [], vendorTypes: any[] = []) => {
  const list: string[] = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index].category_id;
    vendorTypes.map((item) => {
      if (item.id === element) {
        list.push(item.label);
      }
    });
  }
  return list;
};

export const getFirstLetter = (name: string) => {
  if (!name.length) {
    return '';
  }
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];
  let firstLetter;
  if (firstName && lastName) {
    firstLetter = firstName[0] + lastName[0];
  } else {
    firstLetter = firstName[0];
  }
  return firstLetter;
};

export const getMapValueCopy = (googleLocation: google.maps.places.PlaceResult) => {
  if (googleLocation && googleLocation.name) {
    return googleLocation.name + ', ' + googleLocation.formatted_address;
  }

  return '';
};
