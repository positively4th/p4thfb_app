import { format, parseISO } from 'date-fns'
import * as R from 'ramda'

function joinIf(prefix, pred, suffix='') {
    return pred ? prefix + pred + suffix : '';
}

function camelCase2Human(text) {
    const res = text.replace(/([A-Z0-9])/g, ' $1'); 
    return res[0].toUpperCase() + res.slice(1);
}

function slimDateTime(dt) {
    const partLens = [11,9]

    let ref = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    let str = format(parseISO(dt), 'yyyy-MM-dd HH:mm:ss')

    const res = []
    while (partLens.length > 0 && str.slice(0,partLens[0]) === ref.slice(0, partLens[0])) {

	str = str.slice(partLens[0])
	ref = ref.slice(partLens[0])
	partLens.shift();
    }

    return str !== '' ? str : 'A moment ago';
}

function createRounder(points) {
    return (n) => parseFloat(n).toFixed(points);
}

function prettyNumeric(number, formatter=(x) => x) {

    const f = R.pipe(...Array.isArray(formatter)
		     ? formatter
		     : [formatter]
		    );

    if (Array.isArray(number) && number.length < 0) {
	return '';
    }

    if (Array.isArray(number) && number.length === 1) {
	number = number[0]
    } else if (Array.isArray(number)) {
	return `(${ R.map(f(n))(number).join(', ')  })`;
    }

    return '' + f(number);
    
}

export {
    joinIf,
    camelCase2Human,
    slimDateTime,
    createRounder,
    prettyNumeric,
}
