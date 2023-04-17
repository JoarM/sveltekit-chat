<script lang="ts">
    import IfUser from "../Users/if-user.svelte";
    import Messages from "../messages/messages.svelte";
    import ModalAction from "./modal-action.svelte";
    import { Timestamp, collection, deleteDoc, doc, getDoc, getFirestore, limit, orderBy, query, } from 'firebase/firestore';
    import { user } from "../../stores/user";
    import Input from "../messages/input.svelte";
    import MessageRights from "../Users/message-rights.svelte";
    import IfAdmin from "../Users/if-admin.svelte";
    import { banUser, makeAdmin, removeAdmin, unbanUser } from "../../util/firebase";
    import CanMessage from "../Users/can-message.svelte";
    import ManagementButtons from "./management-buttons.svelte";
    import StatusIcon from "../Users/status-icon.svelte";
    
    const firestore = getFirestore();

    $: makeQuery = () => {
        const q = query(collection(firestore, "messages"), orderBy("createdAt"), limit(25));
        return q;
    }

    function deleteMessage(id: any) : any {
        deleteDoc(doc(firestore, "messages", id));
    }

    function convertDate(date: Timestamp) : string {
        const convert = date.toDate();
        return convert.toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    }
</script>


<div class="container mx-auto">
    <div class="max-w-3xl mx-auto flex flex-col gap-4 fill relative">
        <IfUser>
            <div class="flex-grow overflow-y-auto">
                <Messages ref={makeQuery()} startWith={[]} firestore={firestore} let:data={messages}>
                    {#each messages as message}
                        <div class="flex gap-3 items-center justify-between group/message hover:bg-slate-800 duration-200 px-6 py-3">
                            <div class="flex gap-3 texts">
                                <img src="{message.photoUrl}" alt="Profile pic" class="h-12 rounded-full">
                                <span class="flex flex-col justify-center">
                                    <span class="flex gap-2 items-end">
                                        <h3 class="font-bold">{message.displayName}</h3>
                                        <StatusIcon uid={message.uid} db={firestore}></StatusIcon>
                                        <p class="timestamp">{convertDate(message.createdAt)}</p>
                                    </span>
                                    <p class="">{message.message}</p>
                                </span>
                            </div>
                            <div class="flex gap-1">
                                <IfAdmin>
                                    <span class="py-1 px-3 border border-slate-400 rounded-md text-xs opacity-0 
                                    group-hover/message:opacity-100 hover:bg-slate-500 duration-200 select-none group/mods relative" 
                                    >...
                                        <div class="scale-0 group-hover/mods:scale-100 duration-200 absolute flex bg-slate-900 p-1 rounded gap-1 right-9 -translate-y-1/2 top-1/2">
                                            <button on:click={banUser(message.uid)}
                                            class="h-6 w-6 p-1 text-red-600 rounded hover:bg-red-600 hover:text-white duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z"/></svg>
                                            </button>
                                            <button on:click={unbanUser(message.uid)}
                                            class="h-6 w-6 p-1 text-green-600 rounded hover:bg-green-600 hover:text-slate-900 duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z"/></svg>                                            </button>
                                            <button on:click={makeAdmin(message.uid)}
                                            class="h-6 w-6 p-1 text-green-600 rounded hover:bg-green-600 hover:text-slate-900 duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>
                                            </button>
                                            <button on:click={removeAdmin(message.uid)}
                                            class="h-6 w-6 p-1 text-red-600 rounded hover:bg-red-600 hover:text-white duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/></svg>
                                            </button>
                                        </div> 
                                    </span>
                                </IfAdmin>
                                <MessageRights uid={message.uid}>
                                    <button class="h-7 w-7 p-[6px] border border-red-500 rounded-md text-white opacity-0 
                                    group-hover/message:opacity-100 hover:bg-red-600 duration-200" 
                                    on:click={deleteMessage(message.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                                    </button> 
                                </MessageRights>   
                            </div>             
                        </div>
                    {/each}
                    <div slot="loading">
                        Loading messages...
                    </div>
                </Messages>
            </div>
            
            <CanMessage>
                <div class="w-full my-4">
                    <Input user={$user}></Input>
                </div>
                <p slot="banned" class="m-4 text-2xl font-bold opacity-75">You are banned, conntact admin to get unbanned.</p>
            </CanMessage>
            <div slot="signed-out">
                <p class="text-xl my-5">You're signed out... Login to start messaging.</p>
                <ModalAction name="signin" type="open">
                    <button class="btn blue-btn">Sign in Now</button>
                </ModalAction>
            </div>
        </IfUser>
    </div>
</div>




<style lang="scss">
    .timestamp { 
        font-size: 0.75rem;
    }

    .btn {
        @apply py-3 px-7 bg-slate-100 text-slate-950;
        font-weight: 700;
    }

    .blue-btn {
        @apply bg-blue-500 text-white;
    }

    .fill {
        height: calc(100vh - 120px);
    }

    .texts {
        word-break: break-all;
    }

    svg {
        user-select: none;
        fill: currentColor;
    }
</style>