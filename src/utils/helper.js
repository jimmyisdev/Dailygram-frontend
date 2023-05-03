export const queryString = (queryVals) => {
  let initial = "";
  let url = Object.keys(queryVals).reduce((accumulator = initial, param) => {
    if (queryVals[param] !== "" && queryVals[param] !== "all") {
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
