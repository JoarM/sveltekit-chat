<script lang="ts">
    import { onMount } from "svelte";
    import { emojis, skinColor } from "../../stores/emojis";

    export let insertChar: Function;
    let input: HTMLInputElement;
    let acc: HTMLDetailsElement[] = Array(4);
    let inputValue = "";
    const skinColors = ["👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"];
    let colorMenuOpen = false;
    let acctiveAcc = 0;

    
</script>

<div class="settings">
    <input type="text" class="emoji-input" bind:this={input} bind:value={inputValue} placeholder="Find the perfect emoji">
    <ul class="flex flex-col rounded cursor-pointer absolute right-2 overflow-hidden border border-transparent h-9" class:colorMenuOpen={colorMenuOpen}>
        <li>
            <button class="skin-selector" on:click={() => colorMenuOpen = !colorMenuOpen}>{ skinColors[$skinColor] }</button>
        </li>
        {#each skinColors.filter((e) => e != skinColors[$skinColor]) as hand}
            <li>
                <button class="skin-selector" on:click={() => {
                    skinColor.set(skinColors.indexOf(hand));
                    colorMenuOpen = !colorMenuOpen;
                }}>{ hand }</button>
            </li>
        {/each}
    </ul>
</div>
<div class="flex overflow-hidden h-full">
    <div class="flex flex-col justify-end bg-slate-800 gap-1 p-1">
        <button class="selectorButtons" on:click={() => acc[0].scrollIntoView()} class:acctive={acctiveAcc === 0}>
            <svg aria-hidden="true" role="img" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM16.293 6.293L17.707 7.706L16.414 9L17.707 10.293L16.293 11.706L13.586 9L16.293 6.293ZM6.293 7.707L7.707 6.294L10.414 9L7.707 11.707L6.293 10.294L7.586 9L6.293 7.707ZM12 19C9.609 19 7.412 17.868 6 16.043L7.559 14.486C8.555 15.92 10.196 16.831 12 16.831C13.809 16.831 15.447 15.92 16.443 14.481L18 16.04C16.59 17.867 14.396 19 12 19Z" fill="currentColor"></path></svg>
        </button>
        <button class="selectorButtons" on:click={() => acc[1].scrollIntoView()} class:acctive={acctiveAcc === 1}>
            <svg viewBox="0 0 512 512" class="p-1"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" fill="currentColor"/></svg>
        </button>
        <button class="selectorButtons" on:click={() => acc[2].scrollIntoView()} class:acctive={acctiveAcc === 2}>
            <svg aria-hidden="true" role="img" viewBox="0 0 24 24"><path d="M6.814 8.982C4.539 11.674 4.656 15.591 6.931 18.153L4.034 21.579L5.561 22.87L8.463 19.437C9.569 20.127 10.846 20.513 12.161 20.513C14.231 20.513 16.183 19.607 17.516 18.027C20.069 15.01 20.771 6.945 21 3C17.765 3.876 9.032 6.356 6.814 8.982V8.982ZM8.935 17.331C6.826 15.548 6.56 12.382 8.342 10.272C9.592 8.793 14.904 6.845 18.764 5.698L8.935 17.331V17.331Z" fill="currentColor"></path></svg>
        </button>
        <button class="selectorButtons" on:click={() => acc[3].scrollIntoView()} class:acctive={acctiveAcc === 3}>
            <svg aria-hidden="true" role="img" viewBox="0 0 24 24"><path d="M11 18H13V22H11V18Z" fill="currentColor"></path><path d="M12 2C8.822 2 7 4.187 7 8V16C7 16.552 7.447 17 8 17H16C16.553 17 17 16.552 17 16V8C17 4.187 15.178 2 12 2ZM11 14.001H10V5.001H11V14.001ZM14 14.001H13V5.001H14V14.001Z" fill="currentColor"></path></svg>
        </button>
    </div>
    <div class="category-wrapper">
        {#each $emojis.sort(function(a, b){return a.id - b.id}) as category}
            <details open={true} class="mx-4 scroll-m-2" bind:this={acc[category.id]}>
                <summary class="capitalize text-sm cursor-pointer md:opacity-75 md:hover:opacity-100 transition-opacity duration-100 select-none">{category.name}</summary>
                <div  class="inner-emojis">
                    {#each category.emojis as emoji}
                        {#if emoji.slug.includes(inputValue)}
                            {#if emoji.variants != undefined}
                                {#if $skinColor === 0}
                                <button class="emojiButton" on:click={insertChar(emoji.character + " ")} on:mouseenter={() => input.placeholder = ":" + emoji.slug + ":"}>
                                    {emoji.character}
                                </button>
                                {:else if emoji.variants.length > $skinColor - 1}
                                <button class="emojiButton" on:click={insertChar(emoji.character + " ")} on:mouseenter={() => input.placeholder = ":" + emoji.slug + ":"}>
                                    {emoji.variants[$skinColor - 1].character}
                                </button>
                                {/if}
                                {:else}
                                <button class="emojiButton" on:click={insertChar(emoji.character + " ")} on:mouseenter={() => input.placeholder = ":" + emoji.slug + ":"}>
                                    {emoji.character}
                                </button>
                            {/if}
                        {/if}
                    {/each}
                </div>    
            </details>
        {/each}
    </div>
</div>

<style lang="scss">
    .inner-emojis {
        @apply flex flex-wrap w-full;
    }

    .emojiButton {
        @apply rounded text-2xl text-center hover:bg-slate-500 aspect-square w-9 overflow-hidden;
    }

    .selectorButtons {
        @apply w-9 h-9 p-1 flex items-center justify-center rounded hover:bg-slate-700;
    }

    .acctive {
        @apply bg-slate-700;
    }

    .category-wrapper {
        @apply flex flex-col overflow-y-auto h-full py-1 gap-2;
    }

    .settings {
        @apply p-2 bg-slate-700 w-full shadow-md flex gap-2 relative;
    }

    .emoji-input {
        @apply rounded-md flex-grow outline-none border-none bg-slate-800 px-2 py-1 mr-10;
    }

    .skin-selector{
        @apply text-xl aspect-square w-8 p-1 flex items-center justify-center;
    }

    .colorMenuOpen {
        @apply bg-slate-800 border-slate-900;
        height: calc(2rem * 6);
        transition: height 300ms ease;
        z-index: 9999;

        .skin-selector{
            @apply  md:hover:bg-slate-700;
        }   
    }
</style>