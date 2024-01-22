import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import logo from '../../assets/images/haba_logo.png';
import avatar from '../../assets/images/avatar.png';
import wallet from '../../assets/images/wallet_icon.png';
import gift from '../../assets/images/gift_icon.png';
import settings from '../../assets/images/settings_icon.png';
import key from '../../assets/images/key_square.png';
import contributions from '../../assets/images/contributions-icon.png';
import returns from '../../assets/images/returns-icon.png';

export default function App() {
	const navigation = useNavigation();

	const [isBalanceHidden, setIsBalanceHidden] = useState(false);
	let balance = 'KES: 100.00';

	const [loaded] = useFonts({
		Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
		Rubik: require('../../assets/fonts/static-Rubik/Rubik-Regular.ttf'),
		Inter: require('../../assets/fonts/static/Inter-Regular.ttf'),
		QuickSand: require('../../assets/fonts/static-quicksand/Quicksand-Regular.ttf'),
	});

	if (!loaded) {
		return null;
	}

	function handlePress() {
		console.log('clicked');
	}
	function renderBanner() {
		return (
			<View style={styles.banner}>
				<View style={styles.bannerImages}>
					<Image
						style={styles.logo}
						source={logo}
					></Image>
					<View>
						<Image
							source={avatar}
							style={styles.avatar}
						/>
					</View>
				</View>
				<View>
					<Text style={[styles.text, { fontWeight: '700' }]}>
						Chama Balance:
					</Text>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						{isBalanceHidden ? (
							<Text style={[styles.text, { fontWeight: 'bold', fontSize: 22 }]}>
								{balance}
							</Text>
						) : (
							<Text style={[styles.text, { fontWeight: 'bold', fontSize: 22 }]}>
								{(balance = 'KES: XXX.XX')}
							</Text>
						)}

						<TouchableOpacity
							onPress={() => setIsBalanceHidden(!isBalanceHidden)}
						>
							<Image
								source={key}
								style={styles.key}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						style={styles.buttons}
						onPress={handlePress}
					>
						<Text
							style={[
								styles.buttonText,
								{ backgroundColor: '#50AF95', color: '#fff' },
							]}
						>
							Top Up
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttons}
						onPress={handlePress}
					>
						<Text style={[styles.buttonText, { backgroundColor: '#D9D9D9' }]}>
							Leave
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	function renderMenu() {
		return (
			<View style={styles.menu}>
				<TouchableOpacity onPress={() => navigation.navigate('UserWallet')}>
					<Image
						source={wallet}
						style={[styles.MenuIcons, { width: 40, height: 40 }]}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('UserGift')}>
					<Image
						source={gift}
						style={styles.MenuIcons}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
					<Image
						source={settings}
						style={[styles.MenuIcons, { width: 40, height: 40 }]}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				{renderBanner()}
				<View style={styles.features}>
					<View style={styles.chamaMembers}>
						<Image
							source={avatar}
							style={styles.currentMemberAvatar}
						/>
						<Image
							source={avatar}
							style={[styles.member, { marginLeft: 10 }]}
						/>
						<Image
							source={avatar}
							style={styles.member}
						/>
						<Image
							source={avatar}
							style={styles.member}
						/>
						<Image
							source={avatar}
							style={styles.member}
						/>
						<Image
							source={avatar}
							style={styles.member}
						/>
						<Text style={styles.memberNumber}>...802 people </Text>
					</View>
					<View>
						<Text style={styles.memberUsername}>@bettyqueen</Text>
					</View>
					<View style={styles.memberAssets}>
						<View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Image
									source={contributions}
									style={styles.assetsIcons}
								/>

								<Text style={styles.assetsText}>Total Contributions</Text>
							</View>
							<View>
								<Text style={styles.assetsAmount}>KES 130K</Text>
							</View>
						</View>
						<View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Image
									source={returns}
									style={styles.assetsIcons}
								/>

								<Text style={styles.assetsText}>Total Returns</Text>
							</View>
							<View>
								<Text style={styles.assetsAmount}>KES 5000</Text>
							</View>
						</View>
					</View>
					<View style={styles.contributionsHistory}>
						<Text style={styles.contributionsHistoryText}>
							Contributions History
						</Text>

						<Text style={styles.latest}>Latest</Text>
					</View>
					<View>
						<Text style={{ marginHorizontal: 31 }}>Contributions</Text>
					</View>
				</View>
			</ScrollView>
			{renderMenu()}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	banner: {
		flex: 0.4,
		width: '100%',
		backgroundColor: '#15133C',
		borderRadius: 30,
		paddingBottom: 25,
	},
	bannerImages: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 42,
	},

	logo: {
		width: 108,
		height: 27.43,
		marginLeft: 39,
	},
	avatar: {
		width: 40,
		height: 40,
		backgroundColor: 'grey',
		borderRadius: 50,
		marginRight: 35,
	},
	text: {
		fontFamily: 'Roboto',
		fontSize: 18,
		color: 'white',
		marginTop: 23,
		left: 35,
	},
	key: {
		width: 30,
		height: 30,
		marginRight: 35,
		marginTop: 25,
	},
	buttons: {
		marginTop: 30,
		marginHorizontal: 34,
		elevation: 15,
	},
	buttonText: {
		fontFamily: 'Inter',
		fontWeight: '700',
		width: 130,
		height: 50,
		textAlign: 'center',
		borderRadius: 20,
		paddingVertical: 13,
	},
	features: {
		flex: 0.5,
	},
	currentMemberAvatar: {
		width: 70,
		height: 70,
		borderRadius: 50,
	},
	chamaMembers: {
		marginTop: 30,
		flexDirection: 'row',
		marginHorizontal: 41,
	},
	member: {
		width: 30,
		height: 30,
		marginTop: 10,
	},
	memberNumber: {
		paddingTop: 20,
		color: '#FF7500',
		fontFamily: 'Inter',
		fontSize: 10,
	},
	memberUsername: {
		alignSelf: 'center',
		fontFamily: 'Rubik',
		fontWeight: '500',
		fontSize: 18,
		color: '#FF7500',
	},
	memberAssets: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
		width: 300,
		marginTop: 10,
	},
	assetsIcons: {
		width: 30,
		height: 30,
		alignSelf: 'center',
		marginVertical: 5,
	},
	assetsText: {
		paddingLeft: 5,
		fontFamily: 'QuickSand',
		fontSize: 12,
		fontWeight: '600',
		color: '#8B98B1',
		lineHeight: 15,
	},
	assetsAmount: {
		marginLeft: 40,
		fontFamily: 'Rubik',
		fontSize: 12,
		fontWeight: '500',
		color: '#50AF95',
		lineHeight: 14.22,
	},
	contributionsHistory: {
		marginTop: 20,
		marginHorizontal: 31,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	contributionsHistoryText: {
		color: '#130138',
		fontFamily: 'Rubik',
		fontWeight: '500',
		fontSize: 18,
		lineHeight: 21,
		letterSpacing: 0.1,
	},
	latest: {
		color: '#50AF95',
		fontFamily: 'QuickSand',
		fontWeight: '500',
		fontSize: 13,
		lineHeight: 16,
		letterSpacing: 0.1,
		textAlign: 'right',
		paddingVertical: 5,
	},
	menu: {
		position: 'absolute',
		bottom: -8,
		flex: 0.1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 100,
		width: 320,
		alignSelf: 'center',
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#D8DCE1',
		borderRadius: 30,
		backgroundColor: '#fff',
		elevation: 15,
		paddingHorizontal: 20,
	},
	MenuIcons: {
		width: 50,
		height: 50,
	},
});
