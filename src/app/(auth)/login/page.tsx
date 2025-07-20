import LoginForm from "@/src/components/form/LoginForm";
import Image from "next/image";

const Index = () => {
  return (
    <div className="min-h-screen bg-foreground flex  justify-center items-center flex-col p-4">
      <h1 className=" -translate-y-[10vh] text-4xl md:text-5xl flex justify-center items-center font-bold text-white tracking-wide">
        <Image src={"/image/logo.png"} alt="logo" />
      </h1>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
