<script>
  import * as R from "ramda";

  import Tree from "../tree_v2/Tree.svelte";
  import TagOrComponent from "../TagOrComponent.svelte";
  import { default as AccordionItem } from "../accordion/Item.svelte";
  import { default as AccordionHeader } from "../accordion/Header.svelte";
  import { default as AccordionBody } from "../accordion/Body.svelte";
  import { default as AccordionRoot } from "../accordion/Root.svelte";
  import createUniqTools from "../../tools/uniqtools";
  const uniqTools = createUniqTools();

  export let branch = {};
  export let getBranches = (branch) => branch.branches || null;
  export let getLeafTagOrComponent = () => null;
  export let getFooterTagOrComponent = () => null;
  export let isCollapsable = (branch) => hasBranches(branch);
  let idPrefix = uniqTools.asString();

  function isInAccordion(branch, parents) {
    if (parents.length < 1) return false;

    return isCollapsable(parents[0], parents.slice(1));
  }

  function hasBranches(branch) {
    const branches = getBranches(branch);
    return branches && branches.length > 0;
  }

  let getRowTagOrComponent = function (
    branch,
    parents,
    { isLeaf, isBranches, isBranch, x, y }
  ) {
    if (isLeaf) {
      if (hasBranches(branch) && isInAccordion(branch, parents)) {
        return {
          props: {
            this: AccordionHeader,
          },
          slotProps: {
            id: `${idPrefix}-${x}-${y}`,
          },
        };
      }

      return {
        props: {
          this: "div",
        },
      };
    }

    if (
      isBranches &&
      getLeafTagOrComponent(branch, parents) &&
      isInAccordion(branch, parents)
    ) {
      return {
        props: {
          this: AccordionBody,
        },
        slotProps: {
          id: `${idPrefix}-${x}-${y}`,
        },
      };
    }

    if (isBranch && isCollapsable(parents[0], parents.slice(1))) {
      return {
        props: {
          this: AccordionItem,
        },
        slotProps: {
          id: `${idPrefix}-${x}-${y}`,
        },
      };
    }

    return {
      props: { this: "div" },
    };
  };

  let getColTagOrComponent = function (branch, parents, { isBranches, x, y }) {
    if (isBranches && isCollapsable(branch, parents)) {
      return {
        props: {
          this: AccordionRoot,
        },
        slotProps: {
          id: `${idPrefix}-${x}-${y + 1}`,
        },
      };
    }

    return null;
  };

  let getIndentColTagOrComponent = function (branch, parents) {
    return null;
  };
</script>

<Tree
  tree={branch}
  {getRowTagOrComponent}
  {getColTagOrComponent}
  {getIndentColTagOrComponent}
  {getLeafTagOrComponent}
  {getFooterTagOrComponent}
  {getBranches}
/>
