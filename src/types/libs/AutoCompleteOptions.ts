import type { TextInputProps } from 'react-native'

type CrossPlatformAutoComplete =
	| `additional-name`
	| `address-line1`
	| `address-line2`
	| `cc-number`
	| `country`
	| `current-password`
	| `email`
	| `family-name`
	| `given-name`
	| `honorific-prefix`
	| `honorific-suffix`
	| `name`
	| `new-password`
	| `off`
	| `one-time-code`
	| `postal-code`
	| `street-address`
	| `tel`
	| `username`

type IOSAutoComplete = `nickname` | `organization` | `organization-title` | `url`

type AndroidAutoComplete =
	| `birthdate-day`
	| `birthdate-full`
	| `birthdate-month`
	| `birthdate-year`
	| `cc-csc`
	| `cc-exp`
	| `cc-exp-day`
	| `cc-exp-month`
	| `cc-exp-year`
	| `gender`
	| `name-family`
	| `name-given`
	| `name-middle`
	| `name-middle-initial`
	| `name-prefix`
	| `name-suffix`
	| `password`
	| `password-new`
	| `postal-address`
	| `postal-address-country`
	| `postal-address-extended`
	| `postal-address-extended-postal-code`
	| `postal-address-locality`
	| `postal-address-region`
	| `sms-otp`
	| `tel-country-code`
	| `tel-national`
	| `tel-device`
	| `username-new`

type AutoCompleteOptions = CrossPlatformAutoComplete | IOSAutoComplete | AndroidAutoComplete

export default AutoCompleteOptions

export type { CrossPlatformAutoComplete, IOSAutoComplete, AndroidAutoComplete }
