export const checkWin = (checkedCards, dimension) => {
    const range = [...Array(dimension).keys()];
  
    const isWin = range.some((row) => range.every((column) => checkedCards.includes(row * dimension + column)))
      || range.some((column) => range.every((row) => checkedCards.includes(row * dimension + column)))
      || range.every((index) => checkedCards.includes(index * dimension + index))
      || range.every((index) => checkedCards.includes(index * dimension + 4 - index));
  
    return isWin;
  };
  