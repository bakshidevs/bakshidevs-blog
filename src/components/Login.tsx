
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
import { notify } from "./ui/Toast";

// form data type
type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const { login, isLoading } = useAuthStore();
    // userNavigate to navigate to user after login
    const navigate = useNavigate();

    // state to manage password visibility
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // handle login function
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // validate form data
        if (!formData.email || !formData.password) {
            notify.warning("Please fill in all fields.");
            return;
        }

        // calling login function from authStore
        const email = formData.email.trim().toLowerCase();
        const password = formData.password.trim();

        const { success } = await login({ email, password });
        if (success) {
            // redirect to home page after successful login
            navigate('/');
        } else {
            // show error message if login failed
            notify.error("Login failed. Please check your credentials and try again.");
        }

    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="font-bold text-4xl mb-4 md:w-2/3 sm:w-1/2 text-center">
                Welcome back to Bakshidevs blog!
            </h1>
            <p className="md:w-2/3 sm:w-1/2 text-center mb-6 text-secondary/60 dark:text-primary/60">
                Please enter your credentials to sign in and continue reading our latest articles and updates.
            </p>
            <div className="xs:w-80 bg-accent/5 w-96 border border-olive dark:border-accent p-4 rounded-lg">
                <h2 className="flex items-center underline font-medium gap-2 text-accent text-xl"><CoffeeIcon className="w-8 h-8" /> Sign In</h2>
                <hr className="my-1 bg-accent/50 border-0 h-0.5 rounded-xl"/>
                <form aria-label="login-form" className="">
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
                            autoComplete="email"
                            placeholder="Enter your email address"
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
                            autoComplete="current-password"
                            placeholder="Enter your password"
                        />
                        <button type="button" className="absolute bottom-2 right-2 text-accent" onClick={() => setShowPassword(prevState => !prevState)}>
                            {!showPassword ? <Eye /> : <EyeClosed />}
                        </button>
                    </Field>
                    <button disabled={isLoading} type="submit" onClick={handleLogin} className="w-full p-2 mt-4 text-primary dark:text-secondary rounded bg-secondary hover:bg-secondary/80 font-medium dark:bg-accent dark:hover:bg-accent/80 transition-colors">
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="">
                    <p className="mt-2 text-center">
                        Doesn't have an account? <Link to="/register" className="text-olive hover:text-accent underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
