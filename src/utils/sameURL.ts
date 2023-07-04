export function isSameURL(target: URL, current: URL) {
  const cleanTarget = target.protocol + '//' + target.host + target.pathname;
  const cleanCurrent =
    current.protocol + '//' + current.host + current.pathname;

  return cleanTarget === cleanCurrent;
}
