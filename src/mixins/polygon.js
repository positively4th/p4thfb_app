import { v4 as uuid } from 'uuid';
import as from 'positively4th.as';
import {
    min,
    max,
    subtract,
} from 'mathjs'


var asId = uuid();

const propSpecs = {};


function creator (models) {

    var yours = {};
    as.asProps(yours, propSpecs, models);
    // Public functions

    yours.inf = function () {
	return min(models, 0);
    }
    
    yours.sup = function () {
	return max(models, 0);
    }
    
    yours.ext = function () {
	return subtract(yours.sup(), yours.inf())
    }
    
    var my = Object.create(yours);
    // Private functions

  return yours;
}

function asPolygon (models) {
    return as.addMixin(asId, creator, models);
}

export default asPolygon;
