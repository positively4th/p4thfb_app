<script>
 import * as R from 'ramda'
 import cson from '../contrib/p4thcson/src/cson.js'
 import asRestRunner from '../mixins/restrunner.js'

 import { default as EstimatorList } from './estimator/List.svelte'
 import Estimator from './estimator/Estimator.svelte'

 export let eventFilter = null;
 let selectedEstimatorIds = [];

 let estimator = null
 let estimate = null

 function onEstimate(estimatorId) {
     return asRestRunner({
	 path: ['api', 'estimator', 'estimate', estimatorId],
	 query: {},
     })
	 .post({
	     eventFilter: { ...eventFilter, ...{ offset:0 , limit: null }},
	     featureFilter: {
		 xFeatures: ['One', 'IsHeader', 'OppGoalDist', 'OppGoalWidth', 'ProbBlockGoalie', 'ProbBlockDefenders'],
		 yFeatures: ['OutcomeGoal'],
	     },
	 })
	 .then((resp) => {
	     estimate = resp.data;
	     return resp.data;
	 });
     ;
 }
 
 function createEstimatorPromise(ids, event) {
     if (!event || ids.length < 1) {
	 estimator = null;
	 return Promise.resolve({});
     }

     return asRestRunner({
	 path: ['api', 'estimator', ids[0]],
	 query: {},
     })
	 .post(JSON.parse(cson.asJSON(event)))
	 .then((resp) => {
	     estimator = resp.data;
	     return resp.data;
	 });
     ;
 }

</script>


<EstimatorList bind:selectedEstimatorIds></EstimatorList>

<div class="m-1">
    {#if selectedEstimatorIds.length > 0 && estimator }
	<Estimator estimator={ estimator }></Estimator>
    {/if}

    {#if selectedEstimatorIds.length > 0 }
	<button class="btn btn-sm btn-primary" on:click={ () => onEstimate(selectedEstimatorIds[0]) }> Estimate </button>
    {/if}
</div>
