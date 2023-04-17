<script lang="ts">
    import { firebaseSignOut } from "../../util/firebase";
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={firebaseSignOut}>
    <slot/>
</span>