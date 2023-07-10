 import * as R from 'ramda'


const  eventTypeSpecs = [
    { id: '3', label: 'Dispossessed' }, 
    { id: '4', label: 'Duel' }, 
    { id: '9', label: 'Clearance' },
    { id: '10', label: 'Interception' },
    { id: '16', label: 'Shot' },
    { id: '23', label: 'Goal Keeper' },
    { id: '30', label: 'Pass' },
    { id: '34', label: 'Half End' },
    { id: '36', label: 'Tactical Shift' },
    { id: '39', label: 'Dribbled Past' },
    { id: '40', label: 'Injury Stoppage' },
    { id: '41', label: 'Referee Ball-Drop' },
    { id: '42', label: 'Ball Receipt*' },
    { id: '43', label: 'Carry' },
]


function asIdLabelMap () {
    return R.reduce(
	(res, spec) => { res[spec.id] = spec.label; return res; }
    )({}, eventTypeSpecs)
}

function asIdLabelPairs (key='id', label='label', orderBy='label') {
    return R.pipe(
	R.sortBy((spec) => spec['label']),
	R.map((spec) => ({[key]: spec.id, [label]: spec.label})),
    )(eventTypeSpecs)
}


export {
    asIdLabelMap,
    asIdLabelPairs,
}

