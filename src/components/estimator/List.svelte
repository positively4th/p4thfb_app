<script>
  import * as R from "ramda";

  import asRestRunner from "../../mixins/restrunner";
  import OnOffButtons from "../OnOffButtons.svelte";

  let estimators = [];
  let estimatorKeyLabelPairs = [];
  export let selectedEstimatorIds = [];

  $: pEstimators = asRestRunner({
    path: ["api", "estimators"],
    query: {},
  })
    .get()
    .then((resp) => {
      estimatorKeyLabelPairs = R.map((spec) => ({
        key: spec.estimatorId,
        label: spec.estimatorName,
      }))(resp.data);
      estimators = resp.data;
      return resp.data;
    });
</script>

<OnOffButtons
  keyLabelPairs={estimatorKeyLabelPairs}
  bind:selectedKeys={selectedEstimatorIds}
  exclusive={true}
  showOnlySelected={true}
/>
