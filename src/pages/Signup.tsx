// components from headlessui/react
import { Field, Input, Label } from "@headlessui/react";
// icons from lucide-react
import { CoffeeIcon, Eye, EyeClosed } from "lucide-react";
// importing clsx for conditional classnames
import clsx from "clsx";
// importing react hooks
import React, { useState } from "react";
// importing react router for navigation
import { Link, useNavigate } from "react-router";
// importing authStore
import useAuthStore from "../store/authStore";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const { success } = await signup({email: formData.email, password: formData.password, fullname: formData.name });
    if (success) {
      navigate('/');
    } else {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary dark:bg-secondary p-4">
      <h1 className="font-bold text-4xl mb-4 w-2/3 sm:w-1/2 text-center">
        Create your Bakshidevs blog account!
      </h1>
      <p className="w-2/3 sm:w-1/2 text-center mb-6 text-secondary/60 dark:text-primary/60">
        Sign up to join our community and start sharing your own articles and insights.
      </p>
      <div className="xs:w-80 w-96 border p-4 rounded-lg">
        <h2 className="flex font-medium gap-2"><CoffeeIcon /> Sign Up</h2>
        <form aria-label="signup-form" className="">
          <Field className="relative">
            <Label htmlFor="name">Name</Label>
            <Input
              value={formData.name}
              onChange={handleChange}
              className={clsx(
                'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
              )}
              name="name"
              type="text"
            />
          </Field>
          <Field className="relative">
            <Label htmlFor="email">Email</Label>
            <Input
              value={formData.email}
              onChange={handleChange}
              className={clsx(
                'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
              )}
              name="email"
              type="email"
            />
          </Field>
          <Field className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              value={formData.password}
              onChange={handleChange}
              className={clsx(
                'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
              )}
              name="password"
              type={showPassword ? "text" : "password"}
            />
            <button type="button" className="absolute bottom-2 right-2" onClick={() => setShowPassword(prev => !prev)}>
              {!showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </Field>
          <Field className="relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              value={formData.confirmPassword}
              onChange={handleChange}
              className={clsx(
                'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
              )}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
            />
            <button type="button" className="absolute bottom-2 right-2" onClick={() => setShowConfirmPassword(prev => !prev)}>
              {!showConfirmPassword ? <Eye /> : <EyeClosed />}
            </button>
          </Field>
          <button disabled={isLoading} type="submit" onClick={handleSignup} className="w-full p-2 mt-4 text-primary dark:text-secondary rounded bg-secondary hover:bg-secondary/80 font-medium dark:bg-accent dark:hover:bg-accent/80 transition-colors">
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="">
          <p className="mt-2 text-center">
            Already have an account? <Link to="/login" className="text-olive hover:text-accent underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
