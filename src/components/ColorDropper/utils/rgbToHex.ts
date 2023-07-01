const rgbToHex = (r: number, g: number, b: number) => {
  // eslint-disable-next-line no-mixed-operators
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

export default rgbToHex
