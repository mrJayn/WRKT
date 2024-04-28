import _ from 'underscore'
import { validateUnique } from '@api/auth'

/** - Usage -
 ```
    const asyncValidationChecker = new AsyncUniqueValidation()
    
 ```
 */

class AsyncUniqueValidation {
	constructor() {
		this.isUnique = true
		this.loading = false
	}

	isInputUnique = () => this.isUnique
	isLoading = () => this.loading

	validateInput = _.debounce(async (value, triggerValidation) => {
		this.loading = true
		this.isUnique = await validateUnique('email', value)
		console.log('validated from API')
		triggerValidation()
		this.loading = false
	}, 1000)
}
