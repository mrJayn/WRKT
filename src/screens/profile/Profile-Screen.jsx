import { Text, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@components';

const ProfileScreen = () => {
	const nav = useNavigation();

	return (
		<Screen style={{ alignItems: 'center' }}>
			<Text>Michael Jayne</Text>
			<Text>m63jayne2gmail.com</Text>
			<Text>Password</Text>
			<Button title='Some Profile' onPress={() => nav.navigate('ProfileDetail', { profileId: 1 })} />
			<Pressable
				style={{ position: 'absolute', top: 0, right: 0, padding: 10, shadowColor: '#888', shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, backgroundColor: '#888', borderRadius: 999 }}
				onPress={() => nav.navigate('ProfileDetail', { profileId: 1 })}>
				<Ionicons name='pencil' size={32} color='white' />
			</Pressable>
		</Screen>
	);
};

const styles = StyleSheet.create({});

export default ProfileScreen;
