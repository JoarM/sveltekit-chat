<script lang="ts">
    import { modal } from "../../stores/modal";
    export let type: "open" | "close" = "open";
    export let name = "default";
    function modalAction() {
        if (type === "open") {
            modal.set(name);
        } else {
            modal.set(null);
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={modalAction}>
    <slot />
</span>