import * as yup from 'yup'

declare module 'yup' {
	interface StringSchema<TType, TContext, TDefault, TFlags> {
		emailAddress(): this
		emailOrPhone(): this
		password(): this
		username(): this
	}
}
