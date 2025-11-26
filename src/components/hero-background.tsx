import Image from "next/image";

export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-linear-to-b from-[#000A15]/50 to-[#000A15]/100" />
      <Image
        src={"/images/background-cubes.webp"}
        alt=""
        height={900}
        width={800}
        aria-hidden="true"
        role="presentation"
        loading="eager"
        priority
        fetchPriority="high"
        className="absolute -top-10 -right-10 -z-20"
      />
      <Image
        src={"/images/background-cubes.webp"}
        alt=""
        height={900}
        width={800}
        aria-hidden="true"
        role="presentation"
        loading="eager"
        priority
        fetchPriority="high"
        className="absolute -top-96 -left-96 -z-20 hidden md:block"
      />
    </>
  );
};
