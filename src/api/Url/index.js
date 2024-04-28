import { routes } from '../routes'
import { getParams, encodeParams } from './SearchParams'
routes
const DETAIL_RE = /(?=<).*?(?<=>)/

const MODEL_DETAILS = {
	detail: 'detail',
	workout: 'workout',
	program: 'program',
	day: 'day',
	week: 'week',
	exercise: 'exercise',
	sets: 'set',
	library: 'id',
}

function cleanDetails(details) {
	if (details === null || details == {} || typeof details !== 'object') return
	var cleanned = {}
	const url_lookups = Object.values(MODEL_DETAILS)

	Object.entries(details).forEach(([key, value]) => {
		let lookupKey = url_lookups.includes(key) ? key : MODEL_DETAILS[key]
		cleanned[lookupKey] = value
	})
	return cleanned
}

async function getURL(key, details) {
	if (!key in routes) {
		return console.log(`Error > Route ${key} does not exist.`)
	}
	const { url, lookup } = routes[key]
	const clean_details = details ? cleanDetails(details) : null
	var URL = String(url)
	//
	if (clean_details === null) return URL
	if (lookup !== null && lookup.slice(1, -2) in clean_details) {
		URL += lookup // = `${URL}${lookup}`
	}
	// replace <details> with values.
	while (DETAIL_RE.test(URL) === true) {
		let detail_str = URL.match(DETAIL_RE)[0].slice(1, -1)
		let detail_value = clean_details[detail_str]
		URL = URL.replace(DETAIL_RE, detail_value)
		continue
	}
	return URL
}

export default {
	get: getURL,
	Params: {
		get: getParams,
		encode: encodeParams,
	},
}
export { getURL }
