<script>
  import * as R from "ramda";

  import AccordionTree from "../tree_v2/AccordionTree.svelte";
  import PlotWrapper from "./PlotWrapper.svelte";

  export let node;

  let getLeafTagOrComponent = function (node, parents) {
    if (parents.length < 1) {
      return null;
    }

    return {
      props: {
        html: () => node.name,
      },
    };
  };

  let getFooterTagOrComponent = function (node, parents) {
    function showPlot(node) {
      return R.intersection(R.keys(node), ["plot", "dataSummary"]).length !== 0;
    }

    if (!showPlot(node)) {
      return null;
    }

    return {
      props: {
        this: PlotWrapper,
      },
      slotProps: {
        src: node.plot && `data:image/png;base64,${node.plot.data}`,
        summary: node.dataSummary,
        errors: node.errors,
      },
    };
  };
</script>

<AccordionTree
  branch={node}
  getBranches={(node) => (node && node.plotNodes) || null}
  {getLeafTagOrComponent}
  {getFooterTagOrComponent}
/>
