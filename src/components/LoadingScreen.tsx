import { CoffeeIcon } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center text-secondary dark:text-primary bg-gradient-to-b from-transparent to-base/10 dark:to-accent/10">
      <div className="relative">
        <CoffeeIcon className="w-32 h-32 text-base dark:text-accent animate-pulse" />
        {/* Steam animation using ping */}
        <span className="absolute top-2 right-5 h-3 w-3 animate-ping rounded-full bg-base/40 dark:bg-accent/40 opacity-75 delay-100"></span>
        <span className="absolute top-6 right-8 h-2 w-2 animate-ping rounded-full bg-base/40 dark:bg-accent/40 opacity-75 delay-300"></span>
        <span className="absolute top-4 right-12 h-4 w-4 animate-ping rounded-full bg-base/40 dark:bg-accent/40 opacity-75 delay-500"></span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-2xl font-bold text-base dark:text-accent">
          Brewing Content...
        </h2>
        <p className="text-sm text-secondary/70 dark:text-primary/70">
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}
