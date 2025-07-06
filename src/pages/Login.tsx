
// components from headlessui/react
import { Field, Input, Label } from "@headlessui/react";

// icons from lucide-react
import { CoffeeIcon, Eye, EyeClosed } from "lucide-react";

// importing clsx for conditional classnames
import clsx from "clsx";

// importing react hooks
import { useState } from "react";

// importing react router for navigation
import { Link } from "react-router";
export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <div className="flex flex-col items-center justify-center h-full bg-primary dark:bg-secondary p-4">
            <h1 className="font-bold text-4xl mb-4 w-2/3 sm:w-1/2 text-center">
                Welcome back to Bakshidevs blog!
            </h1>
            <p className="w-2/3 sm:w-1/2 text-center mb-6 text-secondary/60 dark:text-primary/60">
                Please enter your credentials to sign in and continue reading our latest articles and updates.
            </p>
            <div className="xs:w-80 w-96 border p-4 rounded-lg">
                <h2 className="flex font-medium gap-2"><CoffeeIcon /> Sign In</h2>
                <div aria-label="login-form-container" className="">
                    <Field className="relative">
                        <Label htmlFor="email">Email</Label>
                        <Input
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
                            className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                            )}
                            name="password"
                            type={showPassword ? "text" : "password"}
                        />
                        <button className="absolute bottom-2 right-2" onClick={() => setShowPassword(prevState => !prevState)}>
                            {!showPassword ? <Eye /> : <EyeClosed />}
                        </button>
                    </Field>
                    <button className="w-full p-2 mt-4 text-primary dark:text-secondary rounded bg-secondary hover:bg-secondary/80 font-medium dark:bg-accent dark:hover:bg-accent/80 transition-colors">
                        Login
                    </button>
                </div>
                <div className="">
                    <p className="mt-2 text-center">
                        Doesn't have an account? <Link to="/register" className="text-olive hover:text-accent underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
