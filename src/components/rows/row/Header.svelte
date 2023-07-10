<script>
 import { camelCase2Human } from '../../../tools/stringtools'
 import CellCheckbox from './cell/CellCheckbox.svelte'

 import * as R from  'ramda'
 export let keys = []
 export let keyLabelMap = []
 export let keyTypeSpecMap = {}
 export let onSelect = () => {}
 
</script>


<tr>
    {#each keys as key }
	{#if keyTypeSpecMap[key] && keyTypeSpecMap[key]['type']  === 'checkbox'}
	    <CellCheckbox spec={ keyTypeSpecMap[key] }
			  onSelect={ onSelect }
	    ></CellCheckbox>
	{:else}
	    <td > { camelCase2Human(keyLabelMap[key] || key) } </td>
	{/if}
    {/each}
</tr>

<style>
</style>
