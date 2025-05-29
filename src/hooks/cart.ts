import type { Shoe, ShoeItem } from "@/model/shoe";
import { create } from "zustand";

interface CartState {
  items: ShoeItem[];
  addItem: (item: Shoe, quantity?: number) => void;
  removeItem: (item: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity }],
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));
