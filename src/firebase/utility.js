// Collection names
export const TODOS = 'todos';
export const TEAMS = 'teams';
export const USERS = 'users';

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
