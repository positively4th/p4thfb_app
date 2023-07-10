<script>
 import CellCheckbox from './CellCheckbox.svelte'

 import * as R from  'ramda'
 export let row = {}
 export let keys = []
 export let keyTypeSpecMap = {}
</script>


<tr>
    {#each keys as key }
	{#if keyTypeMap[key] && keyTypeMap[key]['type']  === 'checkbox'}
	    <CellCheckbox></CellCheckbox>
	{:else}
	    <td > { row[key] } </td>
	{/if}
    {/each}
</tr>

<style>
</style>
