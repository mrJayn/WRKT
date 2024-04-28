import _ from 'lodash'

/**
 * Method to concatenate an array of strings.
 */
function concat(strs: (string | undefined)[], sep: string = ' ') {
	let validStrs = _.map(strs, (v) => String(v))
	return _.join(validStrs, sep)
}

/**
 * Method to remove occurrences of duplicate words in a string.
 */
function removeDuplicates(str: string) {
	return str
		.split(' ')
		.filter((value, index, arr) => !!value && index == arr.indexOf(value))
		.join(' ')
}

/**
 * Method that takes an array of strings parsable values and
 * returns a string with no occurences of duplicate words.
 */
function union(arr: (string | undefined)[], sep = ' ') {
	let strsArr = _.map(arr, (v) => _.split(String(v), sep))
	let uniqStrsArr = _.compact(_.union(...strsArr))
	return _.join(uniqStrsArr, sep)
}

export default { concat, removeDuplicates, union }
