/**
 * App constants.
 */
import { Easing } from 'react-native-reanimated'
import * as Url from '@libs/Url'
import SCREENS from './SCREENS'

const ACTIVE_WRKT_URL = Url.addTrailingForwardSlash(process.env.EXPO_PUBLIC_WRKT_URL ?? 'https://wrkt.com')

/** Name constants for navigators located directly in the RootStack from `./navigation/ContentScreens`. */
const CONST = {
	APP_ID: process.env.EXPO_PUBLIC_APP_ID || 'com.mikejayne.wrkt',

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
	},

	AUTO_AUTH_STATE: {
		NOT_STARTED: 'not-started',
		SIGNING_IN: 'signing-in',
		JUST_SIGNED_IN: 'just-signed-in',
		FAILED: 'failed',
	},

	AUTH_TOKEN_TYPES: {
		ANONYMOUS: 'anonymousAccount',
		SUPPORT: 'support',
	},

	BUTTON_ACTIVE_SCALE: 0.9,
	BUTTON_ACTIVE_OPACITY: 0.6,
	BUTTON_DISABLED_OPACITY: 0.3,

	DATE_OF_BIRTH: {
		MIN_AGE: 5,
		MAX_AGE: 150,
	},

	FIRST_NAME: {
		MAX_LENGTH: 40,
	},

	FONT_FAMILY: {
		INTER_THIN: 'Inter-Thin',
		INTER_EXTRALIGHT: 'Inter-ExtraLight',
		INTER_LIGHT: 'Inter-Light',
		INTER_REGULAR: 'Inter',
		INTER_MEDIUM: 'Inter-Medium',
		INTER_SEMIBOLD: 'Inter-SemiBold',
		INTER_BOLD: 'Inter-Bold',
		INTER_EXTRABOLD: 'Inter-ExtraBold',
		INTER_BLACK: 'Inter-Black',
		INCONSOLATA: 'Inconsolata',
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

	WEEKDAY_NAMES: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],

	WEEKDAY_SHORT_NAMES: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],

	WRKT_URL: ACTIVE_WRKT_URL,
} as const

export default CONST
