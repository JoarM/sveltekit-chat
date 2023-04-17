<script lang="ts">
    import { userPerms } from "../../stores/user";
</script>

{#if !$userPerms?.banned}
    <slot/>
{:else}
    <slot name="banned"/>
{/if}