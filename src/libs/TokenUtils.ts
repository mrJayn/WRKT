import { isNull, isObject, isString } from 'lodash'
import jwtDecode, { type JwtPayload } from 'jwt-decode'
import CONST from '@src/CONST'
import CONFIG from '@src/CONFIG'
import ROUTES from '@src/ROUTES'
import * as SecureStore from '@libs/SecureStore'
import axiosClient, { setAxiosClientAuthHeaders } from '@features/API/axiosClient'
import type { AuthTokenPair, AuthToken } from '@features/auth/types'

/**
 * Type predicate for `TokenPair`.
 */
function isTokenPair(arg: any): arg is AuthTokenPair {
	return (
		isObject(arg) && !isNull(arg) && 'access' in arg && isString(arg.access) && 'refresh' in arg && isString(arg.refresh)
	)
}

/**
 * Check if a token is expired.
 */
function isTokenExpired(token: AuthToken) {
	const { exp } = jwtDecode<JwtPayload>(token)
	return !!exp && exp < Date.now() / 1000
}

/**
 * Get the "auth-token-pair" secure store value.
 */
async function getSavedTokenPair(): Promise<AuthTokenPair | undefined> {
	return await SecureStore.get(CONST.SECURE_KEYS.AUTH_TOKEN_PAIR).then((value) => {
		if (!value) {
			return
		}
		const tokenPair = JSON.parse(value)
		if (!isTokenPair(tokenPair)) {
			return
		}
		return tokenPair
	})
}

/**
 * Takes a token pair and sets the authorization header for the `axiosClient`,
 * and updates the "auth-token-pair" secure store value.
 */
async function setAuthTokenPair(tokenPair: AuthTokenPair) {
	setAxiosClientAuthHeaders(tokenPair.access)
	await SecureStore.save(CONST.SECURE_KEYS.AUTH_TOKEN_PAIR, tokenPair)
}

/**
 * Unset authorization header for the `axiosClient` and destroy the "auth-token-pair" secure store value.
 */
async function removeTokenPair() {
	setAxiosClientAuthHeaders(undefined)
	await SecureStore.destroy(CONST.SECURE_KEYS.AUTH_TOKEN_PAIR)
}

/**
 * Method to obtain a new token pair from a given refresh token.
 */
async function refreshTokenPair(refresh: AuthToken): Promise<AuthTokenPair | undefined> {
	return axiosClient({
		method: 'POST',
		url: `${CONFIG.BASE_URL}api/refresh/`,
		data: { refresh },
	})
		.then((response) => (isTokenPair(response.data) ? response.data : undefined))
		.catch(() => undefined)
}

/**
 * Method to get a valid token pair for the current user
 * from either the secure store or a refresh call.
 */
async function getTokenPair(): Promise<AuthTokenPair | undefined> {
	const tokenPair = await getSavedTokenPair()

	if (!tokenPair) {
		return // A saved token pair does not exist
	}
	if (!isTokenExpired(tokenPair.access)) {
		await setAuthTokenPair(tokenPair)
		return tokenPair // The current token pair is valid
	}
	if (isTokenExpired(tokenPair.refresh)) {
		return // The token pair has expired
	}
	// Use the refresh token to request a new token pair.
	const refreshResult = await refreshTokenPair(tokenPair.refresh)
	if (refreshResult) {
		await setAuthTokenPair(refreshResult)
	}
	return refreshResult
}

function getUserIdFromToken(accessToken: AuthToken) {
	const result = jwtDecode(accessToken)
	if (isObject(result) && 'user_id' in result) {
		return result.user_id
	}
}

export { getTokenPair, setAuthTokenPair, getUserIdFromToken }
