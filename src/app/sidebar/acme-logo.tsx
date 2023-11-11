import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-black dark:text-white">
      <Image src="/logo-small.png" alt="logo" width={70} height={70} />
      <p className="text-[44px] ">Vamos Berlin!</p>
    </div>
  );
}
