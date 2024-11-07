import { Action, Reducer, ReducersMapObject, UnknownAction, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import listenerMiddleware from '@libs/Middleware/listenerMiddleware'
import * as Middleware from '@libs/Middleware'
import authApi from '@features/auth/authApi'
import API from '@features/API'
//
import appInfoSlice from '@features/AppInfo/appInfoSlice'
import authSlice from '@features/auth/authSlice'
import userSlice from '@features/User'
import profileSlice from '@features/Profile/profileSlice'
import workoutsSlice from '@features/Workouts/workoutsSlice'
import daysSlice from '@features/Days'
import exercisesSlice from '@features/Exercises'
import NetworkSlice from '@features/Network'

import customHandler from './customListenersHandler'

const reducers: ReducersMapObject<any, UnknownAction, any> = {
	//  API reducers
	[authApi.reducerPath]: authApi.reducer,
	[API.reducerPath]: API.reducer,

	// App slices
	[appInfoSlice.name]: appInfoSlice.reducer,
	[NetworkSlice.reducerPath]: NetworkSlice.reducer,

	//  User slices
	[authSlice.name]: authSlice.reducer,
	[userSlice.name]: userSlice.reducer,
	[profileSlice.name]: profileSlice.reducer,
	[workoutsSlice.name]: workoutsSlice.reducer,
	[daysSlice.name]: daysSlice.reducer,
	[exercisesSlice.name]: exercisesSlice.reducer,
}

const Store = configureStore({
	reducer: {
		//  API reducers
		[authApi.reducerPath]: authApi.reducer,
		[API.reducerPath]: API.reducer,

		// App slices
		[appInfoSlice.name]: appInfoSlice.reducer,
		[NetworkSlice.reducerPath]: NetworkSlice.reducer,

		//  User slices
		[authSlice.name]: authSlice.reducer,
		[userSlice.name]: userSlice.reducer,
		[profileSlice.name]: profileSlice.reducer,
		[workoutsSlice.name]: workoutsSlice.reducer,
		[daysSlice.name]: daysSlice.reducer,
		[exercisesSlice.name]: exercisesSlice.reducer,
	},
	middleware: (gDM) =>
		gDM().prepend(listenerMiddleware).concat([
			authApi.middleware,
			API.middleware,
			//
		]),
	devTools: process.env.NODE_ENV !== 'production',
})

//  Set-up the listeners with custom behaivors.
setupListeners(Store.dispatch, customHandler)
// Middleware.Reauthentication

// type UninitializedState = StateFromReducersMapObject<typeof rootReducer>
type RootState = ReturnType<typeof Store.getState>
type AppDispatch = typeof Store.dispatch

export default Store
export type { RootState, AppDispatch }
