import type { Selector } from '@reduxjs/toolkit'
import CONST from '@src/CONST'
import type { ValueOf } from '@src/types/utils'
import type { RootState, AppDispatch } from '@features/Store'

// Create an object type from `ObjectType`, where the keys
// represent the keys of the `ObjectType` and the values
// represent the values of the `ObjectType`

// type NestedKeyOf<ObjectType extends object> = {
// 	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
// 		? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
// 		: `${Key}`
// }[keyof ObjectType & (string | number)]

// type ConnectionsNestedKeyOf = NestedKeyOf<ConnectionsType>

type StateToPropsMap<T extends any = any> = ((rootState: RootState) => T) | null | undefined

type DispatchToPropsMap<TDispatchProps extends any = any> = ((dispatch: AppDispatch) => TDispatchProps) | null | undefined

type SelectorFn<R = unknown> = Selector<RootState[keyof RootState], R> // (state:  RootState[keyof RootState], ...args: any[]) => any

type ViewsetAction = ValueOf<typeof CONST.API_VIEWSET_ACTIONS>

export type { StateToPropsMap, DispatchToPropsMap, SelectorFn, ViewsetAction }
