import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, router } from "expo-router";

/* ---------------- MOCK DATA (API READY) ---------------- */

const DRIVER_PROFILE = {
  id: "1",
  name: "Ramesh Kumar",
  phone: "8877698543",
  altPhone: "9876543210",
  status: "OnTrip",
  vehicleNumber: "MH12 AB 2345",

  licenseNumber: "MH11 CX 777555555",
  licenseType: "HMV", // ✅ aligned
  licenseExpiry: "12-05-2027", // ✅ aligned

  username: "8877698543",
  businessCode: "TRANSA2026",
};

/* ---------------- SCREEN ---------------- */

export default function DriverProfileScreen() {
  const { driverId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        className="px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View className="items-center mt-6">
          <View className="w-20 h-20 rounded-full bg-orange-100 items-center justify-center">
            <MaterialIcons
              name="person"
              size={40}
              color="orange"
            />
          </View>

          <Text className="text-xl font-bold mt-2">
            {DRIVER_PROFILE.name}
          </Text>

          <Text className="text-gray-500">
            +91 {DRIVER_PROFILE.phone}
          </Text>

          <View className="mt-2 px-4 py-1 rounded-full bg-green-100">
            <Text className="text-green-700 font-semibold">
              {DRIVER_PROFILE.status}
            </Text>
          </View>
        </View>

        {/* DRIVER DETAILS */}
        <Section title="Driver Details">
          <Info label="Full Name" value={DRIVER_PROFILE.name} />
          <Info
            label="Phone Number"
            value={`+91 ${DRIVER_PROFILE.phone}`}
          />
          {DRIVER_PROFILE.altPhone && (
            <Info
              label="Alternate Phone"
              value={`+91 ${DRIVER_PROFILE.altPhone}`}
            />
          )}
        </Section>

        {/* LICENSE */}
        <Section title="License & Identity">
          <Info
            label="License Number"
            value={DRIVER_PROFILE.licenseNumber}
          />

          <Info
            label="License Type"
            value={
              DRIVER_PROFILE.licenseType === "HMV"
                ? "HMV (Heavy Motor Vehicle)"
                : "LMV (Light Motor Vehicle)"
            }
          />

          <Info
            label="Expiry Date"
            value={DRIVER_PROFILE.licenseExpiry}
          />

          <TouchableOpacity className="flex-row items-center gap-2 mt-2">
            <Feather
              name="image"
              size={18}
              color="orange"
            />
            <Text className="text-orange-600 font-semibold">
              View License Photo
            </Text>
          </TouchableOpacity>
        </Section>

        {/* VEHICLE */}
        {DRIVER_PROFILE.vehicleNumber && (
          <Section title="Assigned Vehicle">
            <View className="flex-row items-center gap-2">
              <Feather
                name="truck"
                size={18}
                color="orange"
              />
              <Text className="font-semibold text-orange-700">
                {DRIVER_PROFILE.vehicleNumber}
              </Text>
            </View>
          </Section>
        )}

        {/* LOGIN INFO */}
        <Section title="Driver Login Information">
          <Info
            label="Username"
            value={DRIVER_PROFILE.username}
          />
          <Info
            label="Business Code"
            value={DRIVER_PROFILE.businessCode}
          />
        </Section>

        {/* ACTIONS */}
        <View className="flex-row justify-center gap-4 my-6">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname:
                  "../(owner)/edit-driver",
                params: { driverId },
              })
            }
            className="bg-orange-500 px-8 py-3 rounded-lg"
          >
            <Text className="text-white font-bold">
              Edit Driver
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 px-8 py-3 rounded-lg"
            activeOpacity={0.7}
          >
            <Text className="text-white font-bold">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-6 bg-orange-50 rounded-xl p-4">
      <Text className="font-extrabold text-gray-900 text-lg mb-3">
        {title}
      </Text>
      {children}
    </View>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="mb-2">
      <Text className="text-gray-500 text-xs">
        {label}
      </Text>
      <Text className="font-semibold">
        {value}
      </Text>
    </View>
  );
}
