<script lang="ts">
    import IfUser from "../Users/if-user.svelte";
    import Messages from "../messages/messages.svelte";
    import ModalAction from "./modal-action.svelte";
    import { Timestamp, collection, deleteDoc, doc, getFirestore, limit, orderBy, query, } from 'firebase/firestore';
    import { user } from "../../stores/user";
    import Input from "../messages/input.svelte";
    import MessageRights from "../Users/message-rights.svelte";
    import IfAdmin from "../Users/if-admin.svelte";
    import CanMessage from "../Users/can-message.svelte";
    import ManagementButtons from "./management-buttons.svelte";
    import StatusIcon from "../Users/status-icon.svelte";
    import UserStatus from "../Users/user-status.svelte";
    
    const firestore = getFirestore();

    $: makeQuery = () => {
        const q = query(collection(firestore, "messages"), orderBy("createdAt"), limit(10));
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
                        <UserStatus uid={message.uid} db={firestore} let:data={perms}>
                            <div class="flex gap-3 items-center justify-between group/message hover:bg-slate-800 duration-200 px-6 py-3">
                                <div class="flex gap-3 texts">
                                    <img src="{message.photoUrl}" alt="Profile pic" class="h-12 rounded-full">
                                    <span class="flex flex-col justify-center">
                                        <span class="flex gap-2 items-end">
                                            <h3 class="font-bold">{message.displayName}</h3>
                                            <StatusIcon perms={perms}></StatusIcon>
                                            <p class="timestamp">{convertDate(message.createdAt)}</p>
                                        </span>
                                        <p class="">{message.message}</p>
                                    </span>
                                </div>
                                <div class="flex gap-1">
                                    <IfAdmin>                                                
                                        <ManagementButtons perms={perms} uid={message.uid}></ManagementButtons>
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
                        </UserStatus>
                        
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