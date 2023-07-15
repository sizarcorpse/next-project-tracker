import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDialog } from "@/hooks/";
import { type } from "os";

import { FC, ReactNode } from "react";

interface PTDialogProps {
  children: ReactNode;
  className?: string;
}

const PTDialog: FC<PTDialogProps> = ({ children, className }) => {
  const { isOpen, onClose, onOpen } = useDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={className}>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PTDialog;
