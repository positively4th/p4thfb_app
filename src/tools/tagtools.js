 import * as R from 'ramda'
 import asColor  from '../mixins/color'

const idTagMap = {
    'possessionFirst': {
	'name': 'First in Possession',
    },
    'possessionLast': {
	'name': 'Last in Possession',
    },
    'related': {
	'name': 'Related',
    },
    'withinPossession': {
	'name': 'Same Possession',
    },
    'shotAssisted': {
	'name': 'Shot Assisted',
    },
    'assistingPass': {
	'name': 'Assisting Pass',
    },
    'shotKeyPass': {
	'name': 'Shot Key Pass',
    },

}

function getName(id) {
    return (idTagMap[id] && idTagMap[id].name) || null;
}

function create() {
    return {
	getName: getName,
    };
}

export default create;
