const zipNewYork = [
  10162, 10006, 10004, 10069, 10282, 10018, 10007, 10280, 10005, 10044, 10017,
  10037, 10012, 10038, 10001, 10039, 10013, 10014, 10036, 10030, 10010, 10022,
  10035, 10026, 10021, 10034, 10019, 10040, 10028, 10011, 10003, 10016, 10128,
  10009, 10032, 10033, 10031, 10024, 10027, 10023, 10002, 10029, 10025,
];
const zipLosAng = [90001, 90090];
const zipChicago = [60601, 60699, 60290, 60701];
const zipBoston = [
  2101,
  2199,
  [2203, 2205, 2208, 2209, 2210, 2215, 2222, 2228, 2283, 2284, 2455],
];
/**
 *
 * @param {Array} arr
 * @return {Array} [newyork, losAng,chicago,boston]
 */
function zipCode(arr) {
  const newYork = arr.filter((event) => {
    return zipNewYork.includes(+event.zip);
  });
  const losAnge = arr.filter((event) => {
    return +event.zip >= zipLosAng[0] && +event.zip <= zipLosAng[1]
      ? true
      : false;
  });
  const chicago = arr.filter((event) => {
    return (+event.zip >= zipChicago[0] && +event.zip <= zipChicago[1]) ||
      event.zip === zipChicago[2] ||
      event.zip === zipChicago[3]
      ? true
      : false;
  });
  const boston = arr.filter((event) => {
    return (
      (+event.zip >= zipBoston[0] && +event.zip <= zipBoston[1]) ||
      zipBoston[2].includes(+event.zip)
    );
  });
  return [newYork, losAnge, chicago, boston];
}
module.exports = { zipCode };
