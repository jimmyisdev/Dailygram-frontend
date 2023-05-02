export const queryString = (queryVals) => {
  let initial = "";
  let url = Object.keys(queryVals).reduce((accumulator = initial, param) => {
    console.log(4, accumulator);
    if (queryVals[param] !== "") {
      if (accumulator === "") {
        accumulator += `?${param}=${queryVals[param]}`;
      } else {
        accumulator += `&${param}=${queryVals[param]}`;
      }
    }
    return accumulator;
  }, "");
  return url;
};
