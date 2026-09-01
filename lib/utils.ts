import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const inrToPaise = (inr: number) => Math.round(inr * 100);
export const paiseToInr = (paise: number) => Math.round(paise / 100);