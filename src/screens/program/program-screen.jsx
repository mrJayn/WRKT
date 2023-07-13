import { Text, View, StyleSheet, ScrollView } from 'react-native';

const Section = ({ name, blocks = 1 }) => {
	return (
		<View style={styles.tableContainer}>
			<Text style={styles.titleRow}>{name}</Text>
			<View style={styles.sectionsContainer}>
				{Array.from({ length: blocks }).map((_, i) => (
					<View key={`${name}-block-${i}`} style={styles.tableSection}>
						<View style={styles.headerRow}>
							<Text style={{ flex: 1 }}>Exercise</Text>
							<Text>Set x Rep</Text>
							<Text>%</Text>
							<Text>wgt.</Text>
						</View>
						<View style={styles.tableContent}>
							<Text>{name} DATA</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

const Full_Ts_Table = ({}) => {
	return (
		<ScrollView horizontal>
			<View style={styles.full_table}>
				<Section name='T1a' blocks={3} />
				<Section name='T2a' blocks={1} />
				<Section name='T1b' blocks={3} />
				<Section name='T2b' blocks={1} />
			</View>
		</ScrollView>
	);
};

const ProgramScreen = () => {
	return (
		<ScrollView style={styles.screen}>
			<Full_Ts_Table />
			<Full_Ts_Table />
			<Full_Ts_Table />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: { padding: 10 },
	full_table: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 20 },
	tableContainer: { height: 350, flexDirection: 'column', padding: 5 },
	titleRow: { width: '50%', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
	sectionsContainer: { height: '100%', flexDirection: 'row' },
	tableSection: { height: '100%', width: 225, padding: 5 },
	headerRow: {
		flexDirection: 'row',
		width: '100%',
		padding: 5,
		columnGap: 10,
	},
	tableContent: { flex: 1, padding: 5, borderWidth: 1, borderRightColor: '#0000', borderRadius: 5 },
});
export default ProgramScreen;
