const round = (x, n) => {
  const pow10 = 10 ** n;
  return Math.round(x * pow10) / pow10;
};

export {
  round,
};
