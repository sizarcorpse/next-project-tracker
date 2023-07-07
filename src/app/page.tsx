import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const about = {
  packages: [
    "NextJS",
    "NextAuth",
    "TailwindCSS",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "React Hook Form",
    "React-hot-toast",
    "Swr",
    "React-icons",
    "Zod",
  ],
};

const Home = async () => {
  const { packages } = about;
  return (
    <main className="flex flex-col gap-6 items-center justify-center p-6">
      <div className="container max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-xl font-bold text-primary uppercase md:text-4xl lg:text-6xl text-center animate-in fade-in zoom-in">
            Next Auth Boilerplate
          </h1>
          <div className="flex flex-row items-center justify-center flex-wrap gap-2">
            {packages.map((item, index) => (
              <p
                key={index}
                className="px-2 py-1 rounded-lg border border-border text-sm text-primary font-semibold cursor-pointer hover:bg-primary hover:text-background transition-all duration-300 ease-in-out"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
