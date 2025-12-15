import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  limit,
  where,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "../types/product";

const productsCollectionRef = collection(db, "products");

export async function getProducts(limitCount?: number, category?: string): Promise<Product[]> {
  try {
    const constraints: QueryConstraint[] = [];

    // Si se proporciona una categoría, añadimos una condición 'where'
    if (category) {
      constraints.push(where('category', '==', category));
    }

    // Si se proporciona un limitCount, lo añadimos a las restricciones
    if (typeof limitCount === 'number' && limitCount > 0) {
      constraints.push(limit(limitCount));
    }

    // Construimos la consulta con todas las restricciones acumuladas
    const q = query(productsCollectionRef, ...constraints);

    const snapshot = await getDocs(q);

    const products: Product[] = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      });
    });

    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw new Error("No se pudieron cargar los productos.");
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Product, "id">),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw new Error("Error al obtener el producto.");
  }
}