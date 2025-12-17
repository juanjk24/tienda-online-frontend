import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getUserRole } from '../services/auth';
import useAuthStore from '../store/auth';

export function useAuthSync() {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuario autenticado - obtener su rol
        const role = await getUserRole();
        
        login({
          uid: user.uid,
          email: user.email,
          role: role,
        });
      } else {
        // Usuario no autenticado
        logout();
      }
    });

    // Cleanup al desmontar
    return () => unsubscribe();
  }, [login, logout]);
}
