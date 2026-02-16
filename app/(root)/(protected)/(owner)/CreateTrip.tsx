import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Drivervehicles from "@/components/Drivervehicles";
import RouteAndDestination from "@/components/RouteAndDestination";




const CreateTrip = () => {
 

  return (
    <SafeAreaView className="flex-1 bg-orange-50 px-4 pt-2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        <Text className="text-gray-600 font-medium text-lg">Trip ID</Text>
        <TextInput
          value="TR-2024-00634"
          editable={false}
          selectTextOnFocus={false}
          className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-200 text-gray-500 mt-3"
        />
        <Text className="text-sm  mt-1 text-gray-500">
          Auto generated on creation
        </Text>
       <Drivervehicles/>
        <RouteAndDestination/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTrip;
