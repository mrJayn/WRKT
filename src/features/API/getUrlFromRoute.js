const routes = {
	user: {
		url: '/user/',
		lookup: null,
	},
	profile: {
		url: 'user/profile/',
		lookup: null,
	},
	workout: {
		url: '/user/workouts/',
		lookup: '<workout>/',
	},
	'active-workout': {
		url: '/user/workouts/active/',
		lookup: null,
	},
	day: {
		url: '/user/workouts/<wkt_order>/days/',
		lookup: '<day>/',
	},
	program: {
		url: '/user/programs/',
		lookup: '<program>/',
	},
	week: {
		url: '/user/programs/<program>/weeks/',
		lookup: '<week>/',
	},
	//
	wkt_exercise: {
		url: '/user/workouts/<wkt_order>/days/<day>/exercises/',
		lookup: '<exercise>/',
	},
	prg_exercise: {
		url: '/user/programs/<program>/weeks/<week>/exercises/',
		lookup: '<exercise>/',
	},
	//
	wkt_secondary: {
		url: '/user/workouts/<wkt_order>/days/<day>/exercises/<exercise>/secondary/',
		lookup: 'add/',
	},
	prg_secondary: {
		url: '/user/programs/<program>/weeks/<week>/exercises/<exercise>/secondary/',
		lookup: 'add/',
	},
	//
	wkt_set: {
		url: '/user/workouts/<wkt_order>/days/<day>/exercises/<exercise>/sets/',
		lookup: '<set>/',
	},
	prg_set: {
		url: '/user/programs/<int:order>/weeks/<int:week>/exercises/<int:order>/sets/',
		lookup: '<set>/',
	},
	//
	library: {
		url: '/user/library/',
		lookup: '<pk>/',
	},
}

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

function getCleanDetails(details) {
	if (!details || typeof details !== 'object') {
		return
	}
	var cleanned = {}
	const url_lookups = Object.values(MODEL_DETAILS)

	Object.entries(details).forEach(([key, value]) => {
		let lookupKey = key in url_lookups ? key : MODEL_DETAILS[key]
		cleanned[lookupKey] = value
	})
	return cleanned
}

async function getURLFromRoute(key, details) {
	if (!key in routes) {
		return console.log(`Error > Route ${key} does not exist.`)
	}
	const { url, lookup } = routes[key]
	const clean_details = getCleanDetails(details)
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
