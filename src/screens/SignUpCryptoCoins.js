import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avalanche from '../Imgs/Avalanche.png';
import Bitcoin from '../Imgs/Bitcoin.png';
import Cosmos from '../Imgs/Cosmos.png';
import Solana from '../Imgs/Solana.png';
import Ethereum from '../Imgs/Ethereum.png';
import Osmosis from '../Imgs/osmosis.png';


const SignUpCryptoCoins = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView>
			<View className="mt-1 "></View>

			<View className="justify-start mt-2 p-4 ">
				<ChevronLeftIcon
					size={30}
					color="#A9A9A9"
				/>
			</View>

			<View className=" p-6 ">
				<Text className="font-bold text-gray-800 mb-6 text-[20px] ">
					Coins{' '}
					<Text
						role="img"
						aria-label="wave"
					>
						{' '}
						👩🏽‍💼
					</Text>
				</Text>
			</View>

			<View className=" relative ">
				<View className="items-center">
					<View className="  ">
						<TouchableOpacity
							className=" absolute top-[110px] -right-[70] "
							onPress={() => navigation.navigate('MarketScreenCrypto')}
						>
							<View className="items-center m-2 ">
								<View className=" bg-[#F7931A] bg-center bg-cover rounded-full  shadow-2xl z-2 shadow-gray-900  ">
									<Image
										source={Bitcoin}
										className="items-center ml-4 mr-4  "
									/>
								</View>
							</View>
						</TouchableOpacity>

						<TouchableOpacity className=" absolute -bottom-[440px] -left-[65px] ">
							<View className="items-center  m-2 ">
								<View className=" bg-[#000000] bg-center bg-cover rounded-b-full rounded-r-full rounded-full p-4 shadow-2xl z-2 shadow-gray-900 h-50 w-50">
									<Image
										source={Solana}
										className="items-center m-1 mt-1 mb-1 h-1/1 w-1/1 "
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate('MarketScreenCrypto')}
					>
						<View className=" items-center  m-2 absolute top-[220px] left-[60px]">
							<View className=" bg-[#2E3148] bg-center bg-cover rounded-b-full rounded-r-full rounded-full p-3 shadow-2xl z-2 shadow-gray-900 ">
								<Image
									source={Cosmos}
									className="items-center"
								/>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						className=""
						onPress={() => navigation.navigate('MarketScreeCrypto')}
					>
						<View className=" items-center  m-2 absolute left-[38px] top-8 ">
							<View className=" bg-[#8A06D4] bg-center bg-cover rounded-full shadow-2xl z-10 shadow-gray-900 ">
								<Image
									source={Avalanche}
									className="items-center ml-4 mr-4 mb-6 mt-2  p-6 h-1/3 w-1/3 shadow-2xl z-2 shadow-gray-900 "
								/>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('MarketScreenCrypto')}
					>
						<View className=" items-center m-2 absolute -top-[0] -left-[150] ">
							<View className=" bg-[#1C1C1C] bg-center bg-cover rounded-full shadow-2xl z-2 shadow-gray-900 ">
								<Image
									source={Ethereum}
									className="items-center ml-6 mr-6 mb-1 mt-1 p-6 h-50 w-50 "
								/>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity>
						<View className=" items-center  m-2 absolute top-[190] right-[32px]">
							<View className=" bg-[#312755] bg-center bg-cover rounded-full m-2 shadow-2xl z-2 shadow-gray-900 hover:border-2 hover:border-[#50AF95] hover:border-rounded-full">
								<Image
									source={Osmosis}
									className="items-center justify-center ml-1 mr-1 mb-1 mt-1  "
								/>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</View>

			<View className="absolute -bottom-[520px] justify-center rounded-full shadow-2xl z-2 shadow-gray-900 bg-[#50AF95] p-2 w-[300px] align-center ml-8">
				<TouchableOpacity onPress={() => navigation.navigate('SignUpTime')}>
					<Text className=" text-bold text-white text-lg text-center ">
						Continue
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SignUpCryptoCoins;
