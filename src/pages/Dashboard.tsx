import { Link } from "react-router";


export default function Dashboard() {
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
