import { Text } from 'react-native';

export default function P({ children, ...props }) {
	return (
		<Text style={{ fontSize: 17 }} {...props}>
			{children}
		</Text>
	);
}
