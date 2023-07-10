<script>
  import * as R from "ramda";

  export let matrix = [];
  export let rowLabels = null;
  export let colLabels = null;

  let rows = 0;
  let cols = 0;
  let rowIndexes = 0;
  let colIndexes = 0;
  let rowClasses = 0;

  function pick(row, col) {
    if (row < 0 && col < 0) {
      const res = [
        ["", ""],
        ["", ""],
      ];
      if (rowLabels !== 0) {
        res[0][1] = rowLabels[0];
      }
      if (colLabels !== 0) {
        res[1][0] = colLabels[0];
      }
      return res;
    }

    if (row < 0 && colLabels !== null) {
      return colLabels[col + 1];
    }
    if (col < 0 && rowLabels !== null) {
      return rowLabels[row + 1];
    }

    //return `${ matrix[row][col] } (${ row }, ${ col })`;
    return `${matrix[row][col]}`;
  }

  $: firstRowIndex = rowLabels ? -1 : 0;
  $: firstColIndex = colLabels ? -1 : 0;
  $: rows = (matrix ? matrix.length : 0) - firstRowIndex;
  $: cols = (rows > 0 ? matrix[0].length : 0) - firstColIndex;
  $: rowIndexes = R.mapAccum((res, arr) => [res + 1, res])(
    firstRowIndex,
    Array(rows)
  )[1];
  $: colIndexes = R.mapAccum((res, arr) => [res + 1, res])(
    firstColIndex,
    Array(cols)
  )[1];
  $: rowClasses = cols > 0 ? `row row-cols-${cols}` : `row`;
</script>

<div class="container">
  {#each rowIndexes as rowIndex}
    <div class={rowClasses}>
      {#each colIndexes as colIndex}
        {#if colIndex < 0 && rowIndex < 0}
          <div class="col">
            <svelte:self matrix={pick(rowIndex, colIndex)} />
          </div>
        {:else}
          <div class="col">{pick(rowIndex, colIndex)}</div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
