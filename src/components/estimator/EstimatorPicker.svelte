<script>
 import * as R from 'ramda'
 import cson from '../../contrib/p4thcson/src/cson.js'
 import asRestRunner from '../../mixins/restrunner.js'

 import { default as EstimatorList } from './List.svelte'
 import Estimator from './Estimator.svelte'

 export let event = null;
 let selectedEstimatorIds = [];

 let estimator = null

 
 function createEstimatorPromise(ids, event) {
     if (!event || ids.length < 1) {
	 estimator = null;
	 return Promise.resolve({});
     }

     return asRestRunner({
	 path: ['api', 'estimator', ids[0]],
	 query: {},
     })
	 .get(JSON.parse(cson.asJSON(event)))
	 .then((resp) => {
	     estimator = resp.data;
	     return resp.data;
	 });
     ;
 }
 
 $: pEstimator = (() => createEstimatorPromise(selectedEstimatorIds, event))();

</script>

<div class="card">
    <div class="card-content">
	<div class="card-header">
	    Estimators
	</div>
	
	<div class="list-group">
	    <div class="list-group-item">
		<EstimatorList bind:selectedEstimatorIds></EstimatorList>
	    </div>
	</div>
	{#if selectedEstimatorIds.length > 0 && estimator }
	    <div class="list-group-item">
		<Estimator estimator={ estimator } event={ event }></Estimator>
	    </div>
	{/if}
    </div>
</div>
