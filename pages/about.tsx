import React from "react";
import InitialLayout from "src/components/layout/InitialLayout";
import Layout from "src/utils/layout/Layout";

const About = () => {
  return (
    <div className="about__page">
      <h1
        className="text-5xl md:text-7xl text-primary font-bold mt-9"
        style={{ zIndex: -2 }}
      >
        about
      </h1>
      <div className="about__page__text-container">
        <p className="mt-5 text-2xl text-primary">
          Value investing adalah investasi dengan metode menganalisa Laporan
          Keuangan perusahaan kemudian menentukan harga wajar yang bisa
          dibayarkan investor dengan tujuan investor tidak membeli suatu
          saham/sekuritas dengan harga yang mahal
        </p>
        <p className="mt-5 text-2xl text-primary">
          Benjamin Graham dan David Dodd pertama kali memperkenalkan value
          investing dalam buku Security Analysis pada tahun 1934. Kemudian
          Graham yang dikenal sebagai bapak value investing ini, pada tahun 1949
          menekankan pentingnya value investing dalam buku analisis investasi
          klasiknya, yaitu The Intelligent Investor
        </p>
        <p className="mt-5 text-2xl text-primary">
          Penganut Value Investing yang terkenal adalah Warren Buffet yang
          merupakan CEO dari Berkshire Hathaway Inc sekaligus sebagai salah satu
          investor paling terpandang dunia, dan Lo Kheng Hong yang dikenal
          sebagai investor individual tersukses Indonesia
        </p>
      </div>
    </div>
  );
};
export default About;
Layout(About, InitialLayout);
