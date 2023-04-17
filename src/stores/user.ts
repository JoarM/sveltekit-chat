import { writable, derived } from "svelte/store";
import { auth } from "../util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export interface UserPermisions {
    banned: boolean;
    status: "Owner" | "Admin" | "Member";
}

export const user = writable<User | null>(null);
export const userPerms = writable<UserPermisions | null>(null);

let unsubPerms: any;

onAuthStateChanged(auth, async (fbUser) => {
    user.set(fbUser);
    if (fbUser) {
        const { doc, onSnapshot, getFirestore } = await import("firebase/firestore");
        const firestore = getFirestore();
        const permsRef = doc(firestore, `perms/${fbUser.uid}`)

        unsubPerms = onSnapshot(permsRef, (snap) => {
            userPerms.set(snap.data() as UserPermisions);
        });
    } else {
        unsubPerms && unsubPerms();
        userPerms.set(null);
    }
});

export const isAdmin = derived([userPerms], ([$userPerms]) => {
    return $userPerms?.status != "Member";
});