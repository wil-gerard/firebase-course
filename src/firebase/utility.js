// Collection names
export const TODOS = 'todos';

// Utility functions
export function cleanData(data) {
  const newData = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined) {
      console.log(`data at ${key} is undefined`);
    } else {
      newData[key] = value;
    }
  });

  return newData;
}
