<script>
  import Config from "./Config.svelte";

  export let config = null;
</script>

{#if config}
  {#each Object.entries(config.value) as [key, aConfig]}
    {#if aConfig.spec.label}
      <h6>
        {aConfig.spec.label} ({key})
      </h6>
    {:else}
      {key}
    {/if}
    <Config
      bind:config={aConfig}
      onChange={() => {
        config = config;
      }}
    />
  {/each}
{/if}
