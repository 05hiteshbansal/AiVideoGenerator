// import {Image} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import registerImage from "@/media/loginimg.png";
import LoginForm from "@/components/LoginForm";

const Home = () => {
  return (
    <div className=" w-full max-h-full flex flex-1 flex-row items-center justify-center">

      <div className=" w-[100%] m-5 h-[95vh] md:relative hidden md:block grow ">
        <Image
          src={registerImage}
          fill
          alt=""
          placeholder='blur'
          className=" rounded object-contain aspect-auto object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="w-full h-full flex items-center justify-center p-10 md:p-0 ">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
