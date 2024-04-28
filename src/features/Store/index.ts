import _ from 'lodash'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import Auth from '../auth'
import User from '../User'
import Profile from '../Profile'
import workouts from '../Workouts/workoutsSlice'
import Days from '../Days'
import Exercises from '../Exercises'
//
import API from '@features/API'

/**
 * Store config ->	https://redux-toolkit.js.org/api/configureStore
 */

//const debounceNotify = _.debounce((notify) => notify())

const reducer = {
	[API.reducerPath]: API.reducer,
	//
	[Auth.name]: Auth.reducer,
	//
	[User.name]: User.reducer,
	[Profile.name]: Profile.reducer,
	workouts,
	[Days.name]: Days.reducer,
	[Exercises.name]: Exercises.reducer,
}

const Store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(API.middleware)
	},
})

setupListeners(Store.dispatch)

type RootState = ReturnType<typeof Store.getState>
type AppDispatch = typeof Store.dispatch

export default Store
export type { RootState, AppDispatch }
