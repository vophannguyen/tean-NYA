export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function remainTime(end) {
  let t = Date.parse(end) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
// let deadline = new Date("dec 31, 2017 15:37:25").getTime();
// let now = new Date().getTime();
// let t = deadline - now;
// let days = Math.floor(t / (1000 * 60 * 60 * 24));
// let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
// let seconds = Math.floor((t % (1000 * 60)) / 1000);
export function cartTimeCountDownt(end, crt) {
  let time_in_minutes = end;
  let current_time = crt;
  let deadline = new Date(current_time + time_in_minutes * 60 * 1000);
  return deadline;
}
// console.log(run_clock(deadline));
