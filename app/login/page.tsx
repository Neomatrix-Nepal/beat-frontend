import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";
import logo from "@/image/loginLogo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-foreground flex  justify-center items-center flex-col p-4">
     <h1 className=" -translate-y-[10vh] text-4xl md:text-5xl flex justify-center items-center font-bold text-white tracking-wide">
  <Image src={logo} alt="logo" />
</h1>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
