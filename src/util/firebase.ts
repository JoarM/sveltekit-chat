import { config } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { toast } from "../stores/toast";
import { modal } from "../stores/modal";
import type { UserPermisions } from "../stores/user";

export const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);

export function signInWithGoogle() {
    const credential = signInWithPopup(auth, new GoogleAuthProvider());
    return loginHandler(credential);
}

export async function firebaseSignOut() {
    await signOut(auth);
    toast.set({
        message: "Thanks for being round, hope to see ya back here!",
        icon: "👋",
    });
}

async function loginHandler(promise: Promise<UserCredential>) {
    let res: any, serverError: string = "";
    try {
        res = await promise;
        modal.set(null);
        toast.set({
            message: "You've been logged in.",
            type: 'success',
        });
    } catch (err : any)
    {
        serverError = err.message;
        console.log(err);
        toast.set({
            message: serverError,
            type: "error",
        });
    }
    return { res, serverError };
}

async function updateUserPerms(uid: string, perms: UserPermisions) {
    const { doc, setDoc, getFirestore } = await import("firebase/firestore");
    const firestore = getFirestore();
    const permsRef = doc(firestore, `perms/${uid}`)

    setDoc(permsRef, perms);
}

export function makeAdmin(uid: string) : any {
    updateUserPerms(uid, {
        banned: false,
        status: "Admin",
    });
}

export function removeAdmin(uid: string) : any {
    updateUserPerms(uid, {
        banned: false,
        status: "Member",
    });
}

export function banUser(uid: string) : any {
    updateUserPerms(uid, {
        banned: true,
        status: "Member",
    });
}

export function unbanUser(uid: string) : any {
    updateUserPerms(uid, {
        banned: false,
        status: "Member",
    });
}
