// import {Image} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import r1 from "@/media/r2.png";
import RegisterForm from "@/components/RegisterForm";

const Home = () => {
  return (
    <div className=" w-full max-h-full flex flex-1 flex-row items-center justify-center overflow-hidden">

      <div className="w-full h-full flex items-center justify-center p-10 md:p-0 ">
        <RegisterForm />
      </div>


      <div className=" grow w-[100%] m-5 h-[95vh] md:relative hidden md:block">
        <Image
          src={r1}
          fill
          alt=""
          placeholder='blur'
          className=" rounded object-contain aspect-auto object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

    </div>
  );
};

export default Home;
