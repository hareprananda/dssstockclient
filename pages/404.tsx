import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="fixed grid place-items-center h-screen w-screen">
      <div className="text-center">
        <div className="text-9xl font-bold text-primary flex justify-center items-center">
          4
          <span
            className="rounded-circle border-8 border-primary mx-4"
            style={{ width: "90px", height: "90px" }}
          ></span>
          4
        </div>
        <p className="text-6xl font-bold text-primary  uppercase border-b-4 border-primary">
          <span className="opacity-50">not found</span>
        </p>
        <div className="mt-5">
          <Link href="/">
            <a className="bg-primary text-white rounded px-8 py-2 text-lg font-semibold">
              Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
