<script>
  import * as R from "ramda";

  export let feature = {};
  let metas = [];
  let textMetas = [];
  let showMetas = false;

  function format(feature) {
    return !isNaN(parseFloat(feature.value))
      ? `${feature.name} = ${Math.round(feature.value * 100) / 100}`
      : `${feature.name} = ${feature.value}`;
  }

  function formatKeyValMeta(meta) {
    return `${meta.key}: ${meta.val}`;
  }

  $: metas = R.isEmpty(feature) ? [] : feature.meta || [];
  $: textMetas = R.filter((meta) => R.includes(meta.type)(["keyval"]))(metas);
</script>

<span
  class="badge bg-primary"
  on:click={() => {
    showMetas = !showMetas;
  }}
  style="position: relative; left: 0px; top: 0px;"
>
  {format(feature)}
  {#if textMetas && textMetas.length > 0}
    <span class="fa fa-chevron-right bg-transparent" />
    {#if showMetas}
      <div class="info">
        <div class="card">
          <ul class="list-group">
            {#each textMetas as meta}
              <li class="list-group-item m-1">{formatKeyValMeta(meta)}</li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}
  {/if}
</span>

<style>
  .info {
    position: fixed;
    display: inline-block;
    z-index: 1;
  }
</style>
