import { create } from "zustand";

interface ApplicantInfoModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useApplicantInfoModal = create<ApplicantInfoModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useApplicantInfoModal;