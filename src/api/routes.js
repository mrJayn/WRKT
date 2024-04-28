export const BODYPART_CHOICES = ['chest', 'back', 'arms', 'shoulders', 'legs', 'core', '']
export const EQUIPMENT_CHOICES = [
	'barbell',
	'ez_bar',
	'dumbell',
	'cable',
	'sm',
	'machine',
	'bodyweight',
	'freeweight',
	'bands',
	'',
]
export const routes = {
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
