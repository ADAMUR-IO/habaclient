import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import img1 from "../Imgs/confetti-ball.png"

const SignUpBonus = () => {
        const navigation = useNavigation();
    return (
        <SafeAreaView>
            
                <View className=" mt-2 p-4">
                    <ChevronLeftIcon size={30} color="#A9A9A9" className="justify-start" />
                </View>

                <View className="p-6 mt-8">
                <Text className="text-[22px] font-bold text-gray-800 mb-8 ">Congratulations! You get KES 200! <Text className=" text-[#12D18E] ">Unlock another KES 100</Text> </Text>

                <Image  source={img1} className ="ml-16" />

                <Text className="font-bold mt-4 mb-5 " ><Text className="rounded-full bg-[#12D18E] m-2">✔</Text>You signed up and unlocked free KES 200</Text>

                <Text className="font-bold ">
                Invite your chama members and unlock even more free KES 200 or you can skip this step!
                </Text>

                
                </View>

                <View className="absolute -bottom-16 mb-2 justify-center rounded-full bg-[#50AF95] p-2 w-[300px] align-center ml-8">

                <TouchableOpacity
                onPress={() => navigation.navigate("SetPin")}>
                    <Text className=" text-bold text-white text-lg text-center  ">Continue</Text>
                </TouchableOpacity>
                </View>

                <View className="absolute -bottom-32 justify-center rounded-full bg-[#EDF9F2] p-2 w-[300px] align-center ml-8">

                <TouchableOpacity
                onPress={() => navigation.navigate("")}>
                    <Text className=" text-bold text-black text-lg text-center  ">Skip this step</Text>
                </TouchableOpacity>
                </View>

        </SafeAreaView>
    );
};


export default SignUpBonus;