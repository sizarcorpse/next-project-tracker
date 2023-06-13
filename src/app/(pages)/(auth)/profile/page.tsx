import { getCurrentUser } from "@/actions/";
import { UserInformation } from "@/components/profile/";
import { redirect } from "next/navigation";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 my-8 sm:px-6 md:px-8 lg:px-16 xl:px-20 mx-auto max-w-screen-2xl">
      {children}{" "}
    </div>
  );
};

const ProfilePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin?callbackUrl=/profile");
  }

  const { image, name, username, role, email } = user || {};

  return (
    <Container>
      <div className="flex flex-row items-start justify-between flex-wrap gap-8 md:flex-nowrap">
        <div className="basis-full flex flex-col gap-6 items-start justify-start bg-slate-100 p-4 rounded-md md:basis-[296px]">
          <UserInformation
            data={{
              name,
              username,
              role,
              image,
              email,
            }}
          />
        </div>
        <div className="basis-full flex flex-col gap-4 items-start justify-start bg-slate-100 p-2 rounded-md md:basis-[calc(100%-296px-32px)]">
          {/* {JSON.stringify(user, null, 2)} */}
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
