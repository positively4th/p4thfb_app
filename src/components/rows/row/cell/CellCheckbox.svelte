<script>
 import * as R from  'ramda'

 
 export let id = null;
 export let selected = [];
 export let onSelect = () => {};
 export let onClick = (val) => {};

 $: checked = id ? R.includes(id)(selected) : false;
</script>

<td on:click={ () => onClick(checked) }>
    <div>
	<input class="form-check-input" type="checkbox"
	       on:change={ onSelect(id) } bind:checked={ checked }
	>
</div>
</td>
<style>
</style>
