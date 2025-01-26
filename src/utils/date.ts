const formatYYYYMMDD = (d = new Date()) => {
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear().toString();
  return [year, month, day].join('-');
};

export {
  formatYYYYMMDD,
};
