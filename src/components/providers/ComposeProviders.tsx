import type { ComponentType } from 'react'
import type { ChildrenProps } from '@src/types/utils'

type ComposeProvidersProps = ChildrenProps & {
	components: ComponentType<ChildrenProps>[]
}

function ComposeProviders(props: ComposeProvidersProps) {
	return props.components.reduceRight(
		(AccProviders, CurrentProvider) => <CurrentProvider>{AccProviders}</CurrentProvider>,
		props.children
	)
}

ComposeProviders.displayName = 'ComposeProviders'

export default ComposeProviders
