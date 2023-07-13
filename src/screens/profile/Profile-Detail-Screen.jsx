import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

const ProfileDetailScreen = () => {
	const route = useRoute();
	const nav = useNavigation();
	const { profileId } = route.params;

	useLayoutEffect(() => {
		nav.setOptions({
			headerLeft: () => <HeaderBackButton tintColor='white' onPress={() => nav.goBack()} />,
		});
	}, []);

	return (
		<View style={styles.screen}>
			<Text>ProfileId: {profileId}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: { flex: 1, padding: 20, alignItems: 'center' },
});

export default ProfileDetailScreen;
