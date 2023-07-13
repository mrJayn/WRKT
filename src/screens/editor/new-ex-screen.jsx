import { useLayoutEffect, useState } from 'react';
import { Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { Screen } from '@components';

const NewExerciseScreen = () => {
	const nav = useNavigation();
	const [name, onChangeName] = useState('');
	const [sets, onSetsChange] = useState('');
	const [wgts, onWgtsChange] = useState('');

	useLayoutEffect(() => {
		nav.setOptions({
			headerTitle: 'Create New Event',
			headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={() => nav.goBack()} />,
		});
	}, []);

	return (
		<Screen>
			<Text>NEW EXERCISE SCREEN</Text>
		</Screen>
	);
};

export default NewExerciseScreen;
