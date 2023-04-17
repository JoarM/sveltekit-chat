<script lang="ts">
    import type { UserPermisions } from "../../stores/user";
    import { userPerms } from "../../stores/user";
    import { banUser, unbanUser, makeAdmin, removeAdmin } from "../../util/firebase";

    export let perms : UserPermisions;
    export let uid : any;
</script>

{#if perms.status != "Owner"}
    {#if $userPerms?.status != perms.status}
        <span class="py-1 px-3 border border-slate-400 rounded-md text-xs opacity-0 
        group-hover/message:opacity-100 hover:bg-slate-500 duration-200 select-none group/mods relative" 
        >...
            <div class="scale-0 group-hover/mods:scale-100 duration-200 absolute flex bg-slate-900 p-1 rounded gap-1 right-9 -translate-y-1/2 top-1/2">
                {#if !perms.banned}
                    <button on:click={banUser(uid)}
                    class="h-6 w-6 p-1 text-red-600 rounded hover:bg-red-600 hover:text-white duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z"/></svg>
                    </button>
                {:else}
                    <button on:click={unbanUser(uid)}
                    class="h-6 w-6 p-1 text-green-600 rounded hover:bg-green-600 hover:text-slate-900 duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z"/></svg>                                            
                    </button>
                {/if}
                {#if $userPerms?.status === "Owner"}
                    {#if perms.status === "Admin"}
                        <button on:click={removeAdmin(uid)}
                        class="h-6 w-6 p-1 text-red-600 rounded hover:bg-red-600 hover:text-white duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/></svg>
                        </button>
                    {:else}
                        <button on:click={makeAdmin(uid)}
                        class="h-6 w-6 p-1 text-green-600 rounded hover:bg-green-600 hover:text-slate-900 duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>
                        </button>
                    {/if}
                {/if}
            </div> 
        </span>
    {/if}
{/if}







<style lang="scss">
    svg {
        user-select: none;
        fill: currentColor;
    }
</style>