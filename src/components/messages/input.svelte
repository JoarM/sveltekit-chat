<script lang="ts">
    import type { User } from "firebase/auth";
    import type { Message } from "../../stores/collections";
    import { toast } from "../../stores/toast";
    let message: HTMLSpanElement;
    const mobile = isMobile();
    let empty = true;

    export let user: User | null;
    export let scroll: Function;

    async function sendMessage() {
        if (!user) return;
        if (!user.displayName) return;
        if (!user.photoURL) return;
        if (message.innerText.trim() === "") return;
        if (message.innerText.length > 500) {
            toast.set({
                message: "Message cant be longer then 200 characters!",
                type: "error",
            });
            return;
        }
        const { collection, addDoc, getFirestore, Timestamp } = await import("firebase/firestore");
        const firestore = getFirestore();
        const messageRef = collection(firestore, "messages");
        const data: Message = {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            createdAt: Timestamp.now(),
            message: message.innerText,
        }

        addDoc(messageRef, data);
        message.innerText = "";
        scroll();
    }

    function keyboardTyping(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey && !mobile) sendMessage();
    }

    function isMobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        } 
        return false;
    }
</script>

<form class="flex items-center gap-1 mx-3"  on:submit={sendMessage}>
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <span bind:this={message} contenteditable="true" role="textbox" spellcheck="true" on:keypress={keyboardTyping}>
        
    </span>
    <p class="label" class:seetrough={!empty}>Message @chatroom</p>
    <button>
        <svg viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
    </button>
</form>

<style lang="scss">
    svg {
        @apply text-slate-200 h-4;
        user-select: none;
        fill: currentColor;
    }

    span {
        @apply p-2 flex-grow outline-none border-none text-slate-200 bg-slate-800 md:rounded-md rounded-3xl relative;
        width: 100%;
        overflow-wrap: break-word;
        position: relative; 
        outline: none;
        white-space: pre-wrap;
        overflow-wrap: break-word;
    }

    button {
        @apply bg-sky-500 md:hidden md:rounded-md rounded-3xl p-3;
    }

    .label {
        @apply absolute left-5 select-none pointer-events-none opacity-50 duration-100;
    }

    form:focus-within .label,
    span:not(:empty) + .label {
        @apply opacity-0;
    }

    span:empty ~ button {
        @apply hidden;
    }
</style>