import { create } from "zustand";

interface ToggleState {
    toggle: boolean;
    setToggle: (newToggle: boolean) => void;
    handleToggle: () => void;
}

export const useNavToggle = create<ToggleState>((set) => ({
    toggle: false,

    setToggle: (newToggle: boolean) => {
        set({toggle: newToggle})
    },

    handleToggle: () => {
        set((state) => ({toggle: !state.toggle}))
    }
}))