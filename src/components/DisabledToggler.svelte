<script>
  export let disabled = false;
</script>

<div class:disabled>
  <slot />
</div>

<style>
  .disabled {
    filter: blur(2px);
    pointer-events: none;
  }
</style>
