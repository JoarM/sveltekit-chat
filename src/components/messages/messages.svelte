<script lang="ts">
    import type {
      CollectionReference,
      Firestore,
      Query,
    } from 'firebase/firestore';
    import { collectionStore, type Message } from '../../stores/collections';
    
    interface $$Slots {
      default: { data: Message[]; ref: CollectionReference | Query | null; },
      loading: {},
    }
    export let ref: string | CollectionReference | Query;
    export let firestore: Firestore;
    export let startWith: any = undefined;
    let store = collectionStore<Message>(firestore, ref, startWith);
  </script>
  
  {#if $store !== undefined}
    <slot data={$store} ref={store.ref} />
  {:else}
    <slot name="loading" />
  {/if}