import { useEffect, useLayoutEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { EXERCISES_PATH } from '@config';
import { DUMMY_EDITOR_DATA } from '@data/dummy';
import { Screen, ExercisesList } from '@components';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const FadeingView = ({ children, ...props }) => (
	<Animated.View entering={FadeIn} exiting={FadeOut} {...props}>
		{children}
	</Animated.View>
);

const StyledBtn = ({ className, children, ...onpress }) => (
	<Pressable className={`justify-center items-center bg-grey shadow shadow-black/50 rounded-full ${className}`} {...onpress}>
		{children}
	</Pressable>
);

const Options = ({}) => {
	return (
		<View className='absolute bottom-28 w-4/5 gap-y-5'>
			<StyledBtn className='py-5 w-full bg-grey'>
				<Text className='text-[20px] text-white'>Add Exercise Below</Text>
			</StyledBtn>
			<StyledBtn className='py-5 w-full bg-grey'>
				<Text className='text-[20px] text-white'>Add Exercise Above</Text>
			</StyledBtn>
			<StyledBtn className='py-5 w-full bg-grey'>
				<Text className='text-[20px] text-white'>Add Superset</Text>
			</StyledBtn>
		</View>
	);
};

const OptionsButton = ({ menuOpen, setMenuOpen, highlight }) => {
	const degree = useSharedValue('0deg');
	const animatedIconStyle = useAnimatedStyle(() => {
		return { transform: [{ rotate: `${degree.value}deg` }] };
	});
	const handlePress = () => {
		degree.value = withSpring(menuOpen ? 0 : 135, { damping: 20 });
		setMenuOpen(!menuOpen);
	};

	return (
		<StyledBtn className='h-full w-full' onPress={handlePress}>
			<Animated.View className='justify-center pl-[3px]' style={[animatedIconStyle]}>
				<Ionicons name='add' size={48} color={menuOpen ? 'red' : 'white'} />
			</Animated.View>
		</StyledBtn>
	);
};

export default function WrktEditorScreen() {
	const nav = useNavigation();
	const { params } = useRoute();
	// DUMMY -- Delete in prod
	const FILTERED_DUMMY_DATA = DUMMY_EDITOR_DATA.filter((ex) => ex.dayid === params.dayid);
	// DUMMY -- Delete in prod
	const [data, setData] = useState(FILTERED_DUMMY_DATA);
	const [isMounted, setIsMounted] = useState(false);
	const [active, setActive] = useState(-1);
	const [menuOpen, setMenuOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		fetch(EXERCISES_PATH)
			.then((res) => res.json())
			.then((json) => setData(json.filter(({ day }) => day === params.dayid)))
			.catch((err) => null);
	}, [refresh]);

	useEffect(() => {
		if (active === -1) setMenuOpen(false);
	}, [active]);

	useLayoutEffect(() => {
		if (!isMounted) return setIsMounted(true);

		nav.setOptions({
			headerRight: () => (
				<Pressable>
					<Text className='text-darkgreen-neon text-[20px] px-3'>SAVE</Text>
				</Pressable>
			),
			headerLeft: () => (
				<Pressable onPress={() => nav.goBack()}>
					<Text className='text-red text-[20px] px-3'>CANCEL</Text>
				</Pressable>
			),
		});
	}, []);

	return (
		<Screen headerTitle={params.name}>
			<ExercisesList data={data} onRefresh={() => setRefresh(!refresh)} editable={true} active={active} setActive={setActive} />
			{/* Add New Exercise Button */}

			{active >= 0 && (
				<FadeingView className={`h-20 aspect-[1/1] z-3 pr-0 absolute bottom-4 right-4 ${data.length === 0 ? 'shadow-red' : ''}`}>
					<OptionsButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} highlight={data.length === 0} />
				</FadeingView>
			)}
			{/* Add New Exercise Button */}
			{menuOpen && (
				<FadeingView className='justify-center items-center absolute -right-3 left-1/4 inset-y-0 z-2'>
					<Options />
				</FadeingView>
			)}
		</Screen>
	);
}
