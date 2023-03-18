<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import Portal from "svelte-portal";
  export let label = "";
  export let title = "";
  export let value: boolean;

  const dispatch = createEventDispatcher();

  function handleConfirm() {
    dispatch("confirm", true);
    value = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (value && e.key === "Escape") {
      value = false;
    }
  }

  $: value ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
</script>

<svelte:window on:keydown={handleKeydown} />
{#if value}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <Portal target="body">
    <div
      transition:scale={{ duration: 300, start: 0.8 }}
      on:click|self={() => (value = false)}
      class="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-center"
    >
      <div class="rounded-lg bg-white p-4 max-w-xs w-full">
        <div>
          <p class="text-xl font-medium text-neutral-400">
            {title}
          </p>
        </div>
        <div class="text-sm mt-4 text-neutral-300">
          <slot />
        </div>
        <div class="mt-4 flex justify-between text-sm items-center gap-2">
          <button class="text-white py-2 px-6 bg-neutral-300 uppercase rounded-lg" on:click={() => (value = false)}>No, cancel</button>
          <button class="text-white py-2 px-6 bg-primary-soft-red uppercase rounded-lg" on:click={handleConfirm}>{label}</button>
        </div>
      </div>
    </div>
  </Portal>
{/if}
