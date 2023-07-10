<script>
  import * as R from "ramda";

  import OnOffButtons from "../OnOffButtons.svelte";

  export let config = null;
  export let onChange = (configs) => {};

  let keyLabelPairs = [];

  $: keyLabelPairs = R.map((meta) => ({
    key: meta.value,
    label: meta.label,
  }))(config.spec.valueMetas || []);
</script>

{#if config}
  <div class="container">
    <OnOffButtons
      selectedKeys={[config.value]}
      bind:selectedKey={config.value}
      {keyLabelPairs}
      exclusive={true}
      onChange={() => {
        config = config;
        onChange([config]);
      }}
    />
    {#if config.error}
      <p>{config.error}</p>
    {/if}
  </div>
{/if}
