import { getCurrentUser } from "@/actions/";
import AccountUpdateForm from "@/components/auth/form/AccountUpdateForm";
import { redirect } from "next/navigation";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mx-auto max-w-screen-2xl">
      {children}
    </div>
  );
};

const AccountSettingsPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin?callbackUrl=/profile");
  }

  return (
    <Container>
      <div className="flex flex-row items-start justify-between flex-wrap gap-8 py-8 md:flex-nowrap">
        <div className="basis-full flex flex-col gap-6 items-start justify-start bg-slate-100 p-4 rounded-md md:basis-[296px]"></div>
        <div className="basis-full flex flex-col gap-4 items-start justify-start bg-slate-100 p-4 rounded-md md:basis-[calc(100%-296px-32px)]">
          <AccountUpdateForm />
        </div>
      </div>
    </Container>
  );
};

export default AccountSettingsPage;
