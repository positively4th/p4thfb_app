<script>
  import * as R from "ramda";
  import TagOrComponent from "../TagOrComponent.svelte";

  export let tree = [];
  export let getLeafTagOrComponent = () => null;
  export let getFooterTagOrComponent = () => null;
  export let getBranches = () => null;
  export let getRowTagOrComponent = () => ({
    this: "div",
    class: "row",
  });
  export let getColTagOrComponent = () => ({
    this: "div",
    class: "col",
  });
  export let getIndentColTagOrComponent = () => ({
    this: "div",
    class: "col-1",
  });

  export let parents = [];
  export let x = 1;
  export let y = 1;

  let leafComponent = null;

  function nextParents() {
    if (!Array.isArray(tree)) {
      return [tree].concat(parents);
    }
    return [].concat(parents);
  }

  function leafArgs() {
    return [tree, [].concat(parents), { isLeaf: true, x, y }];
  }

  function footerArgs() {
    return [tree, [].concat(parents), { isFooter: true, x, y }];
  }

  function branchesArgs() {
    return [tree, [].concat(parents), { isBranches: true, x, y }];
  }

  function branchArgs() {
    return [null, [].concat(parents), { isBranch: true, x, y }];
  }
  $: leafComponent = getLeafTagOrComponent(tree, parents);
  $: footerComponent = getFooterTagOrComponent(tree, parents);
  $: branches = getBranches(tree, parents);
</script>

<slot />
{#if tree}
  {#if leafComponent}
    <TagOrComponent {...getRowTagOrComponent(...leafArgs())}>
      <TagOrComponent {...getColTagOrComponent(...leafArgs())}>
        <TagOrComponent {...leafComponent} />
      </TagOrComponent>
    </TagOrComponent>
  {/if}

  {#if branches}
    <TagOrComponent {...getRowTagOrComponent(...branchesArgs())}>
      {#if leafComponent}
        <TagOrComponent {...getIndentColTagOrComponent(...branchesArgs())} />
      {/if}
      <TagOrComponent {...getColTagOrComponent(...branchesArgs())}>
        {#each branches as b, dx}
          <TagOrComponent {...getRowTagOrComponent(...branchArgs())}>
            <TagOrComponent {...getColTagOrComponent(...branchArgs())}>
              <svelte:self
                tree={b}
                x={x + dx}
                y={y + 1}
                parents={nextParents()}
                {getRowTagOrComponent}
                {getColTagOrComponent}
                {getIndentColTagOrComponent}
                {getLeafTagOrComponent}
                {getFooterTagOrComponent}
                {getBranches}
              />
            </TagOrComponent>
          </TagOrComponent>
        {/each}

        {#if footerComponent}
          <TagOrComponent {...getRowTagOrComponent(...footerArgs())}>
            <TagOrComponent {...getColTagOrComponent(...footerArgs())}>
              <TagOrComponent {...footerComponent} />
            </TagOrComponent>
          </TagOrComponent>
        {/if}
      </TagOrComponent>
    </TagOrComponent>
  {:else if footerComponent}
    <TagOrComponent {...getRowTagOrComponent(...footerArgs())}>
      <TagOrComponent {...getColTagOrComponent(...footerArgs())}>
        <TagOrComponent {...footerComponent} />
      </TagOrComponent>
    </TagOrComponent>
  {/if}
{/if}
