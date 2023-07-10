
import {
    matrix, multiply, identity
} from 'mathjs'

function worldMove(p, dp) {
    const transT = matrix([
	[1, 0, dp[0]],
	[0, 1, dp[1]],
	[0, 0, dp[2]],
    ])
    return multiply(transT, p)
}

function world2Screen(worldT, wSO, wSR, p) {
    const T = worldTScreen(worldT, wSO, wSR)
    return multiply(T, p)
}

function flipWorldT({width=null, height=null}={}) {
    const transT = matrix([
	[1, 0, width || 0],
	[0, 1, height || 0],
	[0, 0, 1],
    ])

    const negT = matrix([
	[width !== null ? -1 : 1, 0, 0],
	[0, height !== null ? -1 : 1, 0],
	[0, 0, 1],
    ])

    return multiply(transT, negT)
}
    
function worldTScreen(worldT, wSO, wSR) {
    const transT = matrix([
	[1, 0, wSO[0]],
	[0, 1, wSO[1]],
	[0, 0, wSO[2]],
    ])
    const scaleT = matrix([
	[1.0 / wSR[0], 0, 0],
	[0, 1.0 / wSR[1], 0],
	[0, 0, 1.0 / wSR[2]],
    ])
    return multiply(multiply(scaleT, transT), worldT)
}

function pair(p) {
    const cp = matrix(p)
    return [cp.get([0]), cp.get([1])]
}

function first(p) {
    return p.get([0])
}

function create(worldScreenOrigo, worldScreenRatio, worldT) {
    worldT = worldT || identity(3);
    
    return {
	w2sOrigo: worldScreenOrigo,
	w2sRatio: worldScreenRatio,
	first,
	pair,
	wTs: worldTScreen.bind(null, worldT, worldScreenOrigo, worldScreenRatio),
	w2s: world2Screen.bind(null, worldT, worldScreenOrigo, worldScreenRatio),
	dW: worldMove,
	flipWorldT,
    }
}

export default create;
