<script>
 import CellCheckbox from './cell/CellCheckbox.svelte'
 import Cell from './cell/Cell.svelte'

 import * as R from  'ramda'
 export let row = {}
 export let idKey;
 export let keys = []
 export let keyTypeSpecMap = {}
 export let selected = [];
 export let onSelect = () => {};
 export let onClick = (row, key, val) => {};

</script>


<tr>
    {#each keys as key }
	{#if keyTypeSpecMap[key] && keyTypeSpecMap[key]['type']  === 'checkbox'}
	    <CellCheckbox spec={ keyTypeSpecMap[key] }
			  id={ row[idKey] }
			  selected={ selected }
			  onSelect={ onSelect }
			  onClick={ (val) => onClick(row, key, val) }
	    ></CellCheckbox>
	{:else}
	    <Cell value={ row[key] }
			onClick={ (val) => onClick(row, key, val) }
	    ></Cell>
	{/if}
    {/each}
</tr>

<style>
</style>
