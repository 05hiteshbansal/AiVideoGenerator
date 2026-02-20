"use client";
import Logo from "@/assets/logosaas.png";
import LocomotiveScroll from "locomotive-scroll";
import Image from "next/image";
import cogImage from "@/assets/cog.png";
import cylinderImage from "@/assets/cylinder.png";
import noodleImage from "@/assets/noodle.png";
import { motion } from "framer-motion";
import productImage from "@/assets/product.png";
import kartik from "@/assets/kartik.jpg";
import lokesh from "@/assets/lokesh.jpg";
import jiten from "@/assets/jiten.jpg";
import dilpreet from "@/assets/dilpreet.jpg";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <div className="antialiased bg-[#EAEEFE]">
      <Header />
      <Hero />
      <ProductShowcase />
      <Testimonials />
      <Footer />
    </div>
  );
}

export const Footer = () => {
  return (
    <div>
      <div className="px-[10px]">
        <p className="flex items-center justify-center pt-9 pb-9 text-2xl tracking-widest">
          Made with ❤️ by Gurjot Singh and Hitesh Bansal.
        </p>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="sticky top-0 z-20 px-6 py-5 backdrop-blur-sm md:px-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="inline-flex items-center">
          <Image src={Logo} alt="Saas Logo" height={40} width={40} />
          <h1 className="pl-4 text-4xl font-bold">AiShortVid</h1>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const router = useRouter();
  return (
    <section className="overflow-x-clip bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] pt-8 pb-20 md:pt-5 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:flex-row">
        <div className="max-w-xl">
          <div className="inline-flex items-center rounded-lg border border-[#222]/10 px-3 py-1 text-sm tracking-tight bg-white/70 backdrop-blur-sm">
              Ai Video Generator
          </div>
          <h1 className="mt-6 bg-gradient-to-b from-black to-[#001E80] bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl">
              Pathway to productivity!
          </h1>
          <p className="mt-6 text-xl tracking-tight text-[#010D3E]">
              An innovative application designed to revolutionize the way video
              content is created on the internet.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium tracking-tight text-white transition duration-300 ease-in-out hover:bg-white hover:text-black"
            >
              Get Started!
            </button>
          </div>
        </div>

        <div className="relative mt-10 h-[320px] w-full max-w-md md:mt-0 md:h-[400px] md:flex-1 lg:h-[460px]">
          <motion.img
            src={cogImage.src}
            alt="Cog Image"
            className="mx-auto h-full w-auto max-w-xs md:absolute md:left-0 md:max-w-none"
            animate={{
              translateY: [-30, 30],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          />
          <Image
            src={cylinderImage}
            alt="Cylinder Image"
            width={220}
            height={220}
            className="hidden md:absolute md:-top-8 md:-left-8 md:block"
          />
          <Image
            src={noodleImage}
            width={220}
            alt="Noodle Image"
            className="absolute bottom-0 right-0 hidden rotate-[30deg] lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export const ProductShowcase = () => {
  return (
    <section className="overflow-x-clip bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-[540px]">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-[#222]/10 px-3 py-1 text-sm tracking-tight">
              Boost your productivity
            </div>
          </div>
          <h2 className="mt-5 bg-gradient-to-b from-black to-[#001E80] bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]">
            Fastrack your creativity!
          </h2>
          <p className="mt-5 text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E]">
            Effortlessly turn your ideas into a video in just minutes with this
            application.
          </p>
        </div>
        <div className="relative">
          <Image
            src={productImage}
            alt="Product Image"
            className="rounded-2xl mt-10"
          />
          <Image
            src={pyramidImage}
            alt="Pyramid Image"
            height={262}
            width={262}
            className="absolute -right-9 -top-8 hidden md:block"
          />
          <Image
            src={tubeImage}
            alt="Tube Image"
            height={248}
            className="absolute bottom-5 -left-9 hidden md:block"
          />
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
  },
];
const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);

export const Testimonials = () => {
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-[540px]">
          <h2 className="bg-gradient-to-b from-black to-[#001E80] bg-clip-text pt-10 text-center text-3xl font-bold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]">
            What are users say ?
          </h2>
          <p className="mt-5 text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E]">
            From intuitive design to powerful features, our app has become an
            essential tool for users around the world.
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-6">
          <div className="flex flex-col gap-6">
            {firstColumn.map(({ text, imageSrc, name }) => (
              <div
                key={name}
                className="w-full max-w-5xl rounded-3xl border border-[#222222]/10 p-10 shadow-[0_7px_14px_#EAEAEA]"
              >
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    src={imageSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 hidden flex-col gap-6 md:flex">
            {secondColumn.map(({ text, imageSrc, name }) => (
              <div
                key={name}
                className="mb-6 w-full max-w-5xl rounded-3xl border border-[#222222]/10 p-10 shadow-[0_7px_14px_#EAEAEA]"
              >
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    src={imageSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
