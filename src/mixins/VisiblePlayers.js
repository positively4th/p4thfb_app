 import * as R from 'ramda'
import { v4 as uuid } from 'uuid';
//import assert from 'assert';
import _ from 'underscore';
import as from 'positively4th.as';

var asId = uuid();

const propSpecs = {
};


function creator (models) {

    var yours = {};
    as.asProps(yours, propSpecs, models);
    // Public functions

    yours.filterOnPossesion = function(inPossession) {
	const res = R.filter((vp) => {
	    return !vp.teammate == !inPossession;
	})(models)
	return res;

    }
    
    var my = Object.create(yours);
    // Private functions

  return yours;
}

function asVisiblePlayers (models) {
    return as.addMixin(asId, creator, models);
}

export default asVisiblePlayers;
