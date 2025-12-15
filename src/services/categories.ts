import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  limit,
  type Query
} from "firebase/firestore";
import { db } from "./firebase";
import type { Category } from "../types/category";

const categoriesCollectionRef = collection(db, "categories");

export async function getCategories(limitCount?: number): Promise<Category[]> {
  try {
    let q: Query = query(categoriesCollectionRef);

    // Si se proporciona un limitCount, lo aplicamos a la consulta
    if (typeof limitCount === 'number' && limitCount > 0) {
      q = query(categoriesCollectionRef, limit(limitCount));
    }

    const snapshot = await getDocs(q);

    const categories: Category[] = [];
    snapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...(doc.data() as Omit<Category, "id">),
      });
    });

    return categories;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw new Error("No se pudieron cargar las categorías.");
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Category, "id">),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener la categoría con ID ${id}:`, error);
    throw new Error("Error al obtener la categoría.");
  }
}
