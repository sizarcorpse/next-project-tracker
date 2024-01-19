"use client";

import { updateUserProfilePhoto } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/utils/uploadthing";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";

const UpdateProfilePhoto = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-xs h-auto px-4 py-2 rounded-xl bg-muted text-muted-foreground shadow-sm"
          >
            Change
            <ImagePlus className="ml-2 w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-popover sm:max-w-screen-md min-h-fit flex flex-col items-start justify-start gap-6 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 ">
          <DialogHeader className="w-full">
            <DialogTitle className="text-xl text-popover-foreground">
              Upload Profile Photo
            </DialogTitle>
            <DialogDescription className="text-sm text-popover-foreground">
              Upload a new Profile Photo here. The image should be a square with
              a minimum size of 296x296 pixels. max. 4MB.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <UploadDropzone
              className=" bg-primary-foreground rounded-xl w-full h-72"
              endpoint="imageUploader"
              config={{
                mode: "auto",
              }}
              content={{
                uploadIcon: () => (
                  <ImagePlus className="w-8 h-8" strokeWidth={1.75} />
                ),
                button({ ready, isUploading, uploadProgress }) {
                  return (
                    <div className="text-sm h-auto mt-2 px-4 py-2 rounded-xl bg-success text-success-foreground shadow-sm">
                      {ready && !isUploading && !uploadProgress && "Upload"}
                      {isUploading && !uploadProgress && "Uploading..."}
                      {uploadProgress > 0 && `${uploadProgress}%`}
                      {!ready &&
                        !isUploading &&
                        !uploadProgress &&
                        "Getting ready..."}
                    </div>
                  );
                },
              }}
              onClientUploadComplete={async (res) => {
                try {
                  const r = await updateUserProfilePhoto(res[0]);
                  if (r.status === "error") {
                    toast.error(r.message);
                    return;
                  }

                  toast.success("Profile Photo updated!");
                } catch (error: any) {
                  toast.error(error?.message);
                }
              }}
              onUploadError={(error: Error) => {
                toast.error(error.message);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfilePhoto;
