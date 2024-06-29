export const formatDateAndTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return (
    [year, month, day, hour, minute, second].map(formatNumber).join('/')
  )
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return (
    [year, month, day].map(formatNumber).join('/')
  )
}

export const formatTime = (date: Date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function log(...args: any[]) {
  console.log(`[Mxz]`, ...args);
}

export function warn(...args: any[]) {
  console.warn(`[Mxz]`, ...args);
}

export function error(...args: any[]) {
  console.error(`[Mxz]`, ...args);
}

export function generateUniqueId(): string {
  return 'id-' + Math.random().toString(36).substr(2, 16) + '-' + Date.now().toString(36);
}