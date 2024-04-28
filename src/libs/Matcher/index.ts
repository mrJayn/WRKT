import _ from 'lodash'
import { isAllOf, isAnyOf, isAsyncThunkAction, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import type { Action, AsyncThunk, UnknownAction } from '@reduxjs/toolkit'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

function isPendingAction(action: UnknownAction): action is PendingAction {
	return _.isString(action.type) && _.endsWith(action.type, '/pending')
}

function isFulfilledAction(action: Action): action is FulfilledAction {
	return _.endsWith(action.type, '/fulfilled')
}

function isRejectedAction(action: Action): action is RejectedAction {
	return _.endsWith(action.type, '/rejected')
}

export default { isPendingAction, isFulfilledAction, isRejectedAction }
