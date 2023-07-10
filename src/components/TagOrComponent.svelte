<script>
  import * as R from "ramda";

  export let props = {};
  export let slotProps = {};

  function traverse(source, path, fallback) {
    if (path.length < 1) {
      return source;
    }
    const key = path.shift();
    const val = source.hasOwnProperty(key) ? source[key] : fallback;
    return traverse(val, path, fallback);
  }
</script>

{#if Array.isArray(props) && props.length > 0}
  <svelte:self
    props={traverse(props, [0, "props"], {})}
    slotProps={traverse(props, [0, "slotProps"], {})}
  >
    <svelte:self props={props.slice(1)} />
  </svelte:self>
{:else if Array.isArray(props) && props.length === 0}
  <svelte:self
    props={traverse(props, [1, "props"], {})}
    slotProps={traverse(props, [1, "slotProps"], {})}
  />
{:else if !props || !props.this}
  {#if props.html}
    {props.html()}
  {/if}
  {#if $$slots.default}
    <slot {...slotProps} />
  {/if}
{:else if typeof props.this === "string" && !$$slots.default && !props.html}
  <svelte:element this={props.this} {...slotProps} />
{:else if typeof props.this === "string"}
  <svelte:element this={props.this} {...slotProps}>
    {#if props.html}
      {props.html()}
    {/if}
    {#if $$slots.default}
      <slot {...slotProps} />
    {/if}
  </svelte:element>
{:else}
  <svelte:component this={props.this} {...slotProps}>
    {#if props.html}
      {props.html()}
    {/if}
    {#if $$slots.default}
      <slot {...slotProps} />
    {/if}
  </svelte:component>
{/if}
