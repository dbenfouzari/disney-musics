const _secondsInMinute = 60;
const _minutesInHours = 60;
const _secondsInHours = _secondsInMinute * _minutesInHours;

export function splitSecondsIntoUnits(secondsTotal: number) {
  const hours = Math.floor(secondsTotal / _secondsInHours);
  const remainingHours = secondsTotal % _secondsInHours;

  const minutes = Math.floor(remainingHours / _secondsInMinute);
  const remainingMinutes = remainingHours % _secondsInMinute;

  const seconds = Math.floor(remainingMinutes % 60);

  return { hours, minutes, seconds };
}

export function unitsToString(units: ReturnType<typeof splitSecondsIntoUnits>) {
  const hoursStr = String(units.hours).padStart(2, "0");
  const minutesStr = String(units.minutes).padStart(2, "0");
  const secondsStr = String(units.seconds).padStart(2, "0");

  if (units.hours) return [hoursStr, minutesStr, secondsStr].join(":");
  return [minutesStr, secondsStr].join(":");
}
