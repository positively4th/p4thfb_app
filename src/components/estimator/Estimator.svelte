<script>
  import * as R from "ramda";

  import OnOffButtons from "../OnOffButtons.svelte";
  import Estimation from "../estimation/Estimation.svelte";
  import { slimDateTime } from "../../tools/stringtools";

  export let estimator = {};
  export let selectedKeys = [];
  export let event = null;
  let estimation = null;
  let disabledKeys = [];

  function format(estimator) {
    return `${estimator.estimatorId}`;
  }

  $: keyLabelPairs = R.pipe(
    R.sortBy((e) => e.jiff),
    R.reverse,
    R.map((e) => ({ key: e.jiff, label: slimDateTime(e.jiff) }))
  )(estimator.estimations || []);

  $: estimation =
    selectedKeys.length < 1
      ? null
      : R.find((e) => e.jiff === selectedKeys[0])(estimator.estimations);
</script>

<OnOffButtons
  {keyLabelPairs}
  exclusive={true}
  bind:selectedKeys
  {disabledKeys}
  showOnlySelected={true}
/>

<div class="list-group">
  {#if estimation}
    <div class="list-group-item">
      <Estimation {estimator} {estimation} {event} />
    </div>
  {/if}
</div>
