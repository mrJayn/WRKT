import { RootState, AppDispatch } from '@features/Store'

// Create an object type from `ObjectType`, where the keys
// represent the keys of the `ObjectType` and the values
// represent the values of the `ObjectType`

// type NestedKeyOf<ObjectType extends object> = {
// 	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
// 		? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
// 		: `${Key}`
// }[keyof ObjectType & (string | number)]

// type ConnectionsNestedKeyOf = NestedKeyOf<ConnectionsType>

/**
 *
 */
type StateProps = Object | null | undefined
type MapStateToProps = ((rootState: RootState) => StateProps) | null | undefined

type DispatchProps = Object | null | undefined
type MapDispatchToProps = ((dispatch: AppDispatch) => DispatchProps) | null | undefined

type SelectorString = 'data' | 'info'
type SelectorFn = (state: RootState[keyof RootState], ...args: any[]) => any

type ActionString = 'list' | 'create' | 'retrieve' | 'update' | 'destroy'

export type {
	StateProps,
	MapStateToProps,
	DispatchProps,
	MapDispatchToProps,
	SelectorString,
	SelectorFn,
	ActionString,
	//
}
