import { getCurrentUser } from "@/actions/";
import ProfileUpdateForm from "@/components/auth/form/ProfileUpdateForm";
import { SettingsMenu } from "@/components/navigation";
import { redirect } from "next/navigation";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mx-auto max-w-screen-2xl">
      {children}
    </div>
  );
};

const ProfileUpdatePage = async () => {
  const user = await getCurrentUser();

  return (
    <Container>
      <div className="flex flex-row items-start justify-between flex-wrap gap-8 py-8 md:flex-nowrap">
        <div className="basis-full flex flex-col gap-6 items-start justify-start bg-slate-100 p-4 rounded-md md:basis-[296px]">
          <SettingsMenu image={user?.image as string} />
        </div>
        <div className="basis-full flex flex-col gap-4 items-start justify-start bg-slate-100 p-4 rounded-md md:basis-[calc(100%-296px-32px)]">
          <ProfileUpdateForm />
        </div>
      </div>
    </Container>
  );
};

export default ProfileUpdatePage;
