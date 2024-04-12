import { create } from "zustand";

interface ConfirmActionModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useConfirmActionModal = create<ConfirmActionModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useConfirmActionModal;