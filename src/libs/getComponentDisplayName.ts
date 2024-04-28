import { ComponentType } from 'react'

export default function getComponentDisplayName<TProps>(component: ComponentType<TProps>): string {
	return component.displayName || component.name || 'Component'
}
