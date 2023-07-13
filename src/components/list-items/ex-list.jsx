import { Text, FlatList, View } from 'react-native';
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from 'twColors';
import P from '../styled/p-tag';
import EditableExercise from './ex-editable';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const ReadOnlyExercise = ({ i, name, set1, set2, set3, weight1, weight2, weight3 }) => {
	return (
		<View className='flex-row p-2 h-[67px] gap-x-1 m-0.5 rounded-xl' style={{ backgroundColor: `${colors.slate[i * 10]}cc` }}>
			<P>{`${i}.`}</P>
			<View className='flex-[0.45]'>
				<P className='font-semibold'>{name}</P>
			</View>
			<View className='flex-[0.35]'>
				<P>{set1}</P>
				{set2 && <P>{set2}</P>}
				{set3 && <P>{set3}</P>}
			</View>
			<View className='flex-[0.2]'>
				{weight1 && <P>{weight1}lbs</P>}
				{weight2 && <P>{weight2}lbs</P>}
				{weight3 && <P>{weight3}lbs</P>}
			</View>
		</View>
	);
};

const ExercisesList = ({ editable, data, onRefresh, active, setActive }) => {
	const EditableRenderItem = (props) => {
		const isActve = active === props.i;
		const activate = () => {
			if (!isActve) setActive(props.i);
		};
		const enableDrag = () => {
			console.log('long press');
			// https://medium.com/@JoeContumelio/react-native-reanimated-v2-how-to-create-a-draggable-fab-floating-action-button-7b9990b0f3bf
		};
		return (
			<TouchableOpacity className={`rounded-lg border-2 z-1 bg-white ${isActve ? 'border-slate-neon' : 'border-transparent'}`} onPress={activate} disabled={isActve}>
				{isActve && (
					<Animated.View className='absolute left-0 w-[44px] h-[44px] border-2 z-5 top-[40%]' enter={FadeIn} exiting={FadeOut}>
						<TouchableOpacity onLongPress={enableDrag}>
							<Ionicons name='menu' size={24} color={colors.slate.neon} />
						</TouchableOpacity>
					</Animated.View>
				)}
				<EditableExercise {...props} />
			</TouchableOpacity>
		);
	};

	return (
		<>
			<View className='w-full flex-row items-center p-2 pl-3 border-b-2 border-b-grey-30 bg-white'>
				<Text style={{ fontWeight: 'bold' }}>{`#.   `}</Text>
				{['EXERCISE', 'SETS x REPS', 'WEIGHT'].map((txt, i) => (
					<Text key={txt} style={{ flex: [0.45, 0.35, 0.2][i], fontWeight: 'bold' }}>
						{txt}
					</Text>
				))}
			</View>
			{data.length === 0 ? (
				<Text className=' self-center p-10 text-center text-[24px] font-semibold text-red'>{editable ? "Doesn't look like there's anything here yet..." : 'Not working out today?'}</Text>
			) : (
				<FlatList
					data={data}
					keyExtractor={(item) => item.name}
					refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
					renderItem={({ item, index }) => {
						item = { i: index, ...item };
						return editable ? <EditableRenderItem {...item} /> : <ReadOnlyExercise {...item} />;
					}}
					className='p-1'
				/>
			)}
		</>
	);
};
export default ExercisesList;
