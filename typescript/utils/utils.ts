
/**
 * 将str的pos位置替换成replace
 * @param str 
 * @param pos 
 * @param replace 
 * @returns 
 */
export function replace(str: string, pos: number, replace: string) {
  return `${str.slice(0, pos)}${replace}${str.slice(pos + 1, str.length)}`
}
