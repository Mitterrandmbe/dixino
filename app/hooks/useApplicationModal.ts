import { create } from "zustand";

interface ApplicationModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useApplicationModal = create<ApplicationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useApplicationModal;