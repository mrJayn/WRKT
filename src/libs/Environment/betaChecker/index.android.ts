import semver from 'semver'

import CONST from '@src/CONST'
import CONFIG from '@src/CONFIG'
import Store from '@features/Store'
import { setIsAppInBeta } from '@features/AppInfo/appInfoSlice'
import type { IsBetaBuild, GithubReleaseJSON } from './types'

let isLastSavedBeta = false

/**
 * Check the GitHub releases to see if the current build is a beta build or production build
 */
function isBetaBuild(): IsBetaBuild {
	return new Promise((resolve) => {
		fetch(CONST.__TEST__GITHUB_RELEASE_URL)
			.then((res) => res.json())
			.then((res: GithubReleaseJSON) => {
				const version = res.tag_name
				const isInBeta = Boolean(!version ? false : semver.gt(CONFIG.VERSION, version))
				Store.dispatch(setIsAppInBeta(isInBeta))
				resolve(isInBeta)
			})
			.catch(() => {
				resolve(isLastSavedBeta)
			})
	})
}

export default {
	isBetaBuild,
}
