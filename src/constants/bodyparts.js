 import * as R from 'ramda'


const  bodyPartSpecs = [
    { id: '37', label: 'Head' }, 
    { id: '38', label: 'Left Foot' }, 
    { id: '70', label: 'Other' },
    { id: '40', label: 'Right Foot' },
]


function asIdLabelMap () {
    return R.reduce(
	(res, spec) => { res[spec.id] = spec.label; return res; }
    )({}, bodyPartSpecs)
}

function asIdLabelPairs (key='id', label='label', orderBy='label') {
    return R.pipe(
	R.sortBy((spec) => spec['label']),
	R.map((spec) => ({[key]: spec.id, [label]: spec.label})),
    )(bodyPartSpecs)
}


export {
    asIdLabelMap,
    asIdLabelPairs,
}

