export const shuffleArray = (arr) => {
    if (!Array.isArray(arr) || !arr.length) {
      return [];
    }
  
    const arrCloned = arr.slice();
  
    for (let i = arrCloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrCloned[i], arrCloned[j]] = [arrCloned[j], arrCloned[i]];
    }
  
    return arrCloned;
  };
  