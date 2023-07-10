<script>
  import * as R from "ramda";

  export let typeFilter = false;
  export let exclusive = false;
  export let showOnlySelected = false;
  export let keyLabelPairs = [];
  export let selectedKey = null;
  export let selectedKeys = [];
  export let disabledKeys = [];
  export let filter = "";
  export let filterPlaceholder = "";
  export let onChange = () => {};

  function onClick(key) {
    if (selectedKeys.includes(key)) {
      selectedKeys = R.difference(selectedKeys)([key]);
    } else {
      selectedKeys = exclusive ? [key] : selectedKeys.concat([key]);
    }
    selectedKey = selectedKeys.length === 1 ? selectedKeys[0] : null;
    onChange();
  }

  function showButton(key, label, selectedKeys) {
    if (selectedKeys.includes(key)) {
      return true;
    }

    if (!applyFilter(filter, label)) {
      return false;
    }

    if (!showOnlySelected) {
      return true;
    }

    if (selectedKeys.length < 1) {
      return true;
    }
    return selectedKeys.includes(key);
  }

  function applyFilter(filter, label) {
    if (filter.trim() === "") {
      return true;
    }
    return label.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  }

  $: visibleKeyLabelPairs = ((filter) =>
    R.filter(({ key, label }) => showButton(key, label, selectedKeys))(
      keyLabelPairs
    ))(filter);
</script>

{#if typeFilter}
  <div class="m-1">
    <input
      type="text"
      class="form-control"
      name="typeFilter"
      placeholder={filterPlaceholder}
      aria-label="Filter"
      bind:value={filter}
    />
  </div>
{/if}
{#each visibleKeyLabelPairs as { key, label }}
  <button
    type="button"
    disabled={disabledKeys.includes(key)}
    class={"m-1 btn btn-sm " +
      (!selectedKeys.includes(key) ? "btn-success" : "btn-danger")}
    on:click={() => onClick(key)}
  >
    {label}
  </button>
{/each}

<style>
  .btn:focus {
    outline: none;
    box-shadow: none;
  }
</style>
