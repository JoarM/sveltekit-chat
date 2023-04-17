<script lang="ts">
    import UserData from "./user-data.svelte";
</script>

<div class="flex h-14 gap-2 text-2xl justify-center py-1 px-4 rounded-full hover:bg-slate-800 duration-200">
    <UserData field="photoURL"></UserData>
    <p class="self-center">
        <UserData field="displayName"></UserData>
    </p>
</div>

<style lang="scss">
    
</style>