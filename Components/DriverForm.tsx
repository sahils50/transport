import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "@expo/vector-icons/Feather";

type DriverFormProps = {
  form: {
    name: string;
    phone: string;
    altPhone: string;
    licenseNumber: string;
    licenseType: string;
    licenseExpiry: string;
  };
  errors: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

export default function DriverForm({
  form,
  errors,
  onChange,
}: DriverFormProps) {
  const [showDatePicker, setShowDatePicker] =
    useState(false);

  return (
    <View className="mt-4">
      {/* DRIVER DETAILS */}
      <Section title="Driver Details">
        <Input
          label="Driver Full Name"
          value={form.name}
          onChangeText={(v) => onChange("name", v)}
          error={errors.name}
        />

        <Input
          label="Phone Number"
          value={form.phone}
          onChangeText={(v) => onChange("phone", v)}
          error={errors.phone}
          keyboardType="number-pad"
        />

        <Input
          label="Alternative Phone Number (optional)"
          value={form.altPhone}
          onChangeText={(v) => onChange("altPhone", v)}
          keyboardType="number-pad"
        />
      </Section>

      {/* LICENSE */}
      <Section title="License And Identity">
        <Input
          label="Driving License Number"
          value={form.licenseNumber}
          onChangeText={(v) =>
            onChange("licenseNumber", v)
          }
          error={errors.licenseNumber}
        />

        {/* LICENSE TYPE */}
        <View className="mb-3">
          <Text className="text-sm font-medium mb-1">
            License Type
          </Text>

          <View
            className={`border rounded-lg ${
              errors.licenseType
                ? "border-red-500"
                : "border-orange-300"
            }`}
          >
            <Picker
              selectedValue={form.licenseType}
              onValueChange={(v) =>
                onChange("licenseType", v)
              }
            >
              <Picker.Item
                label="Select License Type"
                value=""
              />
              <Picker.Item
                label="HMV (Heavy Motor Vehicle)"
                value="HMV"
              />
              <Picker.Item
                label="LMV (Light Motor Vehicle)"
                value="LMV"
              />
            </Picker>
          </View>

          {errors.licenseType && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.licenseType}
            </Text>
          )}
        </View>

        {/* LICENSE EXPIRY DATE */}
        <View className="mb-3">
          <Text className="text-sm font-medium mb-1">
            License Expiry Date
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
            className={`flex-row items-center justify-between
              border rounded-lg px-4 py-3
              ${
                errors.licenseExpiry
                  ? "border-red-500"
                  : "border-orange-300"
              }`}
          >
            <Text
              className={
                form.licenseExpiry
                  ? "text-black"
                  : "text-gray-400"
              }
            >
              {form.licenseExpiry || "dd-mm-yyyy"}
            </Text>

            <Feather
              name="calendar"
              size={20}
              color="gray"
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={
                form.licenseExpiry
                  ? new Date(
                      form.licenseExpiry
                        .split("-")
                        .reverse()
                        .join("-")
                    )
                  : new Date()
              }
              mode="date"
              minimumDate={new Date()}
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);

                if (selectedDate) {
                  const dd = String(
                    selectedDate.getDate()
                  ).padStart(2, "0");
                  const mm = String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0");
                  const yyyy =
                    selectedDate.getFullYear();

                  onChange(
                    "licenseExpiry",
                    `${dd}-${mm}-${yyyy}`
                  );
                }
              }}
            />
          )}

          {errors.licenseExpiry && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.licenseExpiry}
            </Text>
          )}
        </View>
      </Section>
    </View>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="bg-orange-50 rounded-xl p-4 mb-4">
      <Text className="font-bold text-orange-600 mb-3">
        {title}
      </Text>
      {children}
    </View>
  );
}

function Input({
  label,
  value,
  onChangeText,
  error,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  keyboardType?: any;
}) {
  return (
    <View className="mb-3">
      <Text className="text-sm font-medium mb-1">
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        className={`border rounded-lg px-4 py-3 ${
          error
            ? "border-red-500"
            : "border-orange-300"
        }`}
      />

      {error && (
        <Text className="text-red-500 text-xs mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
