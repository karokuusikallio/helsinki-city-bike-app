export default function toHMS(durationInSeconds: number): string {
  let hours = durationInSeconds / 3600;
  let mins = (durationInSeconds % 3600) / 60;
  let secs = (mins * 60) % 60;

  hours = Math.trunc(hours);
  mins = Math.trunc(mins);
  secs = Math.trunc(secs);

  if (!hours && !mins && !secs) {
    return "None";
  }

  if (hours) {
    if (mins) {
      return secs ? `${hours}h ${mins}min ${secs}s` : `${hours}h ${mins}min`;
    } else {
      return secs ? `${hours}h ${secs}s` : `${hours}h`;
    }
  } else {
    if (mins) {
      return secs ? `${mins}min ${secs}s` : `${mins}min`;
    } else {
      return secs ? `${secs}s` : `None`;
    }
  }
}
