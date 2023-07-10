<script>
  import * as R from "ramda";

  import { prettyNumeric, createRounder } from "../../tools/stringtools";
  import AccordionTree from "../tree_v2/AccordionTree.svelte";
  import DialogWrapper from "../dialog/DialogWrapper.svelte";
  import EstimationDetails from "./EstimationDetails.svelte";

  export let node;

  const round3 = createRounder(3);

  let getLeafTagOrComponent = function (estimationNode, parents) {
    function showLeaf(estimationNode) {
      return (
        R.intersection(R.keys(estimationNode), ["N", "estimate"]).length === 0
      );
    }

    const pVis =
      parents.length > 0 && getLeafTagOrComponent(parents[0], []) !== null;
    if (!pVis && showLeaf(estimationNode)) {
      return null;
    }

    if (estimationNode.hasOwnProperty("estimate")) {
      return {
        props: {
          html: () =>
            estimationNode.name +
            "=" +
            prettyNumeric(estimationNode.estimate, round3),
        },
      };
    }

    return {
      props: {
        html: () => estimationNode.name,
      },
    };
  };

  let getFooterTagOrComponent = function (estimationNode, parents) {
    function searchParents(parents, what, fromRoot) {
      if (fromRoot) {
        const rp = parents.slice(0);
        rp.reverse();
        return searchParents(rp, what, false);
      }

      if (parents.length > 0) {
        const p = parents[0];
        if (p.hasOwnProperty(what) && p[what]) {
          return p[what];
        }
      }

      if (parents.length < 1) {
        return null;
      }

      return searchParents(parents.slice(1), what);
    }

    function showFooter(estimationNode) {
      return R.intersection(R.keys(estimationNode), ["N"]).length > 0;
    }

    if (!showFooter(estimationNode)) {
      return null;
    }

    return {
      props: [
        {
          props: {
            this: DialogWrapper,
          },
          slotProps: {
            openTOC: {
              props: {
                this: "button",
                html: () => "Show More",
              },
            },
            title: "Details",
          },
        },

        {
          props: {
            this: EstimationDetails,
          },
          slotProps: {
            estimationNode,
            estimatorId:
              estimationNode.estimatorId ||
              searchParents(parents, "estimatorId"),
            jiff: estimationNode.jiff || searchParents(parents, "jiff", true),
          },
        },
      ],
    };
  };
</script>

<AccordionTree
  branch={node}
  getBranches={(estimationNode) =>
    (estimationNode && estimationNode.estimationNodes) || null}
  {getLeafTagOrComponent}
  {getFooterTagOrComponent}
/>
