import type { ComponentType } from 'react'

export default <TProps>(component: ComponentType<TProps>): string => {
	return component.displayName || component.name || 'Component'
}
