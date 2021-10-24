import readXlsxFile from "read-excel-file";
import { TScreeningResult } from "src/types/File";

const ReadExcel = ({ path }: { path: File }) => {
  let sektor = "";
  let subsektor = "";
  let intAwalPeriode = "";
  const periode3BulanInteger = 7680000000;
  const sheet = {
    general: 2,
    balance: 3,
    income: 4,
    priorYear1: 5,
    cashflow: 7,
  };
  function getSheet() {
    //@ts-ignore
    return readXlsxFile(path, { getSheets: true }).then((sheets: any) => {
      return sheets;
    });
  }
  async function getRows() {
    const kembali = await readXlsxFile(path, {
      sheet: sheet.cashflow,
    }).then((rows: any) => {
      return rows;
    });
    return kembali;
  }
  async function getData() {
    const general = await fetchUmum();
    const balance =
      sektor == "Finance" ? await fetchBalanceFinance() : await fetchBalance();
    const income =
      sektor == "Finance" ? await fetchIncomeFinance() : await fetchIncome();
    const cashflow = await fetchCashFlow();
    const priorYear = await priorYearData();
    // const income = {}

    return {
      sektor: sektor,
      subsektor: subsektor,
      ...general,
      ...income,
      ...cashflow,
      ...balance,
      ...priorYear,
    } as unknown as TScreeningResult;
  }
  async function fetchUmum() {
    let jason: any[] = [];
    await readXlsxFile(path, { sheet: sheet.general }).then((rows: any) => {
      rows.map((row: any): void | boolean => {
        if (row[0] == null) {
          return true;
        }
        if (row[0] != null && row[0].match(/Kode entitas/g)) {
          const mantap: any = [];
          mantap["ticker"] = row[1] == null ? 0 : row[1];
          jason = { ...jason, ...mantap };
        } else if (row[0] == "Sektor") {
          sektor = row[1].slice(3);
        } else if (row[0] == "Subsektor") {
          subsektor = row[1].slice(4);
        } else if (row[0].match(/(?=.*\bPembulatan yang digunakan\b).*$/g)) {
          const newElement: any = [];
          newElement["multiply"] = row[1].match(/(?=.*\bSatuan Penuh\b).*$/g)
            ? 1
            : row[1].match(/(?=.*\bRibuan\b).*$/g)
            ? 3
            : row[1].match(/(?=.*\bJutaan\b).*$/g)
            ? 6
            : 9;
          jason = { ...jason, ...newElement };
        } else if (row[0] == "Mata uang pelaporan") {
          const newElement: any = [];
          newElement["currency"] = row[1].match(/(?=.*\bIDR\b).*$/g)
            ? "IDR"
            : "USD";
          jason = { ...jason, ...newElement };
        } else if (row[0] == "Tanggal awal periode berjalan") {
          intAwalPeriode = new Date(row[1]).getTime().toString();
        } else if (row[0] == "Tanggal akhir periode berjalan") {
          const newElement: any = [];
          const month = new Date(row[1]).getMonth() + 1;
          newElement["tahun"] = new Date(row[1]).getFullYear();
          const akhirPeriode = new Date(row[1]).getTime();
          const jarakWaktu = akhirPeriode - parseInt(intAwalPeriode);
          newElement["periode"] = Math.round(jarakWaktu / periode3BulanInteger);
          if (newElement["periode"] == 4 && month <= 3) {
            --newElement["tahun"];
          }
          jason = { ...jason, ...newElement };
        }
      });
    });
    return { general: jason };
  }
  async function fetchCashFlow() {
    let jason: any = [];

    await readXlsxFile(path, { sheet: sheet.cashflow }).then((rows: any) => {
      rows.map((row: any) => {
        if (
          row[0] != null &&
          (row[0].match(
            /(?=.*\bJumlah\b)(?=.*\bkas\b)(?=.*\bbersih\b)(?=.*\boperasi\b).*$/g
          ) ||
            row[0].match(
              /(?=.*\bJumlah\b)(?=.*\bkas\b)(?=.*\bbersih\b)(?=.*\binvestasi\b).*$/g
            ) ||
            row[0].match(
              /(?=.*\bJumlah\b)(?=.*\bkas\b)(?=.*\bbersih\b)(?=.*\bpendanaan\b).*$/g
            ) ||
            row[0].match(
              /(?=.*\bJumlah\b)(?=.*\bkenaikan\b)(?=.*\bsetara kas\b).*$/g
            ) ||
            row[0].match(
              /(?=.*\bKas\b)(?=.*\bsetara kas\b)(?=.*\bawal periode\b).*$/g
            ) ||
            row[0].match(
              /(?=.*\bKas\b)(?=.*\bsetara kas\b)(?=.*\bakhir periode\b).*$/g
            ))
        ) {
          row[0] = row[0].match(
            /(?=.*\bJumlah\b)(?=.*\bkas\b)(?=.*\bbersih\b)(?=.*\boperasi\b).*$/g
          )
            ? "OperatingCash"
            : row[0].match(
                /(?=.*\bJumlah\b)(?=.*\bkas\b)(?=.*\bbersih\b)(?=.*\binvestasi\b).*$/g
              )
            ? "InvestingCash"
            : row[0].match(
                /(?=.*\bJumlah\b)(?=.*\bkas\b)(?=.*\bbersih\b)(?=.*\bpendanaan\b).*$/g
              )
            ? "FinancingCash"
            : row[0];

          const mantap = [];
          mantap[row[0]] = row[1] == null ? 0 : row[1];
          jason = { ...jason, ...mantap };
        }
      });
    });
    return { cashflow: jason };
  }
  async function fetchBalance() {
    let jason: any = [];

    await readXlsxFile(path, { sheet: sheet.balance }).then((rows: any) => {
      rows.map((row: any) => {
        if (
          row[0] != null &&
          (row[0].match(/(?=.*\bJumlah aset\b)(?=.*\blancar\b).*$/g) ||
            row[0] == "Jumlah aset" ||
            row[0].match(/(?=.*\bJumlah liabilitas jangka\b).*$/g) ||
            row[0] == "Jumlah liabilitas" ||
            row[0] == "Jumlah ekuitas" ||
            row[0].match(/(?=.*\bdimuka\b).*$/g) ||
            row[0].match(/(?=.*\bPersediaan\b).*$/g))
        ) {
          const mantap = [];
          mantap[row[0]] = row[1] == null ? 0 : row[1];
          jason = { ...jason, ...mantap };
        }
      });
    });

    const filteredPersediaan = Object.keys(jason)
      .filter((key) => key.match(/(?=.*\bPersediaan\b).*$/g))
      .reduce((obj: any, key) => {
        obj[key] = jason[key];
        return obj;
      }, {});

    const kolomJumlahAsetLancar = Object.keys(jason).filter((key) =>
      key.match(/(?=.*\bJumlah aset\b)(?=.*\blancar\b).*$/g)
    );
    if (kolomJumlahAsetLancar.length < 1) {
      jason["Jumlah aset lancar"] = jason["Jumlah aset"];
      jason["Jumlah aset tidak lancar"] = 0;
    }

    const kolomLiabilitasJangka = Object.keys(jason).filter((key) =>
      key.match(/(?=.*\bJumlah liabilitas jangka\b).*$/g)
    );
    if (kolomLiabilitasJangka.length < 1) {
      jason["Jumlah liabilitas jangka pendek"] = jason["Jumlah liabilitas"];
      jason["Jumlah liabilitas jangka panjang"] = 0;
    }
    const filteredBiayadiMuka = Object.keys(jason)
      .filter((key) => key.match(/(?=.*\bdimuka\b).*$/g))
      .reduce((obj: any, key) => {
        obj[key] = jason[key];
        return obj;
      }, {});

    const totalPersediaan = Object.values(filteredPersediaan).reduce(
      (total: any, nilai) => total + nilai
    );

    jason["Total jumlah persediaan"] = totalPersediaan;

    const totalBiayaDiMuka = Object.values(filteredBiayadiMuka).reduce(
      (total: any, nilai) => total + nilai
    );
    jason["Total biaya dimuka"] = totalBiayaDiMuka; //masih tanda tanya

    return { balance: jason };
  }
  async function fetchIncome() {
    let jason: any = [];

    await readXlsxFile(path, { sheet: sheet.income }).then((rows: any) => {
      rows.map((row: any) => {
        if (
          row[0] != null &&
          (row[3] == "Sales and revenue" ||
            row[3] == "Total profit (loss)" ||
            row[3] == "Tax benefit (expenses)")
        ) {
          const mantap = [];
          mantap[row[0]] = row[1] == null ? 0 : row[1];
          jason = { ...jason, ...mantap };
        }
      });
    });
    return { income: jason };
  }
  async function fetchIncomeFinance() {
    let jason: any = [];

    if (subsektor != "B") {
      await readXlsxFile(path, { sheet: sheet.income }).then((rows: any) => {
        rows.map((row: any) => {
          if (row[0] != null) {
            if (
              row[0] == "Pendapatan (beban) pajak" ||
              row[0] == "Jumlah laba (rugi)"
            ) {
              const mantap: any = [];
              mantap[row[0]] = row[1] == null ? 0 : row[1];
              jason = { ...jason, ...mantap };
            } else if (
              row[0].match(/(?=.*\bPendapatan\b).*$/g) ||
              row[0] == "Penjualan dan pendapatan usaha"
            ) {
              const mantap: any = [];
              const previousValue =
                jason["Penjualan dan pendapatan usaha"] == undefined
                  ? 0
                  : jason["Penjualan dan pendapatan usaha"];
              mantap["Penjualan dan pendapatan usaha"] = previousValue + row[1];
              jason = { ...jason, ...mantap };
            }
          }
        });
      });
    }

    return { income: jason };
  }
  async function fetchBalanceFinance() {
    let jason: any = [];
    let giroLiabilitasSection = false;
    if (subsektor != "B") {
      await readXlsxFile(path, { sheet: sheet.balance }).then((rows: any) => {
        rows.map((row: any) => {
          if (row[0] != null) {
            if (
              row[0].match(/(?=.*\bTabungan\b).*$/g) ||
              row[0] == "Jumlah ekuitas" ||
              row[0] == "Kas" ||
              row[0].match(/(?=.*\bCadangan kerugian penurunan nilai\b).*$/g) ||
              row[0].match(/(?=.*\bDeposito\b).*$/g)
            ) {
              const mantap: any = [];
              mantap[row[0]] = row[1] == null ? 0 : row[1];
              jason = { ...jason, ...mantap };
            } else if (row[0] == "Liabilitas") {
              giroLiabilitasSection = true;
            } else if (row[0].match(/(?=.*\bGiro\b).*$/g)) {
              const mantap: any = [];
              const keterangan =
                giroLiabilitasSection == false ? "asset" : "liabilitas";
              mantap[row[0] + ` ${keterangan}`] = row[1] == null ? 0 : row[1];
              jason = { ...jason, ...mantap };
            } else if (row[0] == "Aset tetap") {
              const mantap: any = [];
              mantap["Jumlah aset tidak lancar"] = row[1];
              jason = { ...jason, ...mantap };
            } else if (row[0] == "Jumlah aset") {
              const mantap: any = [];
              mantap["Jumlah aset lancar"] =
                row[1] - jason["Jumlah aset tidak lancar"];
              jason = { ...jason, ...mantap };
            } else if (row[0].match(/(?=.*\bdimuka\b).*$/g)) {
              const mantap: any = [];
              const previousPrice =
                jason["Total biaya dimuka"] == undefined
                  ? 0
                  : jason["Total biaya dimuka"];
              mantap["Total biaya dimuka"] = previousPrice + row[1];
              jason = { ...jason, ...mantap };
            } else if (row[0] == "Jumlah liabilitas") {
              const mantap: any = [];
              mantap["Jumlah liabilitas jangka pendek"] = row[1];
              mantap["Jumlah liabilitas jangka panjang"] = 0;
              jason = { ...jason, ...mantap };
            }
          }
        });
      });
      // //tabungan
      // let tabungan = Object.values(Object.keys(jason).filter(key => key.match(/(?=.*\bTabungan\b).*$/g)).reduce((obj,key) => {
      //     obj[key] = jason[key];
      //     return obj
      // },{})).reduce((total,nilai) => total+nilai);
      // //CKPN
      // let ckpn = Object.values(Object.keys(jason).filter(key => key.match(/(?=.*\bCadangan kerugian\b).*$/g)).reduce((obj,key) => {
      //     obj[key] = jason[key];
      //     return obj
      // },{})).reduce((total,nilai) => total+nilai);
      // let deposito = Object.values(Object.keys(jason).filter(key => key.match(/(?=.*\bDeposito\b).*$/g)).reduce((obj,key) => {
      //     obj[key] = jason[key];
      //     return obj
      // },{})).reduce((total,nilai) => total+nilai);
      // let giroAsset = Object.values(Object.keys(jason).filter(key => key.match(/(?=.*\bGiro\b)(?=.*\basset\b).*$/g)).reduce((obj,key) => {
      //     obj[key] = jason[key];
      //     return obj
      // },{})).reduce((total,nilai) => total+nilai);
      // let giroLiabilitas = Object.values(Object.keys(jason).filter(key => key.match(/(?=.*\bGiro\b)(?=.*\bliabilitas\b).*$/g)).reduce((obj,key) => {
      //     obj[key] = jason[key];
      //     return obj
      // },{})).reduce((total,nilai) => total+nilai);
      // jason = Object.keys(jason).filter(key => !key.match(/(?=.*\bCadangan kerugian\b).*$/g) && !key.match(/(?=.*\bTabungan\b).*$/g) && !key.match(/(?=.*\bDeposito\b).*$/g) && !key.match(/(?=.*\bGiro\b).*$/g)).reduce((obj,key) => {
      //     obj[key] = jason[key];
      //     return obj
      // },{});

      // jason["Total tabungan"] = tabungan
      // jason["Total CKPN"] = ckpn;
      // jason["Total Deposito"] = deposito
      // jason["Total Giro Asset"] = giroAsset
      jason["Total jumlah persediaan"] = 0;
      // jason["Total Giro Liabilitas"] = giroLiabilitas
    }

    return { balance: jason };
  }
  async function priorYearData() {
    let amountOfDividend = 0;
    await readXlsxFile(path, { sheet: sheet.priorYear1 }).then((rows: any) => {
      for (const row of rows) {
        if (
          row[0] !== null &&
          row[0].match(/(?=.*\bDistribusi dividen kas\b).*$/g)
        ) {
          amountOfDividend = row[20] == null ? 0 : row[20];
        }
      }
    });

    return { dividen: amountOfDividend };
  }

  return { getSheet, getRows, getData };
};

export default ReadExcel;
