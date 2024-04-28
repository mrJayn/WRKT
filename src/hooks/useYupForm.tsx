import { useForm, UseFormProps } from 'react-hook-form'
import { AnyObject, Lazy, ObjectSchema, ValidateOptions } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function useYupForm(
	{
		schema,
		abortEarly,
		mode = 'onChange',
		...props
	}: Omit<UseFormProps, 'resolver'> & {
		schema: ObjectSchema<AnyObject> | Lazy<AnyObject>
		abortEarly?: ValidateOptions<AnyObject>['abortEarly']
	}
	// schemaOptions?: Parameters<(typeof schema)['validate']>[1],
) {
	return useForm<typeof schema.__outputType>({
		resolver: yupResolver(schema),
		mode,
		...props,
	})
}
