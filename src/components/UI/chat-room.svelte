<script lang="ts">
    import IfUser from "../Users/if-user.svelte";
    import Messages from "../messages/messages.svelte";
    import ModalAction from "./modal-action.svelte";
    import { collection, getFirestore, limitToLast, orderBy, query, } from 'firebase/firestore';
    import { user } from "../../stores/user";
    import Input from "../messages/input.svelte";
    import CanMessage from "../Users/can-message.svelte";
    import UserStatus from "../Users/user-status.svelte";
    import Message from "../messages/message.svelte";
    import type { UserPermisions } from "../../stores/user";
    
    const firestore = getFirestore();
    const defaultPerms: UserPermisions = {
        status: "Member",
        banned: false,
    }

    $: makeQuery = () => {
        const q = query(collection(firestore, "messages"), orderBy("createdAt"), limitToLast(10));
        return q;
    }
</script>


<div class="container mx-auto">
    <div class="max-w-3xl mx-auto flex flex-col gap-4 fill relative">
        <IfUser>
            <div class="flex-grow overflow-y-auto">
                <Messages ref={makeQuery()} startWith={[]} firestore={firestore} let:data={messages}>
                    {#each messages as message}
                        <UserStatus uid={message.uid} db={firestore} let:data={perms}>
                            <Message firestore={firestore} message={message} perms={perms}></Message>
                            <Message firestore={firestore} message={message} perms={defaultPerms} slot="member"></Message>
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
</style>