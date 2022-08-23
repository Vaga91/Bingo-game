export const insertElementToMiddleOfArray = (arr, centerCell, listLength) => {
    if (!Array.isArray(arr) && !arr.length) {
      throw new Error('The function must take an array');
    }
  
    const centerIndex = Math.floor(listLength / 2);
    
    return [...arr.slice(0, centerIndex), centerCell, ...arr.slice(centerIndex)];
  };
  