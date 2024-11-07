/**
 * This is a file containing constants for all the top level keys in our store
 */
import * as FeatureTypes from '@src/types/features'
import { DeepValueOf, IsEqual } from '@src/types/utils'

const STOREKEYS = {
	FEATURE: {
		USER: 'user',
		PROFILE: 'profile',
		WORKOUTS: 'workouts',
		DAYS: 'days',
		PROGRAMS: 'programs',
		WEEKS: 'weeks',
		EXERCISES: 'exercises',
	},

	/** A two-letter country code as defined in ISO-3166-1 (https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes),
	 * that can be obtained from the  international code of a user input phone-number. */
	COUNTRY_CODE: 'countryCode',

	/** Stores current date */
	CURRENT_DATE: 'currentDate',

	/** Stores last visited path. */
	LAST_VISITED_PATH: 'lastVisitedPath',

	/** The theme setting set by the user in preferences. */
	PREFERRED_THEME: 'preferredTheme',

	/** Has information about the network status (offline/online) */
	// NETWORK: 'network',

	/** Information about the current session (authToken, accountID, email, loading, error) */
	// SESSION: 'session',
	// STASHED_SESSION: 'stashedSession',

	/** The last update ID that was applied to the client */
	// LAST_UPDATE_ID_APPLIED_TO_CLIENT: 'lastUpdateIDAppliedToClient',

	/** Indicates whether an update is available and ready to be installed. */
	// UPDATE_AVAILABLE: 'updateAvailable',

	/** Indicates whether an forced upgrade is required */
	// UPDATE_REQUIRED: 'updateRequired',
} as const

type AllStoreKeys = DeepValueOf<typeof STOREKEYS>

type StoreFeatureValuesMapping = {
	[STOREKEYS.FEATURE.USER]: FeatureTypes.User
	[STOREKEYS.FEATURE.PROFILE]: FeatureTypes.Profile
	[STOREKEYS.FEATURE.WORKOUTS]: FeatureTypes.Workout[]
	[STOREKEYS.FEATURE.DAYS]: FeatureTypes.Day[]
	[STOREKEYS.FEATURE.PROGRAMS]: FeatureTypes.Program[]
	[STOREKEYS.FEATURE.WEEKS]: FeatureTypes.Week[]
	[STOREKEYS.FEATURE.EXERCISES]: FeatureTypes.Exercise[]
}

type StoreValuesMapping = {
	//
	[STOREKEYS.COUNTRY_CODE]: number
	[STOREKEYS.CURRENT_DATE]: string
	[STOREKEYS.LAST_VISITED_PATH]: string
	[STOREKEYS.PREFERRED_THEME]: string
}

type StoreValues = StoreValuesMapping & StoreFeatureValuesMapping

type StoreValuesKey = keyof StoreValuesMapping
type StoreFeatureValuesKey = keyof StoreFeatureValuesMapping

type StoreKey = StoreValuesKey | StoreFeatureValuesKey

type StoreValue<K extends StoreKey> = StoreValues[K]

// If this type errors, it means that the `StoreKey` type is missing some keys.
type AssertStoreKeys = IsEqual<AllStoreKeys, StoreKey> extends true
	? AllStoreKeys
	: `Error: Types don't match, StoreKey type is missing: ${Exclude<AllStoreKeys, StoreKey>}`

// export default STOREKEYS
// export type { AllStoreKeys, StoreValues, StoreKey, StoreValue }
