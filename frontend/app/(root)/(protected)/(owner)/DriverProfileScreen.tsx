import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getDriverById } from "@/src/api/ownerService"; // Ensure this function exists
import { useAuthStore } from "@/src/store/useAuthStore";

export default function DriverProfileScreen() {
  const { driverId } = useLocalSearchParams();
  console.log("Current Driver ID from Params:", driverId);
  const token = useAuthStore((state) => state.token);

  // 1. Fetch real data using the driverId from params
  const {
    data: driver,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["driver", driverId],
    queryFn: async () => {
      console.log("Fetching for ID:", driverId); // DEBUG 2
      return getDriverById(Number(driverId));
    },
    enabled: !!driverId,
  });

  if (error) console.log("Query Error:", error);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="mt-2 text-gray-500">Loading Profile...</Text>
      </View>
    );
  }

  if (error || !driver) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 font-bold text-lg text-center">
          Failed to load driver profile.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-orange-500 px-6 py-2 rounded-lg"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View className="items-center mt-6">
          <View className="w-20 h-20 rounded-full bg-orange-100 items-center justify-center">
            {driver.profile_picture_url ? (
              // You can add an Image component here if you have a URL
              <MaterialIcons name="person" size={40} color="orange" />
            ) : (
              <MaterialIcons name="person" size={40} color="orange" />
            )}
          </View>

          <Text className="text-xl font-bold mt-2">{driver.driver_name}</Text>
          <Text className="text-gray-500">+91 {driver.driver_phone_no1}</Text>
        </View>

        {/* DRIVER DETAILS */}
        <Section title="Driver Details">
          <Info label="Full Name" value={driver.driver_name} />
          <Info label="Phone Number" value={`+91 ${driver.driver_phone_no1}`} />
          {driver.driver_phone_no2 && (
            <Info
              label="Alternate Phone"
              value={`+91 ${driver.driver_phone_no2}`}
            />
          )}
          <Info
            label="Account Status"
            value={driver.is_active ? "Active" : "Inactive"}
          />
        </Section>

        {/* LICENSE */}
        <Section title="License & Identity">
          <Info
            label="License Number"
            value={driver.driver_license_no || "N/A"}
          />
          <Info
            label="License Type"
            value={
              driver.driver_license_type === "HMV"
                ? "HMV (Heavy Motor Vehicle)"
                : driver.driver_license_type || "N/A"
            }
          />
          <Info
            label="Expiry Date"
            value={driver.license_expiry || "Not Provided"}
          />

          <TouchableOpacity className="flex-row items-center gap-2 mt-2">
            <Feather name="image" size={18} color="orange" />
            <Text className="text-orange-600 font-semibold">
              View License Photo
            </Text>
          </TouchableOpacity>
        </Section>

        {/* VEHICLE */}
        <Section title="Assigned Vehicle">
          <View className="flex-row items-center gap-2">
            <Feather name="truck" size={18} color="orange" />
            <Text className="font-semibold text-orange-700">
              {driver.vehicleNumber || "No Vehicle Assigned"}
            </Text>
          </View>
        </Section>

        {/* ACTIONS */}
        <View className="flex-row justify-center gap-4 my-8">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "./(owner)/edit-driver",
                params: { driverId },
              })
            }
            className="flex-1 bg-orange-500 py-4 rounded-xl items-center shadow-sm"
          >
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-red-50 py-4 rounded-xl items-center border border-red-200"
            activeOpacity={0.7}
          >
            <Text className="text-red-600 font-bold">Deactivate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-6 bg-orange-50/50 rounded-2xl p-4 border border-orange-100">
      <Text className="font-extrabold text-gray-900 text-base mb-3 uppercase tracking-wider">
        {title}
      </Text>
      {children}
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-3">
      <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">
        {label}
      </Text>
      <Text className="font-semibold text-gray-800 text-sm">{value}</Text>
    </View>
  );
}
