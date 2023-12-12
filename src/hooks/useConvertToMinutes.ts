export function useConverToMinutes() {
  const convertToMinutes = (duration: number) => {
    let minutes = duration / 60000;
    let seconds = (duration % 60000) / 1000;
  
    return `${Math.trunc(minutes)}:${Math.trunc(seconds).toString().padEnd(2, '0')}`;
  }

  return [convertToMinutes];
}