const NumberUtils = (() => {
  const separator = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const pembulatan = (angka: number) => {
    const objPembulatan = {
      1: "Satuan Penuh",
      3: "Ribu",
      6: "Juta",
      9: "Milyar",
    };
    return objPembulatan[angka as 1 | 3 | 6];
  };

  return { separator, pembulatan };
})();

export default NumberUtils;
