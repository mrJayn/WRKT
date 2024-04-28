import { styled } from 'nativewind'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const StyledView = styled(View, 'flex-1')

const bgStyle = 'bg-primary-light dark:bg-primary-dark'
const screenStyles = {
	withBg: bgStyle,
	withPadding: 'p-3',
	isBranch: `p-3 ${bgStyle}`,
	isModal: 'centered p-3 bg-white dark:bg-black',
}

export default function DefaultScreen({ children, ...props }) {
	const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets()

	return (
		<View style={{ flex: 1, paddingTop, paddingBottom }}>
			<StyledView {...props}>{children}</StyledView>
		</View>
	)
}

DefaultScreen.propTypes = {
	children: PropTypes.node,
}
