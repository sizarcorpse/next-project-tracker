import { ProjectsPagination, ProjectsToolbar } from "@/components/projects/";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full">
      <div className="container max-w-screen-2xl mx-auto p-6 grid grid-cols-12 gap-4 grow">
        <div className="col-span-12 rounded-md border p-4 gap-4 md:col-span-12 flex flex-col items-start justify-start">
          <ProjectsToolbar />
          <div className="grow"> {children}</div>
          <ProjectsPagination />
        </div>
      </div>
    </div>
  );
}
