<script>
  import * as R from "ramda";

  import Error from "../Error.svelte";

  export let src = null;
  export let summary = null;
  export let errors = null;
</script>

{#if src}
  <img {src} alt="Plot" />
{/if}

{#if summary && summary.length > 0}
  <div>Data Summary</div>
  <pre>{summary}</pre>
{/if}

{#if errors && errors.length > 0}
  <div>Errors</div>
  {#each errors as error}
    <Error {error} />
  {/each}
{/if}
