import * as SecureStore from 'expo-secure-store';
/*	
	SET		>>	SecureStore.setItemAsync(key, value, options)
	GET		>>	SecureStore.getItemAsync(key, options)
	DELETE	>>	SecureStore.deleteItemAsync(key, options)
*/

export async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

export async function get_value_for(key) {
	let res;
	try {
		res = await SecureStore.getItemAsync(key);
	} catch {
		res = 'No values stored under that key.';
	}
	return res;
}
