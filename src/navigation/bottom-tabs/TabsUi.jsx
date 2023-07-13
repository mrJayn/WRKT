import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from 'twColors';

const getIcon = (name, isFocused) =>
	({
		HomeTab: isFocused ? 'home' : 'home-outline',
		EditorTab: isFocused ? 'build' : 'build-outline',
		ProgramTab: isFocused ? 'calculator' : 'calculator-outline',
	}[name] ?? 'square');

export const TabsUi = ({ state, descriptors, navigation }) => {
	const routeColors = state.routes.map((obj) => obj.params['color']);
	const progress = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(progress.value, [0, 1, 2], routeColors),
	}));

	return (
		<View className='min-h-[80px] bg-red/10 flex-row'>
			{state.routes.map(({ key, name }, idx) => {
				const { title } = descriptors[key].options;
				const isFocused = state.index === idx;
				const fontColor = colors[`nav-font-${isFocused ? '' : 'in'}active`];

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: key,
						canPreventDefault: true,
					});
					if (isFocused || event.defaultPrevented) return;

					navigation.navigate({ name: name, merge: true });
					progress.value = withTiming(idx, { duration: 500 });
				};

				return (
					<TouchableOpacity key={title} className='flex-1 justify-center items-center z-1' accessibilityRole='button' accessibilityState={isFocused ? { selected: true } : {}} onPress={onPress}>
						<Ionicons name={getIcon(name, isFocused)} size={26} color={fontColor} />
						<Text style={{ color: fontColor }}>{title}</Text>
					</TouchableOpacity>
				);
			})}
			<Animated.View className='absolute z-0 top-0 -bottom-1 -inset-x-1' style={[animatedStyle]} />
		</View>
	);
};
