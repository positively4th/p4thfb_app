 import * as R from 'ramda'
 import asColor  from '../mixins/color'

const teamColorsMap = {
    'Finland': [ 'blue', 'white'],
    'Russia': [ 'red' , 'white'],
    'Sweden': [ 'yellow', 'blue' ],
    'Denmark': [ 'red', 'white' ],
    'England': [ 'white', 'red' ],
    'Ukraine': [ 'blue', 'yellow' ],
}
R.reduce(
    (res, [team, colors]) => {
	team = `${ team } Women's`;
	res[team] = colors;
	return res;
    }
)(teamColorsMap, R.toPairs(teamColorsMap))

const defaultColors = [ 'red', 'blue' ];

function getTeamColor(teamName, opponentColor, {alpha=1.0}={}) {
    const color
	  = R.difference(
	      teamColorsMap[teamName] || defaultColors,
	      opponentColor ? [opponentColor] : []
	  );

    const coloree = asColor(color[0]);
    return coloree.applyAlphaFactor(alpha);
}

function create() {
    return {
	getTeamColor,
    };
}

export default create;
