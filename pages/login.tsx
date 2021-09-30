import React, { useEffect, ReactElement } from "react";
import Button from "src/components/Element/Button.styled";
import useGoogleAuth from "src/hooks/useGoogleAuth";
import { useRouter } from "next/router";
import InitialLayout from "src/components/layout/InitialLayout";
import { Page } from "src/types/Page";
import Layout from "src/utils/layout/Layout";
const Login: Page = () => {
  const router = useRouter();

  const { signIn } = useGoogleAuth(router);

  return (
    <div>
      <h1 className="text-7xl text-primary font-bold mt-9">login</h1>
      <p className="text-2xl text-primary max-w-3xl mt-5">
        Sistem Pendukung Keputusan Perangkingan Saham
        <br />
        Berdasarkan Value Investing dengan menggunakan metode TOPSIS
      </p>

      <Button className="bg-primary text-white text-2xl mt-16" onClick={signIn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <path
            id="google-brands"
            d="M30,23.351C30,31.909,24.043,38,15.246,38a15,15,0,1,1,0-30,14.793,14.793,0,0,1,10.223,3.925l-4.15,3.925C15.891,10.7,5.8,14.569,5.8,23a9.471,9.471,0,0,0,9.449,9.472c6.037,0,8.3-4.258,8.656-6.466H15.246V20.847H29.76a12.944,12.944,0,0,1,.24,2.5Z"
            transform="translate(0 -8)"
            fill="#fbfbfb"
          />
        </svg>

        <p className="ml-3">Login with Google</p>
      </Button>
    </div>
  );
};

export default Login;

Layout(Login, InitialLayout);
