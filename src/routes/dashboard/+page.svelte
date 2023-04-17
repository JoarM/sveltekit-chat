<script lang="ts">
    import ModalAction from "../../components/UI/modal-action.svelte";
    import Navbar from "../../components/UI/navbar.svelte";
    import IfUser from "../../components/Users/if-user.svelte";
    import Signout from "../../components/Users/signout.svelte";
    import UserData from "../../components/Users/user-data.svelte";
</script>

<Navbar></Navbar>
<main class="container mx-auto p-8">
    <div class="max-w-3xl mx-auto">
        <IfUser>
            <p class="text-xl my-5">User id:<span class="text-white font-bold"><UserData field="uid"></UserData></span></p>
            <p class="text-xl my-5">Status: <span class="text-white font-bold"><UserData field="status"></UserData></span></p>
            <Signout>
                <button class="btn">SIGN OUT</button>
            </Signout>
            <div slot="signed-out">
                <p class="text-xl my-5">You're signed out... This page is useless to you.</p>
                <ModalAction name="signin" type="open">
                    <button class="btn blue-btn">Sign in Now</button>
                </ModalAction>
            </div>
        </IfUser>        
    </div>
</main>

<style lang="scss">
    .btn {
        @apply py-3 px-7 bg-slate-100 text-slate-950;
        font-weight: 700;
    }

    .blue-btn {
        @apply bg-blue-500 text-white;
    }
</style>
