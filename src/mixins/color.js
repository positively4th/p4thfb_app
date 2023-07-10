import { v4 as uuid } from 'uuid';
import as from 'positively4th.as';
import tinycolor from 'tinycolor2'

var asId = uuid();

const propSpecs = {};


function creator (model) {

    var yours = {};
    as.asProps(yours, propSpecs, model);
    // Public functions

    yours.applyAlphaFactor = function (alphaFactor) {
	const tc = tinycolor(model[0]).clone();

	
	tc.setAlpha(tc.getAlpha() * alphaFactor);
	return tc.toString();
    }
    
    yours.complement = function () {
	const tc = tinycolor(model[0]).clone();
	
	return tinycolor(tc.complement().toRgb()).toString();
    }
    
    var my = Object.create(yours);
    // Private functions

  return yours;
}

function asColor (model) {
    return as.addMixin(asId, creator, [model]);
}

export default asColor;
