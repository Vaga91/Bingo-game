export const tableDataValidation = (listLength, dimension) => {
  if (listLength + 1 !== dimension * dimension) {
    throw new Error(`list length should be ${dimension * dimension}`);
  }
};
