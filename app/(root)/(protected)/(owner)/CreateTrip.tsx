import Drivervehicles from "@/Components/Drivervehicles";
import ExpenseRule from "@/Components/ExpenseRule";
import Review from "@/Components/Review";
import RouteAndDestination from "@/Components/RouteAndDestination";
import Tripschedule from "@/Components/Tripschedule";
import Triptype from "@/Components/Triptype";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onCreate: () => void;
};

const CreateTrip = ({ onCreate }: Props) => {
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
        <Drivervehicles />
        <RouteAndDestination />
        <Triptype />
        <Tripschedule />
        <ExpenseRule />
        <Review
          route={{ from: "Mumbai", to: "Goa" }}
          schedule={new Date("2024-01-01T09:45:00")}
          vehicleNumber="MH-12-AB-1234"
          driverName="Rajesh Kumar"
          estimatedCost={16275}
          expenseLimit={16275}
        />

        <View className="flex-row gap-4 my-6">
          {/* CANCEL */}
          <TouchableOpacity
            activeOpacity={0.7}
            // onPress={() => router.back()}
            className="flex-1 border bg-white border-gray-300 rounded-xl py-4 items-center flex-row justify-center gap-2"
          >
            <Feather name="x" size={20} color="#374151" />
            <Text className="text-gray-700 font-semibold text-lg">Cancel</Text>
          </TouchableOpacity>

          {/* CREATE TRIP */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCreate}
            className="flex-1 bg-orange-500 rounded-xl py-4 items-center flex-row justify-center gap-2"
          >
            <Feather name="check" size={20} color="white" />
            <Text className="text-white font-bold text-lg">Create Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTrip;
