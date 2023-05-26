import Image from "next/image";

const loading = () => {
  return (
    <div className="w-full flex-center">
      <Image
        src="assets/icons/loader.svg"
        alt="loading"
        width={70}
        height={70}
        className="object-contain"
      />
    </div>
  );
};

export default loading;
