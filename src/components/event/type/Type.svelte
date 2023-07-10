 <script>
 import { camelCase2Human } from '../../../tools/stringtools.js'
 import * as R from 'ramda'
 export let type = {};

 export let formatters = {
      '^.*__id$': () => null,
      '^file$': () => null,
      '.*Id': () => null,
      'last': () => null,
  };

  export let defaultFormatter = (key, val) => {
     if (val === null || val === undefined) {
	 return null;
     }
     const _key = camelCase2Human(key);

     const float = parseFloat(val);
     const _val =  typeof float === 'number' &&
		   !Number.isNaN(float) &&
		   !Number.isInteger(float)
		 ? val.toFixed(2)
		 : val;
     return `${ _key }: ${ _val }`;
 };
 

  function format(key, val) {
      const re = R.pipe(
	  R.toPairs,
	  R.map((pair) => pair[0]),
	  R.find((re) => key.match(re) !== null),
      )(formatters)
      return formatters[re] ? formatters[re](key, val) : defaultFormatter(key, val);
 }
 
 $: valueKeys = R.keys(type);

 
</script>

<div>
    {#each valueKeys as key }
	{#if format(key, type[key]) }
	    <span class="badge bg-primary m-1">
		{ format(key, type[key]) }
	    </span>
	{/if}
    {/each}
</div>

<style>
</style>
