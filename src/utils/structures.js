export default {
	createWorkout: ({ id, name } = {}) => ({
		id,
		name,
		data: [EXERCISE(1)],
	}),
	createExercise: (id, order, is_superset = false) => ({
		id,
		name: '',
		order,
		is_superset,
		srws: defautSRW,
	}),
	createProgWeek: ({ week, d1a, d1b, d2a, d2b } = {}) => ({
		week,
		day1: {
			primary: d1a,
			secondary: d1b,
		},
		day2: {
			primary: d2a,
			secondary: d2b,
		},
	}),
	createProgram: ({ id, name, startdate, duration, d1a, d1b, d2a, d2b } = {}) => ({
		id,
		name,
		startdate,
		duration,
		data: PRG_WK(duration, d1a, d1b, d2a, d2b),
	}),
}
