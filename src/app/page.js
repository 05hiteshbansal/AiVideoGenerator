"use client";
import Logo from "@/assets/logosaas.png";
import Image from "next/image";
import cogImage from "@/assets/cog.png";
import cylinderImage from "@/assets/cylinder.png";
import noodleImage from "@/assets/noodle.png";
import {motion} from 'framer-motion';
import productImage from "@/assets/product.png";
import kartik from "@/assets/kartik.jpg";
import lokesh from "@/assets/lokesh.jpg";
import jiten from "@/assets/jiten.jpg";
import dilpreet from "@/assets/dilpreet.jpg";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import { useRouter } from "next/navigation";
export default function Home() {
  return (
  <div className="antialiased bg-[#EAEEFE] ">
    <Header />
    <Hero/>
    <ProductShowcase/>
    <Testimonials/>
    <Footer/>
  </div>
  );
}

export const Footer = () => {
  return <div>
    <div className="pl-[10px] pr-[10px]">
      <p className="flex items-center justify-center pt-9 pb-9 text-2xl tracking-widest">Made with ❤️ by Gurjot Singh and Hitesh Bansal.</p>

    </div>
  </div>;
};


export const Header = () => {
return (
  <div className="sticky top-0 py-5  backdrop-blur-sm z-20">
      <div className=" pl-[10px] pr-[10px]" >
      <div className="inline-flex items-center justify-between">
      
      <Image src={Logo} alt="Saas Logo" height={40} width={40} />
      <h1 className="pl-4 text-4xl font-bold">AiShortVid</h1>
      </div>
      </div>
  </div>
);
};




export const Hero = ( ) => {
  const router = useRouter();
  return (
  <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
  <div className="pl-[100px] pr[100px]">
    <div className="md:flex items-center">
    <div className="md:w-[478px]">
    <div className="text-sm inline-flex border ☐ border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Ai Video Generator</div>
    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b ☐ from-black ☐ to-[#001E80] text-transparent bg-clip-text mt-6">
      Pathway to productivity!
      </h1>
    <p className="text-xl text-[#010D3E] tracking-tight mt-6">
    An innovative application designed to revolutionize the way video content is created on the internet.
    </p>
    <div className="flex gap-1 items-center mt-[30px]">
    <button
    onClick={() => router.push("/dashboard")}  
    className="bg-black hover:bg-white text-white hover:text-black transition ease-in-out duration-500 px-4 py-2 rounded-lg font-mdeium inline-flex items-center justify-center tracking-tight">
      Get Started!</button>
    </div>
    </div>
    <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
      <motion.img src={cogImage.src} alt="Cog Image" className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
      animate={{
        translateY: [-30,30],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 3,
        ease: "easeInOut"
      }}/>
      <Image src={cylinderImage} alt="Cylinder Image" width={220} height={220} className="hidden md:block -top-8 -left-32 md:absolute"/>
      <Image src={noodleImage} width={220} alt="Noodle Image" className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg]"/>
    </div>
    </div>
  </div>
  </section>
  );
  };




export const ProductShowcase = () => {
return (
  <section className="bg-gradient-to-b from-[#FFFFFF] Ito-[#D2DCFF] py-24 overflow-x-clip">
  <div className="p-[100px]">
    <div className="max-w-[540px] mx-auto">
  <div className="flex justify-center">
  <div className="text-sm inline-flex border ☐ border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Boost your productivity</div>
  </div>
  <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b ☐ from-black ☐ to-[#001E80] text-transparent bg-clip-text mt-5">Fastrack your creativity!</h2>
  <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
  Effortlessly turn your ideas into a video in just minutes with this application.
  </p>
  </div>
  <div className="relative">
  <Image src={productImage} alt="Product Image" className="rounded-2xl mt-10" />
  <Image src={pyramidImage} alt="Pyramid Image" height={262} width={262} className=" hidden md:block absolute -right-36 -top-32" />
  <Image src={tubeImage} alt="Tube Image" height={248} className="hidden md:block absolute bottom-20 -left-36" />

  </div>
  </div>
  </section>
);
};



const testimonials = [
  {
    text: "This tool is a game changer for anyone looking to create high-quality videos effortlessly. The AI behind it is super intelligent, and I’ve been able to create some amazing videos that I wouldn’t have been able to produce on my own. Truly an innovative tool!",
    imageSrc: lokesh.src,
    name: "Lokesh Yadav",
  },
  {
    text: "I love how easy it is to use the AI Video Generator. It’s the perfect balance between simplicity and advanced technology. It’s helped me create more engaging content for my social media, and I’m seeing a significant increase in engagement!",
    imageSrc: kartik.src,
    name: "Kartik Chauhan",
  },
  {
    text: "As a content creator, I’ve always struggled with finding the right tools to enhance my videos. With this app, I can generate professional-quality videos in minutes. The AI features are mind-blowing and have saved me hours of editing!",
    imageSrc: dilpreet.src,
    name: "Dilpreet Grover",
  },
  {
    text: "The AI Video Generator has completely transformed the way I approach video creation. It’s not only intuitive but also incredibly powerful. Whether I’m looking to boost my productivity or bring my ideas to life, this app makes it seamless. Highly recommend!",
    imageSrc: jiten.src,
    name: "Jiten Mehta",
  }
];
const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);

export const Testimonials = () => {
  return <section className="bg-white pb-20">
    <div className="p-[100px]">
    <div className="max-w-[540px] mx-auto">
    <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b ☐ from-black ☐ to-[#001E80] text-transparent bg-clip-text pt-10">What are users say ?</h2>
    <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">From intuitive design to powerful features, our app has become an essential tool for users around the world.</p>
    </div>
    <div className="flex justify-center gap-6">
    <div className="flex flex-col gap-6 mt-10">
      {firstColumn.map(({text, imageSrc, name}) =>(
        <div className="p-10 border ☐ border-[#222222]/10 rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-5xl w-full">
          <div>{text}</div>
          <div className="flex items-center gap-2 mt-5">
            <img src={imageSrc} alt={name} width={40} height={40} className="h-10 w-10 rounded-full" />
            <div className="flex flex-col">
              <div className="font-medium tracking-tight leading-5">{name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="hidden  md:flex md:flex-col gap-6 mt-10">
      {secondColumn.map(({text, imageSrc, name}) =>(
        <div className="mb-6 p-10 border ☐ border-[#222222]/10 rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-5xl w-full">
          <div>{text}</div>
          <div className="flex items-center gap-2 mt-5">
            <img src={imageSrc} alt={name} width={40} height={40} className="h-10 w-10 rounded-full" />
            <div className="flex flex-col">
              <div className="font-medium tracking-tight leading-5">{name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>

    </div>
    </div>
  </section>;
};
