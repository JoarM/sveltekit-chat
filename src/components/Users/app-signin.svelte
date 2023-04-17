<script>
    import ModalDialog from "../UI/modal-dialog.svelte";
    import GoogleSignin from "./google-signin.svelte";
</script>

<ModalDialog name="signin" esc={true}>
    <h1>Login</h1>
    <GoogleSignin></GoogleSignin>
</ModalDialog>