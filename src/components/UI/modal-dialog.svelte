<script lang="ts">
    import { browser } from "$app/environment";
    import { modal } from "../../stores/modal";
    import { handleBinds } from "../../util/key-binds";
    export let name = "default";
    export let esc = false;

    function closeModal() {
        modal.set(null);
    }

    if (browser) {
        window.addEventListener('keydown', handleBinds);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={closeModal} class:show={$modal === name} class="backdrop">
    <div class="inner" class:inner-show={$modal === name}>
        {#if esc}
            <kbd class="esc" on:click={closeModal}>esc</kbd>
        {/if}
        <slot />
    </div>
</div>

<style lang="scss">
    .backdrop {
        @apply inset-0 fixed bg-opacity-90 bg-black z-[99] invisible opacity-0 flex flex-col items-center pt-20;
    }

    .show {
        @apply visible opacity-100;
    }

    .inner {
        @apply w-3/4 md:w-auto scale-75 opacity-0 bg-gray-600 px-8 py-12 shadow-2xl rounded-md mx-5 max-w-full h-auto transition-all overflow-y-auto;
    }

    .inner-show {
        @apply scale-100 opacity-100 transition-all duration-200;
    }

    .esc {
        @apply cursor-pointer absolute top-6 right-6 text-xs text-gray-300 border border-solid drop-shadow-md rounded-md border-orange-500 bg-opacity-50 p-1.5 hover:bg-orange-500 hover:text-white transition-all;
    }
</style>