import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'twColors';
import { CURRENT_USER_PATH } from 'src/config';
import { DUMMY_DAYS_DATA } from '@data/dummy';
import { Screen } from '@components';
import { get_value_for } from '@api/store';

const Day_Item = ({ dayid, name = '', onPress }) => {
	return (
		<TouchableOpacity className='flex-row justify-between items-center w-full my-1 p-5 rounded-lg' style={{ backgroundColor: `${colors.slate[dayid * 10]}cc` }} onPress={onPress}>
			<View className='justify-around'>
				<Text className='italic'>{`Day ${dayid}`}</Text>
				<Text className='flex-1 text-[24px] font-medium text-black'>{name}</Text>
			</View>

			<Ionicons name='chevron-forward' size={24} color='#000' />
		</TouchableOpacity>
	);
};

const EditorScreen = () => {
	const nav = useNavigation();
	const [data, setData] = useState(DUMMY_DAYS_DATA);
	const [refresh, setRefresh] = useState(false);

	const fetchData = async () => {
		const pk = await get_value_for('accessToken');

		fetch(CURRENT_USER_PATH)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setData(json);
			})
			.catch((err) => console.log('erorr--', String(err)));
	};

	useEffect(() => {
		fetchData();
	}, [refresh]);

	return (
		<Screen>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				refreshControl={<RefreshControl refreshing={false} onRefresh={() => setRefresh(!refresh)} />}
				renderItem={({ item, index }) => {
					const { name } = item;
					const dayid = index + 1;
					return <Day_Item dayid={dayid} name={name} onPress={() => nav.navigate('WrktEditor', { dayid, name })} />;
				}}
				className='p-2'
			/>
		</Screen>
	);
};

export default EditorScreen;
