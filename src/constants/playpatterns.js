 import * as R from 'ramda'


const  playPatternSpecs = [
    { id: '1', label: 'Regular Play' }, 
    { id: '2', label: 'From Corner' }, 
    { id: '3', label: 'From Free Kick' }, 
    { id: '4', label: 'From Throw In' }, 
    { id: '5', label: 'Other' }, 
    { id: '6', label: 'From Counter' }, 
    { id: '7', label: 'From Goal Kick' }, 
    { id: '8', label: 'From Keeper' }, 
    { id: '9', label: 'From Kick Off' }, 
]


function asIdLabelMap () {
    return R.reduce(
	(res, spec) => { res[spec.id] = spec.label; return res; }
    )({}, playPatternSpecs)
}

function asIdLabelPairs (key='id', label='label', orderBy='label') {
    return R.pipe(
	R.sortBy((spec) => spec['label']),
	R.map((spec) => ({[key]: spec.id, [label]: spec.label})),
    )(playPatternSpecs)
}


export {
    asIdLabelMap,
    asIdLabelPairs,
}

