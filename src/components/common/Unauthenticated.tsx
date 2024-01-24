import Link from "next/link";
const Unauthenticated = () => {
  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      <h2 className="text-2xl font-bold lg:text-3xl">Unauthenticated 🤬</h2>
      <p>
        You are not authenticated to view this page. Please contact your
        administrator.
        <br /> Or you can go to the{" "}
        <Link href="/signin" className="underline">
          Login
        </Link>
        .
      </p>
    </div>
  );
};

export default Unauthenticated;
