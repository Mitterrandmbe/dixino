import { create } from "zustand";

interface ListingInfoModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useListingInfoModal = create<ListingInfoModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useListingInfoModal;