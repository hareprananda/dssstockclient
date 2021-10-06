const DateHelper = (() => {
  const monthName = (index: number) => {
    const name = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return name[index];
  };

  return { monthName };
})();

export default DateHelper;
