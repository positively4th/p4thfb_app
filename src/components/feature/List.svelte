<script>
  import * as R from "ramda";

  import asRestRunner from "../../mixins/restrunner";
  import OnOffButtons from "../OnOffButtons.svelte";

  export let selectedFeatureIds = [];
  export let typeFilter = false;

  let features = [];
  let featureKeyLabelPairs = [];

  $: pFeatures = asRestRunner({
    path: ["api", "features"],
    query: {},
  })
    .get()
    .then((resp) => {
      featureKeyLabelPairs = R.map((spec) => ({
        key: spec.featureId,
        label: spec.featureName,
      }))(resp.data);
      features = resp.data;
      return resp.data;
    });
</script>

<OnOffButtons
  {typeFilter}
  filterPlaceholder={"Type to filter features..."}
  keyLabelPairs={featureKeyLabelPairs}
  bind:selectedKeys={selectedFeatureIds}
  exclusive={false}
  showOnlySelected={false}
/>
