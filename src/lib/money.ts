export function formatBaht(amount: number): string {
  return `฿${amount.toLocaleString("en-US")}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("en-US")} km`;
}
