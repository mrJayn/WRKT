import axiosClient, { axiosBase, setAxiosClientAuth } from './axiosClient'
import jwtDecode from 'jwt-decode'
import SecureStore from '@libs/SecureStore'
import { postAPI } from './api-services'

const isTokenExpired = (key) => {
	const { exp } = jwtDecode(key)
	return exp < Date.now() / 1000
}

/**
 *
 * @param {{access:string; refresh:string}} jwt
 * @returns {Promise<void>}
 */
async function updateAuths(jwt) {
	if (!jwt) {
		return
	}
	try {
		await setAxiosClientAuth(jwt.access)
		await SecureStore.save('jwt', JSON.stringify(jwt))
	} catch (e) {
		console.warn(e)
	}
}

/**
 * Returns the securely stored `JWT`.
 * @returns {Promise<{access:string; refresh:string} | null>}
 */
async function getJwtFromStore() {
	const jwt = await SecureStore.get('jwt')
	if (jwt) {
		return JSON.parse(jwt)
	}
	return null
}

/**
 *
 * @param {string} refresh
 * @returns {Promise<{access:string; refresh:string} | undefined>}
 */
async function getTokenFromRefresh(refresh) {
	return await axiosBase
		.post('refresh/', { refresh })
		.then(({ data }) => {
			updateAuths(data)
			return data
		})
		.catch((e) => {
			console.warn(e)
			return
		})
}

/**
 *
 * @returns {Promise<{access: string;refresh: string;} | undefined>}
 */
async function getVerifiedTokens() {
	const jwt = await getJwtFromStore()
	if (!jwt) {
		return // store empty
	}
	if (!isTokenExpired(jwt.access)) {
		await updateAuths(jwt)
		return jwt
	}
	if (isTokenExpired(jwt.refresh)) {
		return // expired
	}
	return await getTokenFromRefresh(jwt.refresh)
}

/**
 * For an unauthorized response, attemp to get a new token pair.
 * @returns {Promise<boolean>} A `boolean` indicating if the token refresh was successful.
 */
async function attempTokenRefresh() {
	const { refresh } = await getJwtFromStore()
	if (!refresh || isTokenExpired(refresh)) {
		return false
	}
	const { data: newJwt } = await axiosBase.post('refresh/', { refresh })
	if (newJwt) {
		await updateAuths(newJwt)
	}
	return Boolean(!!newJwt)
}

/** validate unique user fields  */
/**
 *
 * @param {string} path
 * @param {string} value
 * @returns {Promise<boolean>}
 */
async function validateUnique(path, value) {
	try {
		const response = await axiosClient.post(`validate-unique/${path}/`, { value })
		return Boolean(response.data?.isUnique)
	} catch (e) {
		return false
	}
}

// Sign-In
async function obtainTokenPair(body) {
	const { data } = await postAPI({ url: 'login/', data: body })
	if (data) {
		await updateAuths(data)
		console.log('updatedAuths complete.')
	}
	return data
}

async function blackListToken() {
	const refresh_token = await SecureStore.get('jwt')
	return await postAPI({ url: 'logout/', data: { refresh_token } })
		.then(() => SecureStore.destroy('jwt'))
		.catch((e) => console.log(e))
}

async function register(userRegistration, { fake = false } = {}) {
	return await postAPI({
		url: 'register/',
		data: { ...userRegistration, fake },
	})
}

export { getVerifiedTokens, updateAuths, attempTokenRefresh, validateUnique }
