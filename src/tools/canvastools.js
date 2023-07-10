
import {
    sqrt,
} from 'mathjs'


function stepArrow(ctx, x, y, dx, dy, {dl=0, dalpha=Math.PI/6}={}) {
    
    var headlen = dl || 0.1 * sqrt(dx * dx + dy * dy); // length of head in pixels
    var angle = Math.atan2(dy, dx);
    
    ctx.moveTo(x, y);
    ctx.lineTo(x+dx, y+dy);
    ctx.lineTo(x+dx - headlen * Math.cos(angle - dalpha), y+dy - headlen * Math.sin(angle - dalpha));
    ctx.moveTo(x+dx, y+dy);
    ctx.lineTo(x+dx - headlen * Math.cos(angle + dalpha), y+dy - headlen * Math.sin(angle + dalpha));

}

function create(ctx) {
    return {
	stepArrow: stepArrow.bind(null, ctx),
    }
}

export default create;
