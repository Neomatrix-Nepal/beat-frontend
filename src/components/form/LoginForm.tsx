"use client";

import { loginAction } from "@/src/app/actions/form-actions";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuthStore } from "@/src/store/authStore";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
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
    setError,
  } = useForm<LoginFormInputs>();

  const router = useRouter();
  const { setAccessToken, setUser } = useAuthStore();

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await loginAction(data);
    console.log(result);

    if (result.success && result.accessToken && result.redirect) {
      document.cookie = `userRole=${result.user.roles}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; SameSite=Strict`;
      console.log("vayo hai vayo");
      setAccessToken(result.accessToken);
      setUser(result.user);
      router.push(result.redirect || "/");
    } else {
      setError("email", { message: result.error || "Login failed" });
      setError("password", { message: "" });
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
