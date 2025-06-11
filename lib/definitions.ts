import { z } from "zod";

 

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email!" }).trim(),
  password: z
    .string()
    .min(8, { message: "Passwords should be minimum 8 characters long" })
    .trim(),
});

export {LoginFormSchema };
