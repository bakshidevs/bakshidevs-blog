import { Link } from "react-router";


export default function Settings() {
  return (
    <div className="flex flex-col items-center justify-center h-full  p-4">
      <div className="p-6 w-1/2 md:w-1/3 lg:w-1/4 border rounded-md border-secondary/30 dark:border-primary/30 bg-secondary/10 dark:bg-primary/10">
        <h1 className="font-bold text-4xl mb-4">This page is under construction!</h1>
        <p className=" mb-6">
          We are working hard to bring you this feature. Stay tuned!
        </p>
        <p className="">
          In the meantime, you can check out our <Link to="/" className="text-accent hover:underline">homepage</Link> or <Link to="/write" className="text-accent hover:underline">write a new post</Link>.
        </p>
        <img
          className="rounded-md mt-4"
          src="https://images.unsplash.com/photo-1612367980327-7454a7276aa7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="" />
      </div>
    </div>
  )
}




// import { Field, Input, Label } from "@headlessui/react";
// import clsx from "clsx";
// import React, { useState } from "react";
// import useAuthStore from "../store/authStore";
// import useThemeStore from "../store/themeStore";

// const themeOptions = [
//   { label: "System", value: "system" },
//   { label: "Light", value: "light" },
//   { label: "Dark", value: "dark" },
// ];

// export default function Settings() {
//   const { user, isLoading } = useAuthStore();
//   const { theme, setTheme } = useThemeStore();
//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     name: user?.name || "",
//     email: user?.email || "",
//     password: "",
//     confirmPassword: "",
//     favoriteTheme: theme || "system"
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({ ...prev, favoriteTheme: e.target.value }));
//     setTheme && setTheme(e.target.value);
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.username) {
//       alert("Name, username, and email are required.");
//       return;
//     }
//     if (formData.password && formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }
//     // TODO: Implement updateProfile logic here
//     alert("Profile updated (mock). Implement backend logic.");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full bg-primary dark:bg-secondary p-4">
//       <h1 className="font-bold text-4xl mb-4 w-2/3 sm:w-1/2 text-center">User Settings</h1>
//       <p className="w-2/3 sm:w-1/2 text-center mb-6 text-secondary/60 dark:text-primary/60">Manage your account settings here.</p>
//       <div className="xs:w-80 w-96 border p-4 rounded-lg">
//         <form aria-label="settings-form" onSubmit={handleUpdate}>
//           <Field className="relative mb-4">
//             <Label htmlFor="username">Username</Label>
//             <Input
//               value={formData.username}
//               onChange={handleChange}
//               className={clsx(
//                 'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
//                 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
//               )}
//               name="username"
//               type="text"
//             />
//           </Field>
//           <Field className="relative mb-4">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               value={formData.name}
//               onChange={handleChange}
//               className={clsx(
//                 'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
//                 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
//               )}
//               name="name"
//               type="text"
//             />
//           </Field>
//           <Field className="relative mb-4">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               value={formData.email}
//               onChange={handleChange}
//               className={clsx(
//                 'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
//                 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
//               )}
//               name="email"
//               type="email"
//             />
//           </Field>
//           <Field className="mb-4">
//             <Label className="block mb-2">Favorite Theme</Label>
//             <div className="flex gap-4">
//               {themeOptions.map(opt => (
//                 <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="favoriteTheme"
//                     value={opt.value}
//                     checked={formData.favoriteTheme === opt.value}
//                     onChange={handleThemeChange}
//                     className="accent-accent"
//                   />
//                   <span>{opt.label}</span>
//                 </label>
//               ))}
//             </div>
//           </Field>
//           <Field className="relative mb-4">
//             <Label htmlFor="password">New Password</Label>
//             <Input
//               value={formData.password}
//               onChange={handleChange}
//               className={clsx(
//                 'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
//                 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
//               )}
//               name="password"
//               type={showPassword ? "text" : "password"}
//             />
//             <button type="button" className="absolute bottom-2 right-2" onClick={() => setShowPassword(prev => !prev)}>
//               {!showPassword ? "Show" : "Hide"}
//             </button>
//           </Field>
//           <Field className="relative mb-4">
//             <Label htmlFor="confirmPassword">Confirm New Password</Label>
//             <Input
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={clsx(
//                 'mt-3 block w-full rounded-lg border-none bg-secondary/10 dark:bg-primary/10 px-3 py-2 text-sm/6 text-secondary dark:text-primary',
//                 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
//               )}
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//             />
//             <button type="button" className="absolute bottom-2 right-2" onClick={() => setShowConfirmPassword(prev => !prev)}>
//               {!showConfirmPassword ? "Show" : "Hide"}
//             </button>
//           </Field>
//           <button disabled={isLoading} type="submit" className="w-full p-2 mt-4 text-primary dark:text-secondary rounded bg-secondary hover:bg-secondary/80 font-medium dark:bg-accent dark:hover:bg-accent/80 transition-colors">
//             {isLoading ? "Saving..." : "Save Changes"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
