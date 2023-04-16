export function isoDurationToHours(duration: string): number {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (duration.includes('T')) {
      duration = duration.split('T')[1];
    }
  
    if (duration.includes('H')) {
      hours = parseInt(duration.split('H')[0]);
    }
    if (duration.includes('M')) {
      minutes = parseInt(duration.split('M')[0]);
    }
    if (duration.includes('S')) {
      seconds = parseInt(duration.split('S')[0]);
    }
  
    const totalHours = hours + minutes/60 + seconds/3600;
  
    return parseFloat(totalHours.toFixed(2));
  }

export function stripTime(datetime: Date): string {
  let a = datetime.toISOString();
  return a.split("T")[0];
}
  