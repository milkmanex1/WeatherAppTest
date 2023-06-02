//convert kelvin to celcius and format it
export function convertTemp(k) {
  return Math.round(k - 273.15);
}

//creates date and time
export function createDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleString("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  })}`;
}
