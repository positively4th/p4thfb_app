<script>
  import * as R from "ramda";

  import Context from "./Context.svelte";
  import Root from "./accordion/Root.svelte";
  import Header from "./accordion/Header.svelte";
  import Body from "./accordion/Body.svelte";
  import createUniqTools from "../tools/uniqtools";
  const uniqTools = createUniqTools();

  export let error = {};

  let id = uniqTools.asString();
</script>

<Root {id}>
  <Header {id}>
    {error.message || error}
  </Header>
  {#if error.context && !R.isEmpty(error.context)}
    <Body {id}>
      <Context context={error.context} />
    </Body>
  {/if}
</Root>
