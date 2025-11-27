import Image from 'next/image'

export const FooterBackground = () => {
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-gradient-to-t from-[#000A15]/90 to-[#000A15]/70" />

      <Image
        src="/images/background-cubes.webp"
        alt=""
        height={300}
        width={600}
        aria-hidden="true"
        role="presentation"
        loading="lazy"
        className="absolute -right-10 -bottom-20 -z-20 opacity-60"
      />

      <Image
        src="/images/background-cubes.webp"
        alt=""
        height={300}
        width={600}
        aria-hidden="true"
        role="presentation"
        loading="lazy"
        className="absolute bottom-30 -left-50 -z-20 hidden opacity-60 md:block"
      />
    </>
  )
}
