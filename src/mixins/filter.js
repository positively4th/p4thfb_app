import { v4 as uuid } from 'uuid';
//import assert from 'assert';
import _ from 'underscore';
import axios from 'axios';
import as from 'positively4th.as';
import _as from 'positively4th.as';
//const as = require('positively4th.as');

var asId = uuid();

const propSpecs = {
    columnFilter: {
        'rights': 'rw',
        'default': (/* model */) => {},
    },
};


function creator (model) {

    var yours = {};
    as.asProps(yours, propSpecs, model);
    // Public functions

    
    var my = Object.create(yours);
    // Private functions

  return yours;
}

function asRestRunner (model) {
    return as.addMixin(asId, creator, model);
}

export default asRestRunner;
