import { create } from "zustand";

interface ArchiveListingModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useArchiveListingModal = create<ArchiveListingModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useArchiveListingModal;