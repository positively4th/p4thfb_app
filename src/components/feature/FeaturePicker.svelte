<script>
  import * as R from "ramda";
  import asRestRunner from "../../mixins/restrunner.js";

  import { default as FeatureList } from "./List.svelte";
  import Feature from "./Feature.svelte";
  import FeaturePlotter from "../plotter/FeaturePlotter.svelte";

  import cson from "../../contrib/p4thcson/src/cson.js";
  import tr from "date-fns/locale/tr";

  export let event = null;
  export let eventFilter;
  export let metas = [];
  export let showFilterFeatures = true;
  let selectedFeatureIds = [];

  let featurePromises = [];

  function createFeaturePromise(id, event) {
    return asRestRunner({
      path: ["api", "feature", id],
      query: {},
    })
      .post(JSON.parse(cson.asJSON(event)))
      .then((resp) => {
        return resp.data;
      });
  }

  $: featurePromises = (function (ids, event) {
    if (!event || ids.length < 1) {
      return [];
    }

    return R.map((featureId) => {
      const promiseId = JSON.stringify([featureId, event.__id]);
      return {
        promiseId,
        featureId,
        featurePromise: createFeaturePromise(featureId, event),
      };
    })(ids);
  })(selectedFeatureIds, event);

  async function waitForAllMetas(featurePromises) {
    if (featurePromises.length < 1) {
      return [];
    }
    const features = await Promise.all(
      R.map(({ featurePromise }) => featurePromise)(featurePromises)
    );

    return R.unnest(R.map((feature) => feature.meta || [])(features));
  }

  $: (async (featurePromises) =>
    (metas = await waitForAllMetas(featurePromises)))(featurePromises);
</script>

<div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="showFeatureFilterCheck"
      bind:checked={showFilterFeatures}
    />
    <label class="form-check-label" for="showFeatureFilterCheck">Filter</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="showFeaturePlotCheck"
      data-bs-toggle="collapse"
      data-bs-target="#featurePlotCollapse"
      aria-expanded="false"
      aria-controls="featurePlotCollapse"
    />
    <label class="form-check-label" for="showFeaturePlotCheck">Plot</label>
  </div>
</div>

<div class="collapse" id="featurePlotCollapse">
  <FeaturePlotter featureIds={selectedFeatureIds} {eventFilter} />
</div>

<div>
  {#each featurePromises as { featurePromise, promiseId, featureId } (promiseId)}
    <div>
      {#await featurePromise}
        <p>Loading ...</p>
      {:then feature}
        <Feature feature={JSON.parse(JSON.stringify(feature))} />
      {/await}
    </div>
  {/each}

  <FeatureList bind:selectedFeatureIds bind:typeFilter={showFilterFeatures} />
</div>
