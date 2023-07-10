<script>
  import * as R from "ramda";

  export let context = {};

  let formatters = {
    identity: (val) => val,
    number: (val, dec) => (0.0 + val).toFixed(dec),
    text: (val, maxLength) =>
      ("" + val).substring(0, maxLength !== null ? maxLength : 100000),
  };

  let specs = {
    feature: [
      { val: "Feature", weight: 0.0 },
      { key: "featureName", formatter: (val) => formatters.text(val, null) },
      { key: "featureId", formatter: (val) => formatters.text(val, null) },
    ],
    event: [
      { val: "Event", weight: 0.0 },
      { key: "event__id", formatter: (val) => formatters.text(val, null) },
      { key: "eventId", formatter: (val) => formatters.text(val, null) },
    ],
    matrix: [
      { val: "Matrix", weight: 0.0 },
      { key: "row", formatter: (val) => formatters.number(val, 0) },
      { key: "col", formatter: (val) => formatters.number(val, 0) },
    ],
  };

  let specOrder = ["feature", "matrix", "event"];

  let effectiveSpecGroups = [];

  function contextMatch(spec, context) {
    const { maxWeight, weight } = R.reduce((res, key) => {
      const weight = spec[key].weight || 0.0;
      res.maxWeight += weight;
      res.weight += context && context.hasOwnProperty(key) ? weight : 0;
      return res;
    })({ maxWeight: 0, weight: 0 })(R.keys(spec));
    return maxWeight != 0.0 ? weight / maxWeight : 1.0;
  }

  function specFilterer(spec, context) {
    return contextMatch(spec, context) > 0.99;
  }

  function prettyKey(key, val, spec, context) {
    return key;
  }

  function prettyVal(key, val, spec, context) {
    const formatter = spec.formatter || formatters.identity;
    return formatter(val);
  }

  function columns(spec, context) {
    const key = spec.key;
    const val = spec.hasOwnProperty("val") ? spec["val"] : context[key];
    const cols = R.filter((col) => col.html || col.html == 0)([
      { html: prettyKey(key, val, spec, context) },
      { html: prettyVal(key, val, spec, context) },
    ]);
    if (cols.length == 1) {
      cols[0].classes = ["header"];
    } else {
      cols[0].html += ": ";
    }
    return cols;
  }

  $: effectiveSpecGroups = R.pipe(
    R.map((specName) => specs[specName]),
    R.filter((spec) => specFilterer(spec, context))
  )(specOrder);
</script>

{#if typeof context === "string"}
  {context}
{:else}
  {#each effectiveSpecGroups as specs}
    {#each specs as spec}
      <div class="d-flex flex-row">
        {#each columns(spec, context) as col}
          <div class={(col.classes || []).join(" ")}>{col.html}</div>
        {/each}
      </div>
    {/each}
  {/each}
{/if}

<style>
  .header {
    font-weight: bold;
  }
</style>
