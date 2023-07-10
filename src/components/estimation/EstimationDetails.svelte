<script>
  import * as R from "ramda";

  import { slimDateTime } from "../../tools/stringtools";
  import { default as AccordionRoot } from "../accordion/Root.svelte";
  import { default as AccordionHeader } from "../accordion/Header.svelte";
  import { default as AccordionBody } from "../accordion/Body.svelte";
  import { default as AccordionItem } from "../accordion/Item.svelte";
  import Error from "../Error.svelte";
  import Plot from "./Plot.svelte";
  import Matrix from "../Matrix.svelte";
  import createUniqTools from "../../tools/uniqtools";
  const uniqTools = createUniqTools();

  export let estimatorId;
  export let jiff;
  export let estimationNode = {};

  let errorId = uniqTools.asString();

  let meta;

  let currentId = null;

  let accordionCounter = 0;

  function isOpenAccordion() {
    accordionCounter += 1;
    return accordionCounter === 1;
  }

  function idGetter(next = false) {
    if (next) {
      currentId = uniqTools.asString();
    }
    return currentId;
  }

  $: metas = estimationNode.meta || {};
  $: errors = estimationNode.errors || [];
</script>

<div class="main">
  <AccordionRoot id={errorId}>
    {#each metas as meta}
      {#if meta.metaType === "plainText"}
        <AccordionItem id={idGetter(true)}>
          <AccordionHeader id={idGetter()}>
            {meta.title}
          </AccordionHeader>
          <AccordionBody id={idGetter()} isOpen={isOpenAccordion()}>
            <pre>
			{meta.plainText}
		    </pre>
          </AccordionBody>
        </AccordionItem>
      {:else if meta.metaType === "matrix"}
        <AccordionItem id={idGetter(true)}>
          <AccordionHeader id={idGetter()}>
            {meta.title}
          </AccordionHeader>
          <AccordionBody id={idGetter()} isOpen={isOpenAccordion()}>
            <Matrix
              matrix={meta.matrix}
              rowLabels={meta.topRow}
              colLabels={meta.leftColumn}
            />
          </AccordionBody>
        </AccordionItem>
      {:else if meta.metaType === "plot"}
        <AccordionItem id={idGetter(true)}>
          <AccordionHeader id={idGetter()}>
            {meta.title}
          </AccordionHeader>
          <AccordionBody id={idGetter()} isOpen={isOpenAccordion()}>
            <Plot
              {estimatorId}
              {jiff}
              estimationNodeId={estimationNode.id}
              {meta}
            />
          </AccordionBody>
        </AccordionItem>
      {/if}
    {/each}

    <AccordionItem id={errorId}>
      <AccordionHeader id={errorId}>Errors</AccordionHeader>
      <AccordionBody id={errorId} isOpen={isOpenAccordion()}>
        <ul class="list-group">
          {#each errors as error}
            <li class="list-group-item">
              <Error {error} />
            </li>
          {/each}
        </ul>
      </AccordionBody>
    </AccordionItem>
  </AccordionRoot>
</div>

<style>
  .main {
    min-width: 1024px;
    border: 0px solid red;
  }
</style>
