<script>
  import * as R from "ramda";

  import asRestRunner from "../../mixins/restrunner.js";
  import cson from "../../contrib/p4thcson/src/cson.js";
  import EstiimationTree from "./EstimationTree.svelte";
  import PredictionTree from "./PredictionTree.svelte";

  export let estimator = {};
  export let estimation = {};
  export let event = null;

  let predictionNode = null;

  $: (async (event, estimation) => {
    if (!event || !estimation) {
      predictions = null;
      return;
    }
    predictionNode = await asRestRunner({
      path: [
        "api",
        "estimator",
        "predict",
        estimator.estimatorId,
        estimation.jiff,
      ],
      query: {},
    })
      .post(JSON.parse(cson.asJSON({ events: [event] })))
      .then((resp) => {
        const p = (resp && resp.data && resp.data.result) || null;
        return p;
      });
  })(event, estimation);
</script>

{#if estimation.state != "ready"}
  <div class="card">
    <div class="card-content">
      <div class="card-header">Predictions</div>
      <div>State: {estimation.state}</div>
      {#if estimation.state == "failed"}
        <div>Error: {estimation.error}</div>
      {/if}
    </div>
  </div>
{:else}
  {#if predictionNode}
    <div class="card">
      <div class="card-header">
        <div class="card-title">Predictions</div>
      </div>
      <PredictionTree node={predictionNode} />
    </div>
  {/if}

  {#if estimation}
    <div class="card">
      <div class="card-content">
        <div class="card-header">Estimates</div>
        <EstiimationTree node={R.mergeLeft(estimator, estimation)} />
      </div>
    </div>
  {/if}
{/if}
