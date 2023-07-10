

let ctr = 0

function asNumber() {
    return ctr++
}

function asString() {
    const b = 32
    let m = asNumber()
    let r
    const res = []
    while (true) {
	r = m % b;

	r += 65;
	r = r <= 90 ? r : r + 6;

	res.push(String.fromCharCode(r))
	m = Math.floor(m/b);

	if (m <= 0) {
	    break;
	}
    }
    
    
    return res.join('');

}

function create() {
    return {
	asNumber,
	asString,
    }
}

export default create;
