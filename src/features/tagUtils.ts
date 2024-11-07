/**
 * RTK query tag descriptor methods used to provide or invalidate cached data.
 * docs -> https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags
 */
import { TagDescription } from '@reduxjs/toolkit/query'
import type { ApiTagType } from './API'

type ResultBase = { id: number | string }

type TagDescriptorsFn<Result> = <TResult extends Result, TTag extends ApiTagType>(
	result: TResult | undefined,
	tagType: TTag
) => readonly TagDescription<TTag>[]

/** Returns the provided tag descriptors for a LIST result. */
function providesList<R extends ResultBase[], T extends ApiTagType>(result: R | undefined, tagType: T) {
	return result
		? [{ type: tagType, id: 'LIST' }, ...result.map((item) => ({ type: tagType, id: item.id }))]
		: [{ type: tagType, id: 'LIST' }]
}

/** Returns the provided tag descriptors for a DETAIL result. */
function providesDetail<R extends ResultBase, T extends ApiTagType>(result: R, tagType: T) {
	return result ? [{ type: tagType, id: result.id }] : []
}

/** Returns the invalidated tag descriptors for a LIST result . */
function invalidateList<T extends ApiTagType>(tagType: T) {
	return [{ type: tagType, id: 'LIST' as const }]
}

/** Returns the invalidated tag descriptors for a DETAIL result. */
function invalidateById<R extends ResultBase, T extends ApiTagType>({ id }: R, tagType: T) {
	return [{ type: tagType, id }]
}

//

/**
 * Returns the provided tag descriptors for a LIST result.
 */
const getListTags: TagDescriptorsFn<ResultBase[]> = (result, tagType) => {
	return result
		? [{ type: tagType, id: 'LIST' }, ...result.map((item) => ({ type: tagType, id: item.id }))]
		: [{ type: tagType, id: 'LIST' }]
}

/**
 * Returns the provided tag descriptors for a DETAIL result.
 */
const getDetailTags: TagDescriptorsFn<ResultBase> = (result, tagType) => {
	return result ? [{ type: tagType, id: result.id }] : []
}

/**
 * Returns the tag descriptors based on a given result type.
 */
function getTagDescriptors<R extends ResultBase | ResultBase[], T extends ApiTagType>(
	result: R,
	tagType: T,
	resultType: 'list' | 'detail'
) {
	if (resultType === 'list') {
		// list result
		return result
			? [{ type: tagType, id: 'LIST', ...(result as ResultBase[]).map((item) => ({ type: tagType, id: item.id })) }]
			: [{ type: tagType, id: 'LIST' }]
	}

	// detail result
	return result ? [{ type: tagType, id: (result as ResultBase).id }] : []
}

export { providesList, getTagDescriptors }
