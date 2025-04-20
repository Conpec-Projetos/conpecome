import { twMerge } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface Item {
    id: string | undefined;
    stock: number;
    name: string;
    price: number;
    productionCost: number;
    image: File | null | string;
    type: string;
}