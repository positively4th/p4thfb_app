<script>
 import * as R from  'ramda'

 
 export let id = null;
 export let spec = {};
 export let selected = [];
 export let onSelect = () => {};

 $: checked = id ? R.includes(id)(selected) : false;
</script>

<td>
    <div>
	<input class="form-check-input" type="checkbox"
	       on:change={ onSelect(id) } bind:checked={ checked }
	>
</div>
</td>
<style>
</style>
