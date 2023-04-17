<script lang="ts">    
    import { Firestore, doc, onSnapshot } from "firebase/firestore";
    import { onMount, onDestroy } from "svelte";
    import type { UserPermisions } from "../../stores/user";

    export let uid: any;
    export let db: Firestore;
    let perms: UserPermisions | null = null;

    let unsub: any;

    interface $$Slots {
      default: { data: UserPermisions; },
      member: {},
    }

    onMount(() => {
        unsub = onSnapshot(doc(db, "perms", uid), (doc) => {
            perms = doc.data() as UserPermisions;
        });
    });
    
    onDestroy(() => {
        unsub && unsub();
    });
</script>

{#if perms}
    <slot data={perms} />
{:else}
    <slot name="member" />
{/if}