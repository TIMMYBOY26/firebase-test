import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { useState } from "react";


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with google</button>
            <button onClick={logout}>Sign Out</button>
        </div>
    );
};
