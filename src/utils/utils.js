import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export const formatCustomDate = (date) => {
  if(!date) return '--/--/--'
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString().slice(-2)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
};

export const decimalHoursToTime = (decimalHours) => {
  if(!decimalHours) return '--:--'
  const hours = Math.floor(decimalHours)
  const minutes = Math.round((decimalHours - hours) * 60)

  return `${hours}h ${minutes}min`
}

export const capitalText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
