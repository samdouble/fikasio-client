export const invertColor = (hex: string): string => {
  let hexToUse = hex;
  if (hexToUse[0] === '#') {
    hexToUse = hexToUse.slice(1);
  }

  const r = parseInt(hexToUse.slice(0, 2), 16);
  const g = parseInt(hexToUse.slice(2, 4), 16);
  const b = parseInt(hexToUse.slice(4, 6), 16);

  return (r * 0.299 + g * 0.587 + b * 0.114) > 180
    ? '#000000'
    : '#FFFFFF';
};
