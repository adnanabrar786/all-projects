import { any, equals } from "ramda";

export const removeObjectFromArray = (arr, property, value) => {
  return arr.filter((obj) => obj[property] !== value);
};

export const arrayContainObject = (arr, targetObject, targetKey) => {
  return any(
    (obj: object) => equals(obj[targetKey], targetObject[targetKey]),
    arr
  );
};

export const isKeyExistInArray = (array, keyToCheck) => {
  const isKeyPresent = array.some((obj) => obj.hasOwnProperty(keyToCheck));

  return isKeyPresent;
};

export const sortArrayByImportanceAlphabet = (array) => {
  return array.sort((a, b) => {
    if (a.importance !== b.importance) {
      return b.importance - a.importance;
    }

    return a.topic_name.localeCompare(b.topic_name);
  });
};
