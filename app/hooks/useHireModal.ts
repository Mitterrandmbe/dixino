import { create } from "zustand";

interface HiredModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useHiredModal = create<HiredModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useHiredModal;