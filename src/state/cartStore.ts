import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../models/ProductModel";
import { CartItem } from "../models/CartItemModel";

interface CartState {
  nb: number;
  items: { [key: string]: CartItem };
  
  addItem: (item: CartItem) => void;
  deleteItem: (id: string) => void;
  editItem: (id: string, quantity: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      nb: 0,
      items: {},

      addItem: (item: Product) => {
        set((state) => {
          // prepare vars
          let newItem: CartItem
          const items = {...state.items}

          // check if item exists
          const obj = items[item.id]
          if (obj) {
            newItem = {...obj, quantity: obj.quantity + 1}
          }

          // else
          else {
            newItem = {...item, quantity: 1}
          }

          // update items
          items[item.id] = newItem

          // set state
          return {
              nb: state.nb + 1,
              items: items
          }
        })
      },

      deleteItem: (id: string) => {
        set((state) => {
            // copy items and delete that key
            const items = {...state.items}
            delete items[id]

            return {
                nb: state.nb - state.items[id].quantity,
                items: items,
            }
        });
      },

      editItem: (id: string, quantity: number) => {
        set((state) => {
            // copy items
            const items = {...state.items};

            // new nb total
            let total = state.nb - items[id].quantity + quantity;
            if (total > 99) {
                total = 99
            }

            // set item quantity
            items[id].quantity = quantity;

            // set items and nb panier
            return {
                nb: total,
                items: items,
            };
        });
      },
    }),
    {
      name: "cart",
    }
  )
);

// export const
