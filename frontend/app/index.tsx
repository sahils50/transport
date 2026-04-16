import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <ImageBackground
        source={require("../assets/images/welcome.png")}
        className="flex-1 pb-40"
        resizeMode="cover"
      >
        <View className="flex-1 pt-32 items-center  ">
          <Text className="text-white text-2xl font-extrabold ">
            Welcome to
          </Text>
          <Text className="text-white text-5xl font-extrabold   py-2">
            Transport
          </Text>
          <Text className="text-orange-500 text-5xl font-extrabold pb-2">
            Manager
          </Text>
          <Text className="text-white text-2xl font-bold mt-2 ">
            Manage Your Fleet Efficiently
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          className="mx-auto"
          onPress={() => router.push("../(public)/")}
        >
          <LinearGradient
            colors={["#FFA24C", "#FF7A18"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-4 px-28 rounded-lg"
          >
            <Text className="text-white text-xl font-extrabold">
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
}
