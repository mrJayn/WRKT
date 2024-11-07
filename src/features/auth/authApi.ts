import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { MutationLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import CONFIG from '@src/CONFIG'
import type { UserCredentials, UserData, UserLookupFields } from '@src/types/features/User'
import axiosBaseQuery from '@features/API/baseQuery/axiosBaseQuery'
import * as TokenUtils from '@libs/TokenUtils'
import { setAuthToken } from './authSlice'
import type { AuthTokenPair } from './types'

type UserRegistration = UserCredentials & Pick<UserData, 'username'>

const onObtainTokenPairQueryStarted = async <T = any>(
	_arg: T,
	{ dispatch, queryFulfilled }: MutationLifecycleApi<T, BaseQueryFn, AuthTokenPair, 'authApi'>
) => {
	try {
		const { data: tokenPair } = await queryFulfilled

		// patch secure-store & auth-slice
		await TokenUtils.setAuthTokenPair(tokenPair)
		dispatch(setAuthToken(tokenPair.access))

		// pessimistic cache update
		return
		// login
		const updateAuthStatus = dispatch(
			authApi.util.updateQueryData('authenticate', undefined, (draft) => {
				Object.assign(draft, true)
			})
		)
		// register
		const upsertAuthStatus = dispatch(authApi.util.upsertQueryData('authenticate', undefined, true))
	} catch {}
}

const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: axiosBaseQuery(),
	//
	keepUnusedDataFor: 0,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: CONFIG.TOKEN_LIFETIMES.ACCESS,
	//
	endpoints: (builder) => ({
		// Get the authenticatation status for a user.
		authenticate: builder.query<boolean, void>({
			async queryFn(_arg, { dispatch }, _extraOptions, _axiosBaseQuery) {
				return TokenUtils.getTokenPair().then((tokenPair) => {
					if (tokenPair) {
						dispatch(setAuthToken(tokenPair.access))
					}
					return { data: !!tokenPair?.access }
				})
			},
			onCacheEntryAdded: (arg, api) => {
				console.log('[authApi] cache entry added...', { arg })
			},
		}),

		//  Login an existing user.
		login: builder.mutation<AuthTokenPair, UserCredentials>({
			query: (userCredentials) => ({
				method: 'POST',
				url: 'auth/login/',
				data: userCredentials,
			}),
			onQueryStarted: onObtainTokenPairQueryStarted,
			onCacheEntryAdded: (arg, api) => {
				console.log('[authApi] cache entry added...', { arg })
			},
		}),

		//  Create a new user.
		register: builder.mutation<AuthTokenPair, UserRegistration>({
			query: (userData) => ({
				method: 'POST',
				url: 'auth/register/',
				data: userData,
			}),
			onQueryStarted: onObtainTokenPairQueryStarted,
		}),

		//  Validate a new user.
		validateEmail: builder.mutation<UserLookupFields, UserLookupFields>({
			query: ({ email }) => ({
				method: 'POST',
				url: 'auth/register/validate/',
				data: { email },
			}),
			transformErrorResponse: (error: { data: any }) => ({ message: error.data.email['0'] }),
		}),
	}),
})

export const { useAuthenticateQuery, useLoginMutation, useRegisterMutation, useValidateEmailMutation } = authApi
export default authApi
