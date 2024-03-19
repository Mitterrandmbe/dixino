import { create } from "zustand";

interface ProfileClientModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useProfileClientModal = create<ProfileClientModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useProfileClientModal;