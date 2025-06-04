import LoginForm from "@/components/form/LoginForm";

 
const Index = () => {
  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">
            Logo
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
