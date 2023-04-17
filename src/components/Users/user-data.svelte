<script lang="ts">
    import { user, userPerms } from "../../stores/user";
    export let field: | "email" | "photoURL" | "displayName" | "uid" | "status";

    let src = $user?.photoURL ?? "/static/avatar.svg";
</script>

{#if field === 'email' }
    { $user?.email }
{/if}
{#if field === 'photoURL' }
    <img {src} alt="avatar" referrerpolicy="no-referrer" style="max-width: 100%; border-radius: 9999px;" on:error={() => src = '/img/ui/avatar.svg'}>
{/if}
{#if field === 'displayName' }
    { $user?.displayName }
{/if}
{#if field === 'uid' }
    { $user?.uid }
{/if}
{#if field === "status"}
    { $userPerms?.status ?? "Member"}
{/if}