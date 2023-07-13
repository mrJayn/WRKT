import { Pressable } from 'react-native';

export default function StyledButton({ style = {}, onPress = () => null, children }) {
	return (
		<Pressable
			style={{
				height: 64,
				width: 64,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#444',
				borderRadius: 999,
				zIndex: 1,
				...style,
			}}
			onPress={onPress}>
			{children}
		</Pressable>
	);
}
