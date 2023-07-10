<script>
  import { onMount } from "svelte";

  import * as R from "ramda";

  import asRestRunner from "../../mixins/restrunner.js";
  import cson from "../../contrib/p4thcson/src/cson.js";

  export let estimatorId;
  export let jiff;
  export let estimationNodeId;
  export let meta;
  let plotName;
  let args = {};
  let argsMap = {};

  $: plotName = meta.plotName;
  $: args = meta.args || [];
  $: argsMap = meta.argsMap || {};

  let image = "";

  async function promiseImage() {
    function findPlot(node) {
      function findPlotHelper(node) {
        if (!node) {
          return null;
        }

        if (
          node.hasOwnProperty("id") &&
          node.id === estimationNodeId &&
          node.hasOwnProperty("plot")
        ) {
          return node;
        }

        return findPlotHelper(
          R.find(findPlotHelper)(node.estimationNodes || [])
        );
      }

      const res = findPlotHelper(node);
      return res.plot || "";
    }

    image = await asRestRunner({
      path: [
        "api",
        "estimator",
        "plot",
        estimatorId,
        jiff,
        estimationNodeId,
        plotName,
      ],
    })
      .post(
        JSON.parse(
          cson.asJSON({
            args,
            argsMap,
          })
        )
      )
      .then((resp) => {
        const image = findPlot(resp.data.result || {});
        return image;
      });

    return image;
  }
</script>

{#await promiseImage()}
  <p>Loading</p>
{:then image}
  <figure>
    <img src="data:image/png;base64,{image}" alt="Plot" />
  </figure>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
