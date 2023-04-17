<script lang="ts">
    import type { User } from "firebase/auth";
    import type { Message } from "../../stores/collections";
    let message = "";

    export let user: User | null;

    async function sendMessage() {
        if (!user) return;
        if (!user.displayName) return;
        if (!user.photoURL) return;
        const { collection, addDoc, getFirestore, Timestamp } = await import("firebase/firestore");
        const firestore = getFirestore();
        const messageRef = collection(firestore, "messages");
        const data: Message = {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            createdAt: Timestamp.now(),
            message: message,
        }

        addDoc(messageRef, data);
        message = "";
    }
</script>

<form class="flex items-center gap-1" on:submit={sendMessage}>
    <input type="text" bind:value={message} required={true} placeholder="Message chatroom" class="p-2 rounded-md flex-grow outline-none border-none text-slate-950">
    <button class="bg-white p-2 rounded-md sm:hidden">
        <svg viewBox="0 0 512 512" class="text-white"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
    </button>
</form>

<style>
    svg {
        @apply text-slate-950 h-6;
        user-select: none;
        fill: currentColor;
    }
</style>