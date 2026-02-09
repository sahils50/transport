import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ContactMethod = "call" | "whatsapp" | null;

export default function ContactOwner() {
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Trip data (normally from params / context / store)
  const tripInfo = {
    id: "TR-2024-0123",
    route: "Pune → Mumbai",
    ownerPhone: "+919876543210",
  };

  const whatsappPreMessage = `Regarding Trip-${tripInfo.id} (${tripInfo.route})`;

  const openModal = (method: ContactMethod) => {
    setSelectedMethod(method);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    closeModal();

    if (selectedMethod === "call") {
      try {
        const url = `tel:${tripInfo.ownerPhone}`;
        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url);
        } else {
          Alert.alert("Error", "Cannot open phone dialer");
        }
      } catch {
        Alert.alert("Error", "Failed to open dialer");
      }
    } else if (selectedMethod === "whatsapp") {
      try {
        const url = `whatsapp://send?phone=${tripInfo.ownerPhone}&text=${encodeURIComponent(
          whatsappPreMessage,
        )}`;
        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url);
        } else {
          Alert.alert("WhatsApp not found", "Please install WhatsApp.");
        }
      } catch {
        Alert.alert("Error", "Failed to open WhatsApp");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="mb-6 text-2xl font-semibold text-gray-800 text-center">
          Select Contact Method
        </Text>

        {/* Call Owner */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => openModal("call")}
          className={`mb-3 flex-row items-center rounded-xl border px-4 py-3.5 ${
            selectedMethod === "call"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <View className="mr-3.5 h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            <Ionicons name="call" size={22} color="#f97316" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              Call Owner
            </Text>
            <Text className="mt-0.5 text-sm text-gray-600 leading-5">
              Use for urgent clarification, breakdowns, or immediate decisions
            </Text>
          </View>
        </TouchableOpacity>

        {/* WhatsApp Owner */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => openModal("whatsapp")}
          className={`flex-row items-center rounded-xl border px-4 py-3.5 ${
            selectedMethod === "whatsapp"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <View className="mr-3.5 h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              WhatsApp Owner
            </Text>
            <Text className="mt-0.5 text-sm text-gray-600 leading-5">
              Use for urgent clarification, breakdowns, or immediate decisions
            </Text>
          </View>
        </TouchableOpacity>

        <Text className="mt-6 text-center text-xs text-gray-500">
          Owner will be contacted directly
        </Text>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white px-6 pt-6 pb-10">
            <View className="mb-5 items-center">
              {selectedMethod === "call" ? (
                <Ionicons name="call" size={44} color="#f97316" />
              ) : (
                <Ionicons name="logo-whatsapp" size={44} color="#25D366" />
              )}
            </View>

            <Text className="mb-2 text-xl font-bold text-center text-gray-900">
              {selectedMethod === "call" ? "Call Owner" : "WhatsApp Owner"}
            </Text>

            <Text className="mb-5 text-center text-base text-gray-600 leading-6">
              {selectedMethod === "call"
                ? "This will open your phone dialer to call the owner.\nCall time will be logged in the trip record."
                : "This will open WhatsApp with pre-filled trip details.\nYour message will be:"}
            </Text>

            {selectedMethod === "whatsapp" && (
              <View className="mb-6 rounded-lg bg-gray-100 p-4">
                <Text className="text-base text-gray-800">
                  {whatsappPreMessage}
                </Text>
              </View>
            )}

            <View className="flex-row justify-between gap-3">
              <TouchableOpacity
                onPress={closeModal}
                className="flex-1 items-center rounded-xl border border-gray-300 bg-white py-4"
              >
                <Text className="text-base font-medium text-gray-700">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                className={`flex-1 items-center rounded-xl py-4 ${
                  selectedMethod === "call" ? "bg-orange-500" : "bg-green-600"
                }`}
              >
                <Text className="text-base font-semibold text-white">
                  {selectedMethod === "call" ? "Call" : "Open WhatsApp"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
