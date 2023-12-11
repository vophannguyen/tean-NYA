import { geocode, RequestType, setDefaults } from "react-geocode";

// import "dotenv/config";

const GEO_API = "AIzaSyDJewbTsF_sjYABM67G1qOg80sTRWsK4sM";
/**
 * Format time : Jan 6, 2023, 1:24 AM
 * @param {time} dateStr
 * @returns {time}
 */
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
  }).format(new Date(dateStr));
}

export function formatTime(dateStr) {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

/** convet to  */
// let deadline = new Date("dec 31, 2017 15:37:25").getTime();
// let now = new Date().getTime();
// let t = deadline - now;
// let days = Math.floor(t / (1000 * 60 * 60 * 24));
// let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
// let seconds = Math.floor((t % (1000 * 60)) / 1000);
//////////////////////

/**
 *
 * @param {time} end
 * @param {time} crt //current time
 * @returns {time}
 */
export function cartTimeCountDownt(end, crt) {
  let time_in_minutes = end;
  let current_time = crt;
  let deadline = new Date(current_time + time_in_minutes * 60 * 1000);
  return deadline;
}

/**
 * Convert Address to lat and lng
 * @param {Array} arr
 * @returns {Array}
 * https://www.npmjs.com/package/react-geocode
 */
export async function mapLocation(arr) {
  setDefaults({
    key: GEO_API, // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });
  const location = [];

  for (let i = 0; i < arr.length; i++) {
    try {
      const response = await geocode(RequestType.ADDRESS, arr[i]);
      location.push(response.results[0].geometry.location);
    } catch (err) {
      console.error(err);
    }
    // location.push(response.results[0].geometry.location);
  }
  return location;
}

/**
 * convet all events to : today, tomorrow, this week
 * @param {Array} time
 * @returns {Array} [today, tommow, and this week]
 */

export function convertTimeTo(arr) {
  // get time when user added to cart and convert to parse()
  // const currentTime = Date.parse(new Date(data.createAt));
  const t = [];
  const tm = [];
  const tw = [];
  const current_time = Date.now();
  const today = current_time + 60 * 60 * 1000 * 24;
  console.log(today);
  const tomorrow = current_time + 60 * 60 * 1000 * 24 * 2;
  const thisWeerk = current_time + 60 * 60 * 1000 * 24 * 7;
  const result = arr.forEach((event) => {
    const checkTime = Date.parse(event.time);
    console.log(checkTime);
    if (checkTime <= thisWeerk) {
      tw.push(event);
    }
    if (checkTime <= today) {
      t.push(event);
    } else {
      if (checkTime <= tomorrow) {
        t.push(event);
      }
    }
  });
  // let time_in_minutes = end;
  // let current_time = crt;
  // let deadline = new Date(current_time + time_in_minutes * 60 * 1000);
  return [t, tm, tw];
}
