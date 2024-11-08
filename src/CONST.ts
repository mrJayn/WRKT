import { Easing } from 'react-native-reanimated'
import SCREENS from './SCREENS'

/**
 * App constants.
 */
const CONST = {
	APP_ID: 'com.mikejayne.wrkt',

	APP_SLOGAN: 'Build a workout for yourself or at least do something.',

	ANIMATION: {
		OPACITY_DURATION: 250,

		SPRING_CONFIG: {
			mass: 3,
			damping: 500,
			stiffness: 1000,
			overshootClamping: true,
			restSpeedThreshold: 10,
			restDisplacementThreshold: 10,
		},
		SMOOTH_SPRING: {
			mass: 1, // 3
			damping: 50, // 90
			stiffness: 350, // 400
			overshootClamping: true,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 2,
			velocity: 0,
		},
		TIMING_CONFIG: {
			duration: 250,
			easing: Easing.in(Easing.ease),
		},

		SPLASH_EXIT_TRANSITION: {
			duration: 1500,
			easing: Easing.inOut(Easing.poly(3)),
		},
	},

	APP_STATE: {
		ACTIVE: 'active',
		BACKGROUND: 'background',
		INACTIVE: 'inactive',
	},

	AUTH_HEADER_TYPE: 'Bearer',

	AXIOS_DEFAULTS: {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		timeout: 1000,
		withCredentials: true,
		xsrfCookieName: 'csrftoken',
		xsrfHeaderName: 'X-CSRFToken',
	},

	BUTTON: {
		ACTIVE_SCALE: 0.9,
		ACTIVE_OPACITY: 0.65,
		DISABLED_OPACITY: 0.3,
	},

	DATE_OF_BIRTH: {
		MIN_AGE: 5,
		MAX_AGE: 150,
	},

	EMAIL: {
		SUPPORT: 'm63jayne@gmail.com',
		// WRKT_EMAIL_DOMAIN: '@wrktapp.com',
	},

	ENVIRONMENT: {
		DEV: 'development',
		PRODUCTION: 'production',
	},

	ERROR: {
		UNAUTHORIZED: 'Please enter valid credentials to continue.',
		SERVICE_UNAVAILABLE: 'Our servers may be down. Please try again later.',
		UNKNOWN_ERROR: 'Unknown error',
		INVALID_TOKEN_PAIR: 'The token Pair is invalid or expired.',
		UPDATE_REQUIRED: 'Upgrade required',
		// BAD_REQUEST: 'Looks like something went wrong. Please try again later.',
		// NOT_FOUND: 'Not found.',
		// REQUEST_TIMEOUT: 'Request timeout',
		// INTERNAL_SERVER_ERROR: 'Server error',
	},

	FIRST_NAME: {
		MAX_LENGTH: 40,
	},

	FALLBACK_DISPLAY_DAY_LABELS: [`Day1`, `Day2`, `Day3`, `Day4`, `Day5`, `Day6`, `Day7`],

	FONT_FAMILY: {
		RALEWAY: 'Raleway',
		RALEWAY_MEDIUM: 'Raleway-Medium',
		RALEWAY_SEMIBOLD: 'Raleway-SemiBold',
		RALEWAY_BOLD: 'Raleway-Bold',
		//
		INTER_THIN: 'Inter-Thin',
		INTER_EXTRALIGHT: 'Inter-ExtraLight',
		INTER_LIGHT: 'Inter-Light',
		INTER_REGULAR: 'Inter',
		INTER_MEDIUM: 'Inter-Medium',
		INTER_SEMIBOLD: 'Inter-SemiBold',
		INTER_BOLD: 'Inter-Bold',
		INTER_EXTRABOLD: 'Inter-ExtraBold',
		INTER_BLACK: 'Inter-Black',
		//
		INCONSOLATA: 'Inconsolata',
	},

	__TEST__GITHUB_RELEASE_URL: 'https://api.github.com/repos/expensify/app/releases/latest',
	GITHUB_RELEASE_URL: 'https://api.github.com/repos/mrJayn/WRKT/releases/latest',
	GOOGLE_CLOUD_URL: 'https://clients3.google.com/generate_204',

	/** Descriptive HTTP status codes, for code readability. */
	HTTP_STATUS: {
		UNAUTHORIZED: 401,
		SERVICE_UNAVAILABLE: 503,
		UNKNOWN_ERROR: 520,
		// OK: 200,
		// CREATED: 201,
		// NO_CONTENT: 204,
		// BAD_REQUEST: 400,
		// NOT_FOUND: 404,
		// REQUEST_TIMEOUT: 408,
		// UPDATE_REQUIRED: 426,
		// INTERNAL_SERVER_ERROR: 500,
	},

	INPUT_MODE: {
		NONE: 'none',
		TEXT: 'text',
		DECIMAL: 'decimal',
		NUMERIC: 'numeric',
		TEL: 'tel',
		SEARCH: 'search',
		EMAIL: 'email',
		URL: 'url',
	},

	KEYBOARD_TYPE: {
		VISIBLE_PASSWORD: 'visible-password',
		ASCII_CAPABLE: 'ascii-capable',
		NUMBER_PAD: 'number-pad',
	},

	LOCALES: {
		EN: 'en',
		ES: 'es',
		ES_ES: 'es-ES',
		ES_ES_ONFIDO: 'es_ES',
		DEFAULT: 'en',
	},

	NAVIGATION: {
		ACTION_TYPE: {
			REPLACE: 'REPLACE',
			PUSH: 'PUSH',
			NAVIGATE: 'NAVIGATE',
		},
	},

	NETWORK: {
		REACHABILITY_URL: 'https://clients3.google.com/generate_204',
		REACHABILITY_METHOD: 'HEAD',
		REACHABILITY_TEST: (response: Response) => Promise.resolve(response.status === 204),
		REACHABILITY_SHORT_TIMEOUT: 5 * 1000, // 5s
		REACHABILITY_LONG_TIMEOUT: 10 * 1000, // 10s
		REACHABILITY_REQUEST_TIMEOUT: 15 * 1000, // 15s

		MAX_PENDING_TIME_MS: 10 * 1000,
		BACKEND_CHECK_INTERVAL_MS: 60 * 1000,
		MAX_RETRIES: 10,
		NETWORK_STATUS: {
			ONLINE: 'online',
			OFFLINE: 'offline',
			UNKNOWN: 'unknown',
		},
		DEFAULT_STATE: { isOffline: false, isBackendReachable: true, shouldPerformBackendCheck: true },
	},

	PASSWORD: {
		MIN_LENGTH: 8,
		MAX_LENGTH: 256,
	},

	REGEX: {
		SPECIAL_CHARS_WITHOUT_NEWLINE: /((?!\n)[()-\s\t])/g,
		ANY_VALUE: /^.+$/,
		ANY_SPACE: /\s/g,

		ALPHABETIC_AND_LATIN_CHARS: /^[\p{Script=Latin} ]*$/u,
		NON_ALPHABETIC_AND_NON_LATIN_CHARS: /[^\p{Script=Latin}]/gu,
		ACCENT_LATIN_CHARS: /[\u00C0-\u017F]/g,

		UPPERCASE: /[A-Z]/,
		LOWERCASE: /[a-z]/,
		SPECIAL_CHAR: /[,/?"{}[\]()&^%;`$=#<>!*]/,
		NUMBER: /\d/,
		NUMBER_OR_SPECIAL_CHAR: /[\d,/?"{}[\]()&^%;`$=#<>!*]/,
		NON_NUMERIC: /\D/g,

		ILLEGAL_FILENAME_CHARACTERS: /\/|<|>|\*|"|:|\?|\\|\|/g,

		// A valid email address
		VALID_EMAIL:
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

		// A valid username
		VALID_USERNAME: /^[\w.@+-]+/,

		// Unicode username ( letters, numbers and '@'/'.'/'+'/'-'/ '_' characters )
		UNICODE_USERNAME: /^[\w.@+-]+/,

		// at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.
		PASSWORD_COMPLEXITY: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/,

		// 6 numeric digits
		VALIDATE_CODE_REGEX_STRING: /^\d{6}$/,

		// 8 alphanumeric characters
		RECOVERY_CODE_REGEX_STRING: /^[a-zA-Z0-9]{8}$/,

		// ???
		PATH_WITHOUT_POLICY_ID: /\/w\/[a-zA-Z0-9]+(\/|$)/,
		POLICY_ID_FROM_PATH: /\/w\/([a-zA-Z0-9]+)(\/|$)/,

		ROUTES: {
			VALIDATE_LOGIN: /\/v($|(\/\/*))/,
			UNLINK_LOGIN: /\/u($|(\/\/*))/,
			REDUNDANT_SLASHES: /(\/{2,})|(\/$)/g,
		},
	},

	ROLE: {
		/** Use for elements with important, time-sensitive information. */
		ALERT: 'alert',
		/** Use for elements that act as buttons. */
		BUTTON: 'button',
		/** Use for elements representing checkboxes. */
		CHECKBOX: 'checkbox',
		/** Use for elements that allow a choice from multiple options. */
		COMBOBOX: 'combobox',
		/** Use with scrollable lists to represent a grid layout. */
		GRID: 'grid',
		/** Use for section headers or titles. */
		HEADING: 'heading',
		/** Use for image elements. */
		IMG: 'img',
		/** Use for elements that navigate to other pages or content. */
		LINK: 'link',
		/** Use to identify a list of items. */
		LIST: 'list',
		/** Use for a list of choices or options. */
		MENU: 'menu',
		/** Use for a container of multiple menus. */
		MENUBAR: 'menubar',
		/** Use for items within a menu. */
		MENUITEM: 'menuitem',
		/** Use when no specific role is needed. */
		NONE: 'none',
		/** Use for elements that don't require a specific role. */
		PRESENTATION: 'presentation',
		/** Use for elements showing progress of a task. */
		PROGRESSBAR: 'progressbar',
		/** Use for radio buttons. */
		RADIO: 'radio',
		/** Use for groups of radio buttons. */
		RADIOGROUP: 'radiogroup',
		/** Use for scrollbar elements. */
		SCROLLBAR: 'scrollbar',
		/** Use for text fields that are used for searching. */
		SEARCHBOX: 'searchbox',
		/** Use for adjustable elements like sliders. */
		SLIDER: 'slider',
		/** Use for a button that opens a list of choices. */
		SPINBUTTON: 'spinbutton',
		/** Use for elements providing a summary of app conditions. */
		SUMMARY: 'summary',
		/** Use for on/off switch elements. */
		SWITCH: 'switch',
		/** Use for tab elements in a tab list. */
		TAB: 'tab',
		/** Use for a list of tabs. */
		TABLIST: 'tablist',
		/** Use for timer elements. */
		TIMER: 'timer',
		/** Use for toolbars containing action buttons or components. */
		TOOLBAR: 'toolbar',
	},

	SCREEN_LOADER_MODE: {
		FADE_IN: 'fadeIn',
		FADE_OUT: 'fadeOut',
		NONE: 'none',
		BOTH: 'both',
		DEFAULT: 'both',
	},

	SCREEN_TRANSITION_END_TIMEOUT: 1000,

	SECURE_KEYS: {
		AUTH_TOKEN_PAIR: 'jwt',
		ACCESS_TOKEN: 'access_token',
		REFRESH_TOKEN: 'refresh_token',

		DEVICE_ID: 'device_id',
		THEME: 'theme',
	},

	TAB_ICONS: {
		[SCREENS.TABS.MAIN]: 'home-outline',
		[SCREENS.TABS.WORKOUTS]: 'build-outline',
		[SCREENS.TABS.PROGRAMS]: 'calculator-outline',
		[SCREENS.TABS.SETTINGS]: 'person-outline',
	},

	THEME: {
		DEFAULT: 'dark',
		FALLBACK: 'dark',
		LIGHT: 'light',
		DARK: 'dark',
		SYSTEM: 'system',
	},

	USERNAME: {
		MIN_LENGTH: 1,
		MAX_LENGTH: 50,
		RESERVED_NAMES: ['Wrkt', 'Admin'],
	},

	API_VIEWSETS: {
		ROOT: '',
		ROUTES: 'routes',
		//
		REGISTER: 'register',
		REGISTER_VALIDATE: 'register_validate',
		LOGIN: 'login',
		LOGOUT: 'logout',
		REFRESH: 'refresh',
		VERIFY: 'verify',
		//
		USER: 'user',
		PROFILE: 'profile',
		WORKOUTS: 'workouts',
		WORKOUTS_DETAIL: 'workouts_detail',
		DAYS: 'days',
		DAYS_DETAIL: 'days_detail',
		ACTIVE_WORKOUT_DAYS: 'days_active',
		PROGRAMS: 'programs',
		PROGRAMS_DETAIL: 'programs_detail',
		WEEKS: 'weeks',
		WEEKS_DETAIL: 'weeks_detail',
		EXERCISES: 'exercises',
		EXERCISES_DETAIL: 'exercises_detail',
		ACTIVE_WORKOUT_EXERCISES: 'exercises_active',
		LIBRARY: 'library',
		LIBRARY_DETAIL: 'library_detail',
	},

	API_VIEWSET_ACTIONS: {
		LIST: 'list',
		CREATE: 'create',
		RETRIEVE: 'retrieve',
		UPDATE: 'update',
		DESTROY: 'destroy',
	},
} as const

export default CONST
