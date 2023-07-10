<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let config = null;
  export let onChange = (configs) => {};

  let inputStore = writable("");
  let typeAttributes = {};
  let toStringTransform = (val) => val;

  let transforms = {
    [typeof 1.1]: (input, inverse) => {
      if (inverse) {
        if (input === "NaN") {
          return NaN;
        }
        if (!input && input !== 0) {
          return null;
        }
        return parseFloat(input);
      }

      if (input === null || input === undefined) {
        return "";
      }
      return input.toString();
    },
  };

  function getTypeAttributes(config) {
    const res = {
      required: true,
    };

    for (const example of config["spec"]["allowedTypes"] || []) {
      if (typeof example === "number") {
        res.type = "number";
      }

      if (example === null) {
        res.required = false;
      }
    }

    return res;
  }

  onMount(() => {
    inputStore.set(config.value);
    return inputStore.subscribe((value) => {
      config.value = toStringTransform(value, true);
      config = config;
      onChange([config]);
    });
  });

  $: typeAttributes = getTypeAttributes(config);
  $: toStringTransform = (() => {
    const spec = config.spec || {};
    const allowedTypes = config.spec.allowedTypes || [];
    for (const allowedType of allowedTypes) {
      const transformName = typeof allowedType;
      if (transforms[transformName]) {
        return transforms[transformName];
      }
      return (val) => val;
    }
  })();
</script>

{#if config}
  <div class="container">
    <input bind:value={$inputStore} on:change={() => {}} {...typeAttributes} />
    {#if config.error}
      <div>
        <p class="error">{config.error}</p>
      </div>
    {/if}
  </div>
{/if}

<style>
  .error {
    font-size: smaller;
    color: red;
  }
</style>
