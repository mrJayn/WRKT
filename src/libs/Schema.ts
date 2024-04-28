import * as yup from 'yup'

/** Login form schema.  */
const LoginSchema = yup.object({
	email: yup.string().required(),
	password: yup.string().required(),
})

/** New Email form schema. ( validates via async API ). */
const emailFormSchema = yup.object({
	email: yup.string().required().emailAddress(),
})

/** New Password form schema. */
const createPasswordSchema = yup.object({
	password: yup.string().required().password(),
})

/** New Username form schema. */
const createProfileSchema = yup.object({
	username: yup.string().required().username(),
})

/** Single fields  */

const ItemNameSchema = yup.object({
	name: yup.string().required(),
})

type EmailFormFieldValues = typeof emailFormSchema.__outputType

export { LoginSchema, emailFormSchema, createPasswordSchema, createProfileSchema }

export type { EmailFormFieldValues }
