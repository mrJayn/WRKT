const qs = require('qs')

function encodeParams(params) {
	return qs.stringify(params)
}

function getParams(params) {
	const searchParams = new URLSearchParams()
	Object.entries(params).forEach(([key, value]) => searchParams.append(String(key), String(value)))
	return searchParams
}

export { encodeParams, getParams }
