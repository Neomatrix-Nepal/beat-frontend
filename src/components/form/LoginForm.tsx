"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "@/src/lib/use-toast";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      console.log(res);

      if (!res?.ok) {
        // setIsLoading(false);
        return alert("Invalid email or password");
      }
      setTimeout(() => {
        alert("Login successful");
        redirect("/");
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-primary border border-gray-700/50 rounded-md p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          LOG IN
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: "Email is required" })}
            className="bg-foreground border-gray-600 text-white font-michroma placeholder-gray-400 h-12 rounded-lg focus:border-purple-500 focus:ring-purple-500 transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-michroma">
              {errors.email.message}
            </p>
          )}

          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            className="bg-foreground border-gray-600 text-white font-michroma placeholder-gray-400 h-12 rounded-lg focus:border-purple-500 focus:ring-purple-500 transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-michroma">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-lg font-michroma bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
            <LogIn className="ml-2 h-5 w-5" />
          </Button>
          <a
            href="#"
            className="text-sm font-michroma text-blue-300 hover:text-purple-400 transition-colors block mt-2"
          >
            Forgot your password?
          </a>
        </div>

        <div className="text-center">
          <a className="text-gray-400 text-sm font-michroma">
            Don't have an account?{" "}
          </a>
          <a
            href="#"
            className="text-blue-300 font-michroma hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
