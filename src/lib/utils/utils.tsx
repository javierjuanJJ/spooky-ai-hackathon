import clsx, {ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

// Define the cn function
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}