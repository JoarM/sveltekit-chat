<script lang="ts">
    import { userPerms, user } from "../../stores/user";
    export let uid: any;
</script>

{#if $userPerms?.status === "Admin" || $userPerms?.status === "Owner" || $user?.uid === uid}
    <slot/>
{:else}
    <slot name="not-admin"/>
{/if}