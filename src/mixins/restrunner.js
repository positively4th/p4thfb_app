import { v4 as uuid } from 'uuid';
//import assert from 'assert';
import _ from 'underscore';
import axios from 'axios';
import as from 'positively4th.as';
import _as from 'positively4th.as';
//const as = require('positively4th.as');

var asId = uuid();

const propSpecs = {
    proto: {
        'rights': 'r',
        'default': (/* model */) => '',
    },
    host: {
        'rights': 'r',
        'default': (/* model */) => '',
    },
    port: {
        'rights': 'r',
        'default': (/* model */) => '',
    },
    path: {
        'rights': 'r',
        'default': (/* model */) => '',
    },
    query: {
        'rights': 'r',
        'default': (/* model */) => ({}),
    },
    method: {
        'rights': 'r',
        'default': (/* model */) => 'GET',
    },
    timeout: {
        'rights': 'r',
        'default': (/* model */) => null,
    },
};

function joinIf (pred, prefix, suffix='') {
    return pred ? prefix + pred + suffix : pred;
}

function creator (model) {

    var yours = {};
    as.asProps(yours, propSpecs, model);
    // Public functions

    yours.run = function (method, payload, headers) {
      const requester = axios[method.toLowerCase()];
      //assert(requester, 'Invalid method.');
      //const url = encodeURI(my.url());
      const url = my.url();
      const opts = {
        headers: headers || {},
      }
      if (yours.timeout() !== null) {
        opts.timeout = yours.timeout();
      }
      return requester(url, payload, opts);
    };
    
    yours.get = function (payload, headers) {
        return yours.run('GET', payload, headers);
    };
    
    yours.post = function (payload, headers) {
        return yours.run('POST', payload, headers);
    };
    
    yours.put = function (payload, headers) {
        return yours.run('PUT', payload, headers);
    };
    
    yours.delete = function (payload, headers) {
        return yours.run('DELETE', payload, headers);
    };
    
    var my = Object.create(yours);
    // Private functions

    my.url = function () {
        return `${ joinIf(my.proto(), '', '://') }${ my.host() }${ joinIf(my.port(), ':') }/${ my.pathString(my.path()) }${ joinIf(my.pathString(my.query()), '?') }`;
    };
    
  my.pathString = function (path, depth=0) {
    if (_.isArray(path)) {
      return _.map(path, (p) => my.pathString(p, depth+1)).join('/');
    }
    if (_.isObject(path)) {
      return _.map(path, (v, k) => `${ encodeURIComponent(k) }=${ encodeURIComponent(v) }`).join('&');
    }
    return path;
  };
    
    
  return yours;
}

function asRestRunner (model) {
    return as.addMixin(asId, creator, model);
}

export default asRestRunner;
