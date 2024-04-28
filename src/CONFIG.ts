import { Platform } from 'react-native'

export default {
	CHOICES: {
		BODYPART_CHOICES: ['chest', 'back', 'arms', 'shoulders', 'legs', 'core', ''],
		EQUIPMENT_CHOICES: [
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
		],
	},

	IS_IN_PRODUCTION: Platform.OS === 'web' ? process.env.NODE_ENV === 'production' : !__DEV__,

	MAX_WORKOUTS: 3,
	MAX_PROGRAMS: 3,

	TOKEN_LIFETIMES: {
		ACCESS: 5 * 60, // 5 mins,
		REFRESH: 14 * 60 * 60 * 24, // 14 days
	},
} as const
