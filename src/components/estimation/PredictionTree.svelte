<script>
 import * as R from 'ramda'

 import { prettyNumeric, createRounder }  from '../../tools/stringtools'
 import AccordionTree  from '../tree_v2/AccordionTree.svelte'
 const round3 = createRounder(3);

 export let node; 
 
 let getLeafTagOrComponent = function (predictionNode, parents)  {

     function showLeaf(predictionNode) {
	 
	 return R.intersection(R.keys(predictionNode), ['N', 'prediction']).length === 0;
     }

     if (parents.length < 1 || parents[0].name == predictionNode.name) {
	 return null;
     }

     if (predictionNode.hasOwnProperty('prediction')) {
	 return {
	     props: {
		 html: () => predictionNode.name + ' = '
			 + prettyNumeric(predictionNode.prediction, round3)
	     }
	 };
     }
     
     return {
	 props: {
	     html: () => predictionNode.name
	 }
     };
 }
			     
</script>

<AccordionTree branch={ node }
	       getBranches={ (predictionNode) => (predictionNode && predictionNode.predictionNodes) || null }
	       getLeafTagOrComponent={ getLeafTagOrComponent }
/>

