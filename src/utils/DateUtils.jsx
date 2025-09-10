export function getHour(dateTimeString) {
  const date = new Date(dateTimeString.replace(" ", "T"));
  // "2025-09-10 01:00" -> "2025-09-10T01:00" (ISO válido)

  const hours = date.getHours();
  return String(hours).padStart(2, "0"); // asegura formato hh
}
