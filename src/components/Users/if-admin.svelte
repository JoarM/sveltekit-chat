<script>
    import { userPerms } from "../../stores/user";
</script>

{#if $userPerms?.status === "Admin" || $userPerms?.status === "Owner"}
    <slot/>
{:else}
    <slot name="not-admin"/>
{/if}