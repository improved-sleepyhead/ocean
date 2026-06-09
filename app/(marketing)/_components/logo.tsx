import Image from "next/image"

export const Logo = () => {
  return (
    <div className="flex items-center justify-center md:gap-x-0">
      {/* Лого для мобильных устройств */}
      <div className="md:hidden flex justify-center items-center">
        <Image
          src="/logo_light.svg"
          height={30}
          width={30}
          alt="Logo"
          priority
          className="dark:hidden"
        />
        <Image
          src="/logo_dark.svg"
          height={30}
          width={30}
          alt="Logo"
          className="hidden dark:block"
        />
      </div>

      {/* Лого и текст для десктопа */}
      <div className="hidden md:flex items-center gap-x-2">
        <Image
          src="/logo_light.svg"
          height={60}
          width={60}
          alt="Logo"
          priority
          className="dark:hidden"
        />
        <Image
          src="/logo_dark.svg"
          height={60}
          width={60}
          alt="Logo"
          className="hidden dark:block"
        />
        <p className="text-2xl -ml-2 font-semibold font-montserrat text-[#008EDA] dark:text-white">
          cean
        </p>
      </div>
    </div>
  )
}
