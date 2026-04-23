import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Linking } from "react-native";
import { Driver } from "@/src/types/admin/driver";
export type PopupType = "CALL" | "WHATSAPP" | null;
type ActionPopupProps = {
  visible: boolean;
  type: PopupType;
  driver: Driver | null;
  onClose: () => void;
};
export default function ActionPopup({
  visible,
  type,
  driver,
  onClose,
}: ActionPopupProps) {
  if (!visible || !driver || !type) return null;
  const handleCall = () => {
    Linking.openURL(`tel:${driver.driver_phone_no1}`);
    onClose();
  };
  const handleWhatsApp = () => {
    const phone = driver.driver_phone_no1.replace("+", "");
    const source = driver.source || "Unknown Location";
    const dest = driver.destination || "Unknown Destination";

    const message = `Regarding Trip (${source} → ${dest})`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
    onClose();
  };

  return (
    <View className="absolute inset-0 bg-black/40 justify-center items-center px-6 z-50">
      <View className="bg-white w-full rounded-2xl p-6">
        {/* ICON */}
        <View className="items-center mb-3">
          <View className="w-14 h-14 rounded-full bg-orange-100 items-center justify-center">
            <Feather
              name={type === "CALL" ? "phone-call" : "message-circle"}
              size={26}
              color="orange"
            />
          </View>
        </View>
        <Text className="text-lg font-bold text-center">
          {type === "CALL" ? "Call Driver" : "WhatsApp Driver"}
        </Text>
        <Text className="text-gray-500 text-center mt-2">
          {type === "CALL"
            ? "This will open your phone dialer to call the driver."
            : "This will open WhatsApp with pre-filled trip details."}
        </Text>
        <View className="flex-row gap-4 mt-6">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg items-center"
            onPress={onClose}
          >
            <Text className="font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-orange-500 py-3 rounded-lg items-center"
            onPress={type === "CALL" ? handleCall : handleWhatsApp}
          >
            <Text className="font-semibold text-white">
              {type === "CALL" ? "Call" : "Open WhatsApp"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
