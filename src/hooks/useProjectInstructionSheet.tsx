import { create } from "zustand";

interface ProjectInstructionSheetInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProjectInstructionSheet = create<ProjectInstructionSheetInterface>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useProjectInstructionSheet;
