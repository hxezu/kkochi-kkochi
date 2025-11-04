export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${ampm} ${formattedHour}:${minutes}`;
}
