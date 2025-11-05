import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

// Interfaz para los items del carrito con cantidad
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartActions {
  // Gestión de items
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Utilidades de cálculo
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
  getItemPrice: (productId: string) => number;
  isInCart: (productId: string) => boolean;
  
  // Gestión de cantidad individual
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

export type CartStore = CartState & CartActions;

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      items: [],

      // Agregar producto al carrito
      addItem: (product: Product, quantity = 1) => 
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            // Si ya existe, incrementar cantidad
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            // Si no existe, agregar nuevo item
            return {
              items: [...state.items, { product, quantity }]
            };
          }
        }),

      // Remover producto completamente del carrito
      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        })),

      // Actualizar cantidad específica de un producto
      updateQuantity: (productId: string, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            // Si la cantidad es 0 o negativa, remover el item
            return {
              items: state.items.filter(item => item.product.id !== productId)
            };
          }
          
          return {
            items: state.items.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          };
        }),

      // Incrementar cantidad en 1
      increaseQuantity: (productId: string) =>
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        })),

      // Decrementar cantidad en 1
      decreaseQuantity: (productId: string) =>
        set((state) => {
          return {
            items: state.items.map(item => {
              if (item.product.id === productId) {
                const newQuantity = item.quantity - 1;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
              }
              return item;
            }).filter(item => item.quantity > 0)
          };
        }),

      // Limpiar todo el carrito
      clearCart: () => set({ items: [] }),

      // Obtener cantidad total de items (suma de todas las cantidades)
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      // Obtener precio total del carrito
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => 
          total + (item.product.price * item.quantity), 0
        );
      },

      // Obtener cantidad específica de un producto
      getItemQuantity: (productId: string) => {
        const state = get();
        const item = state.items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      },

        // Obtener precio total de un producto específico en el carrito
        getItemPrice: (productId: string) => {
            const state = get();
            const item = state.items.find(item => item.product.id === productId);
            return item ? item.product.price * item.quantity : 0;
        },

      // Verificar si un producto está en el carrito
      isInCart: (productId: string) => {
        const state = get();
        return state.items.some(item => item.product.id === productId);
      },
    }),
    {
      name: "cart-storage", // Nombre correcto para el carrito
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export default useCartStore;
