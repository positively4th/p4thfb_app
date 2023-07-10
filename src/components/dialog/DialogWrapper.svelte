<script>
  import * as R from "ramda";
  import TagOrComponent from "../TagOrComponent.svelte";

  export let openTOC = null;
  export let title = "";
  export let open = false;
  export let onClose = () => {};

  let dialog;

  function onClickClose() {
    dialog.close();
    open = false;
    onClose();
  }

  function doToggle() {
    open = !open;
  }

  $: {
    if (dialog && open && !dialog.open) {
      dialog.showModal();
    } else if (dialog && !open && dialog.open) {
      dialog.close();
    }
  }
</script>

{#if openTOC}
  <span on:click={doToggle}>
    <TagOrComponent {...openTOC} />
  </span>
{/if}

<dialog bind:this={dialog} on:close>
  <div class="card">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div>
          {title}
        </div>
        <div>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            on:click={onClickClose}
          />
        </div>
      </div>
    </div>

    <slot />
  </div>
</dialog>
