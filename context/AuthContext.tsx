'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type UserData = {
    name?: string;
    surname?: string;
    email?: string;
    [key: string]: any;
};

type AuthContextType = {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    refreshUserData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    refreshUserData: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (uid: string) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                setUserData(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchUserData(currentUser.uid);
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const refreshUserData = async () => {
        if (user) {
            await fetchUserData(user.uid);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userData, loading, refreshUserData }}>
            {children}
        </AuthContext.Provider>
    );
}
