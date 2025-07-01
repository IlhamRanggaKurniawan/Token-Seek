import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTokenAmount(raw: string | number | bigint, decimals: number): string {

  const rawStr = BigInt(raw).toString();

  const padded = rawStr.padStart(decimals + 1, '0');

  const whole = padded.slice(0, padded.length - decimals);
  const formatted = Number(whole).toLocaleString('en-US');

  return formatted;
}
