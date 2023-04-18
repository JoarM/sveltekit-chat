<script lang="ts">
    import AppSignin from "../Users/app-signin.svelte";
    import IfUser from "../Users/if-user.svelte";
    import UserAvatar from "../Users/user-avatar.svelte";
    import ModalAction from "./modal-action.svelte";
</script>

<nav class="flex justify-between container p-6 md:p-8 mx-auto">
    <a href="/" class="flex justify-center items-center text-center w-14 h-14">
        <img src="/logo.svg" alt="logo">
    </a>
    <ul class="flex justify-center items-center">
        <li class="ml-2 mr-6 relative">
            <IfUser>
                <a href="/dashboard">
                    <UserAvatar></UserAvatar>
                </a>
                <ModalAction slot="signed-out" name="signin" type="open">
                    <button>login</button>
                </ModalAction>
            </IfUser>
        </li>
    </ul>
</nav>

<AppSignin></AppSignin>