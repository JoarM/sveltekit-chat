<script lang="ts">
    import type { UserPermisions } from "../../stores/user";
    import { doc, deleteDoc, Timestamp, Firestore } from "firebase/firestore";
    import type { Message } from "../../stores/collections";
    import StatusIcon from "../Users/status-icon.svelte";
    import IfAdmin from "../Users/if-admin.svelte";
    import ManagementButtons from "../UI/management-buttons.svelte";
    import MessageRights from "../Users/message-rights.svelte";


    export let message: Message;
    export let perms: UserPermisions;
    export let firestore: Firestore;

    function deleteMessage(id: any) : any {
        deleteDoc(doc(firestore, "messages", id));
    }

    function convertDate(date: Timestamp) : string {
        const convert = date.toDate();
        return convert.toLocaleDateString("en", { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
    }
</script>

<div class="flex gap-3 items-center justify-between group/message hover:bg-slate-800 duration-200 px-6 py-3 overflow-hidden">
    <div class="flex gap-3">
        <img src="{message.photoUrl}" alt="Profile pic" class="h-12 rounded-full">
        <span class="flex flex-col justify-center">
            <span class="flex items-end flex-wrap">
                <h3 class="font-bold- whitespace-nowrap">{message.displayName}</h3>
                <StatusIcon perms={perms}></StatusIcon>
                <p class="timestamp">{convertDate(message.createdAt)}</p>
            </span>
            <p class="texts">{message.message}</p>
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

<style lang="scss">
    .texts {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    svg {
        user-select: none;
        fill: currentColor;
    }

    .timestamp { 
        font-size: 0.75rem;
    }
</style>