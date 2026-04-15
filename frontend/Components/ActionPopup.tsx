import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Linking } from "react-native";

/* ---------- TYPES ---------- */

export type PopupType = "CALL" | "WHATSAPP" | null;

type Driver = {
  name: string;
  phone: string;
  source: string;
  destination: string;
};

type ActionPopupProps = {
  visible: boolean;
  type: PopupType;
  driver: Driver | null;
  onClose: () => void;
};

/* ---------- COMPONENT ---------- */

export default function ActionPopup({
  visible,
  type,
  driver,
  onClose,
}: ActionPopupProps) {
  if (!visible || !driver || !type) return null;

  const handleCall = () => {
    Linking.openURL(`tel:${driver.phone}`);
    onClose();
  };

  const handleWhatsApp = () => {
    const phone = driver.phone.replace("+", "");
    const message = `Regarding Trip (${driver.source} → ${driver.destination})`;
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

        {/* TITLE */}
        <Text className="text-lg font-bold text-center">
          {type === "CALL" ? "Call Driver" : "WhatsApp Driver"}
        </Text>

        {/* DESCRIPTION */}
        <Text className="text-gray-500 text-center mt-2">
          {type === "CALL"
            ? "This will open your phone dialer to call the driver."
            : "This will open WhatsApp with pre-filled trip details."}
        </Text>

        {/* MESSAGE PREVIEW */}
        {type === "WHATSAPP" && (
          <View className="bg-gray-100 rounded-lg px-4 py-3 mt-4">
            <Text className="text-gray-700 text-sm">
              Regarding Trip ({driver.source} → {driver.destination})
            </Text>
          </View>
        )}

        {/* BUTTONS */}
        <View className="flex-row gap-4 mt-6">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg items-center"
            onPress={onClose}
          >
            <Text className="font-semibold text-gray-700">
              Cancel
            </Text>
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
