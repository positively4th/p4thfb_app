<script>
  import Value from "./Value.svelte";
  import Category from "./Category.svelte";
  import ConfigMap from "./ConfigMap.svelte";

  export let config = null;

  export let onChange = () => {};
</script>

{#if config}
  {#if config.spec && config.spec.specType === "ConfigMapSpec"}
    <ConfigMap bind:config {onChange} />
  {:else if config.spec && config.spec.specType === "ValueSpec"}
    <Value bind:config {onChange} />
  {:else if config.spec && config.spec.specType === "CategorySpec"}
    <Category bind:config {onChange} />
  {:else}
    <div>
      <p>
        Skipping unknown config type {(config.spec && config.spec.type) || "?"}.
      </p>
    </div>
  {/if}
{/if}
