import { debounce } from 'underscore'
import axiosClient from '@features/API/axiosClient'

/** - Usage -
 ```
    const asyncValidationChecker = new AsyncUniqueValidation()
    
 ```
 */

async function validateUnique(path, value) {
	try {
		const response = await axiosClient.post(`validate-unique/${path}/`, { value })
		return Boolean(response.data?.isUnique)
	} catch (e) {
		return false
	}
}

class AsyncUniqueValidation {
	constructor() {
		this.isUnique = true
		this.loading = false
	}

	isInputUnique = () => this.isUnique
	isLoading = () => this.loading

	validateInput = debounce(async (value, triggerValidation) => {
		this.loading = true
		this.isUnique = await validateUnique('email', value)
		console.log('validated from API')
		triggerValidation()
		this.loading = false
	}, 1000)
}
