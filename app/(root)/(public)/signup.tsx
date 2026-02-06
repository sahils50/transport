// import ActionButton from "@/components/actionbutton";
import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "@/components/ActionButton";


export default function Signup() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <Text className="text-2xl font-bold text-gray-800 mt-6 ml-10">Secure SignUp for Owner</Text>
      <Text className=" font-medium mb-2 mt-8">
            Full Name*
          </Text>
          <TextInput
            placeholder="Enter your full name"
            keyboardType="ascii-capable"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
          />
          <Text className="font-medium mb-2">Email Address*</Text>
          <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4"/>

          <Text className=" font-medium mb-2">
            Business Name*
          </Text>
          <TextInput
            placeholder="Enter your business name"
            keyboardType="ascii-capable"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
          />

          <Text className=" font-medium mb-2">
            Phone Number
          </Text>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
          />
          
          <Text className=" font-medium mb-2">
            Password*
          </Text>
          <TextInput
            placeholder="Create strong password"
            keyboardType="ascii-capable"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
          />

          <ActionButton label="Create Account" onPress={()=> router.push("../(public)/profilephoto")}/>
          <Text className="text-gray-700 font-medium mt-4 mx-auto">Already have an acoount? {" "}
          <Text className="text-orange-400"
          onPress={()=>router.push('../(public)') }>Login</Text>
          </Text>
    </SafeAreaView>
  )
}
