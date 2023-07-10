<script>
  import * as R from "ramda";

  //import cson from "../../contrib/p4thcson/src/cson.js";
  import asRestRunner from "../../mixins/restrunner.js";
  import plotters from "../../stores/plotters.js";

  import Config from "../config/Config.svelte";
  import OnOffButtons from "../OnOffButtons.svelte";
  import DisabledToggler from "../DisabledToggler.svelte";
  import DialogWrapper from "../dialog/DialogWrapper.svelte";
  import PlotTree from "./PlotTree.svelte";
  //import Plot from "../estimation/Plot.svelte";

  export let featureIds = [];
  export let eventFilter = {};

  let plotterKeyLabelPairs = [];
  let selectedPlotterIds = [];
  let isVisible = false;

  let plotNode = null;
  let config = null;
  let jsonConfig0 = null;
  let hasError = null;
  let isPlotting = false;

  let dialogTitle = null;

  async function plot() {
    const plotterId = selectedPlotterIds[0];
    const eventsFilter = R.clone(eventFilter);
    eventsFilter.offset = null;
    eventsFilter.limit = null;
    isPlotting = true;
    jsonConfig0 = JSON.stringify(config);
    await asRestRunner({
      path: ["api", "plotter", plotterId],
      query: {},
      timeout: 5 * 60 * 1000,
    })
      .put({
        eventFilter: eventsFilter,
        featureIds,
        config: R.isEmpty(config) ? null : config,
      })
      .then((resp) => {
        plotNode = resp.data.plotNode;
        config = resp.data.config;
        if (jsonConfig0 === JSON.stringify({})) {
          jsonConfig0 = JSON.stringify(config);
        }
        hasError = resp.data.hasError;
        isVisible = true;
        isPlotting = false;
        return resp.data;
      });
  }

  async function onPlotterChange() {
    const canPlot = selectedPlotterIds.length === 1;
    if (!canPlot) {
      return;
    }
    config = {};
    jsonConfig0 = JSON.stringify(config);
    return await plot(selectedPlotterIds[0]);
  }

  function onDialogClose() {
    selectedPlotterIds = [];
  }

  $: isDirty = ((config) =>
    JSON.stringify(config) != jsonConfig0 || jsonConfig0 == {})(config);

  $: dialogTitle = (function (plotNode) {
    return (plotNode && plotNode["name"]) || "";
  })(plotNode);

  $: plotterKeyLabelPairs = R.map(({ id, name }) => ({ key: id, label: name }))(
    $plotters
  );

  $: plotButtonText = hasError && config !== null ? "Retry" : "Plot";
  $: plotButtonIsEnabled = !isPlotting && /*hasError || */ isDirty;
</script>

<DisabledToggler disabled={featureIds.length < 1}>
  <OnOffButtons
    keyLabelPairs={plotterKeyLabelPairs}
    bind:selectedKeys={selectedPlotterIds}
    onChange={onPlotterChange}
  />
</DisabledToggler>

<DialogWrapper
  title={dialogTitle}
  bind:open={isVisible}
  onClose={onDialogClose}
>
  {#if config}
    <Config bind:config />
  {/if}
  <button class="button" disabled={!plotButtonIsEnabled} on:click={plot}
    >{plotButtonText}
  </button>

  {#if plotNode}
    <PlotTree node={plotNode} />
  {/if}
</DialogWrapper>
