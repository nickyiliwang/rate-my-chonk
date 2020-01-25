export default function generateDataForSorting(props) {
  const calculateAverage = arr => {
    if (arr) {
      const sum = arr.reduce((acc, ini) => parseInt(acc) + parseInt(ini), 0);
      return sum / arr.length;
    } else {
      return 0;
    }
  };

  const sortCatsObjectByHighScore = objToSort => {
    return objToSort.sort((a, b) =>
      a.catAverageScore < b.catAverageScore ? 1 : -1
    );
  };

  // https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
  // we chunk the array to smaller size for pagination and lazy load
  const chunkArray = (rawData, chunk_size) => {
    let chunkedData = [];
    while (rawData.length) {
      chunkedData.push(rawData.splice(0, chunk_size));
    }
    return chunkedData;
  };

  generateObjectForSorting = arrayToSort => {
    for (const key in arrayToSort) {
      if (arrayToSort.hasOwnProperty(key)) {
        const cat = arrayToSort[key];
        cat.catAverageScore = this.calculateAverage(cat.catArrForAverage);
      }
    }

    const sortedAllCatsArray = this.sortCatsObjectByHighScore(arrayToSort);

    // here we want to separate them into pages

    const chunkedArrays = this.chunkArray(sortedAllCatsArray, 16);

    // need a callback to set the state instead of this, we need a callback that runs a function that passes thingys
    this.setState({
      pages: chunkedArrays.length,
      chunkedArrays,
      sortedCatArrToRender: chunkedArrays[0]
    });
  };

  //   TODO:
  // this function need to accept a callback in order to become just an function that does no rendering.
}
