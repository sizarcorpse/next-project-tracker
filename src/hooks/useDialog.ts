import { create } from "zustand";

interface DialogInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDialog = create<DialogInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDialog;
