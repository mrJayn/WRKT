/**
 * Utility Type to
 */

import type { Except, Simplify } from 'type-fest'
import type { Maybe as YupMaybe } from 'yup'
import { Day } from '../features'

/**
Create a type that represents either the value or undefined.

Use-cases:
- A request is made and response data  accepts a callback that may either return a value synchronously or may return a promised value.


@category Utility
*/
export type Maybe<T> = T | undefined
