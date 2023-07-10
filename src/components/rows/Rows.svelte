<script>
 import Header from './row/Header.svelte'
 import Row from './row/Row.svelte'

 import * as R from 'ramda'

 export let idKey = '_id'
 export let rows
 export let keyWeightMap = {}
 export let keyTypeSpecMap = {} 
 export let keyExcludePattern = '^$' 
 export let selected = [];
 export let onClicked = (row, key, val) => {};

 function _onSelect(selectedId) {
     let changeSet, opR;
     
     const allIds = R.map((r) => r[idKey])(rows);
     //const allIds = R.map(R.prop(idKey))(rows);

     if (selectedId) {
	 changeSet = [selectedId];
	 opR = R.includes(selectedId)(selected)
	     ? R.difference
	     : R.union;
     } else {
	 changeSet = allIds;
	 opR = R.difference(allIds, selected).length === 0
	     ? R.difference
	     : R.union;
     }
     selected = opR(selected, changeSet);
 }
 
 $: keys = () => {
     const visibleKeys = R.pipe(
	 R.map(r => R.keys(r)),
	 R.unnest,
	 R.uniq,
	 R.union(R.keys(keyWeightMap)),
	 R.filter(key => !key.match(keyExcludePattern)),
     )(rows)

     const weighted = R.pipe(
	 R.toPairs,
	 R.sortBy((pair) => pair[1]),
	 R.map((pair) => pair[0]),
	 R.filter(key => visibleKeys.includes(key)), //Order is preserved
     )(keyWeightMap)

     const ordered = R.difference(visibleKeys, weighted)
     return weighted.concat(ordered)

 }

</script>

<table class="table">
    <thead>
	<Header keys={ keys() }
		keyTypeSpecMap={ keyTypeSpecMap }
		onSelect={ _onSelect }
	></Header>
    </thead>
    <tbody>
	{#each rows as row (row[idKey])}
	    <Row  keyTypeSpecMap={ keyTypeSpecMap }
		  keys={ keys() }
		  row={ row }
		  idKey={ idKey }
		  selected={ selected }
		  onSelect= { _onSelect }
		  onClick={ onClicked }
	    ></Row>
	{/each}
    </tbody>
</table>
	    

<style>
</style>

