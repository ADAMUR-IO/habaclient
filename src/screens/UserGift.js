import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ChevronLeftIcon} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import img1 from "../Imgs/Girlchatting.png"


const UserGift = () => {
        const navigation = useNavigation();
    return (
        <SafeAreaView>
            
                <View className=" mt-2 p-4">
                <TouchableOpacity
                    className="  "
                    onPress={() => navigation.navigate("Wallet")}>
                    <ChevronLeftIcon size={30} color="#A9A9A9" />
                </TouchableOpacity>
                </View>

                <View className="p-6 mt-2">
                
                <View>
                <Image  source={img1} className ="justify-center align-center ml-8" ></Image>
                </View>

                <Text className="text-[22px] font-bold text-[#130138] mb-2 ">Invite your chama members and get <Text className=" text-[#FF7500] ">KES 100</Text> </Text>

                <Text className="font-bold text-[#130138]"><Text className="rounded-full m-2">✨</Text>
                Invite your chama members</Text>

                <Text className="font-bold mt-4 mb-2 text-[#130138]" ><Text className="rounded-full m-2">✨</Text>They get KES 200 when they accept your invite</Text>

                
                </View>

                <View className="absolute -bottom-16 mb-2 justify-center rounded-full bg-[#50AF95] p-2 w-[300px] align-center ml-8">

                <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}>
                    <Text className=" text-bold text-white text-lg text-center  ">
                        <Text className="rounded-full  m-2">📧</Text>Share my invite link</Text>
                </TouchableOpacity>
                </View>
                

        </SafeAreaView>
    );
};


export default UserGift;