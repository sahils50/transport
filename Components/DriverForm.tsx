import { View, Text, TextInput, TouchableOpacity } from "react-native";

type DriverFormProps = {
  form: {
    name: string;
    phone: string;
    altPhone: string;
    licenseNumber: string;
    licenseType: string;
    licenseExpiry: string;
  };
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
};

export default function DriverForm({
  form,
  onChange,
  onSubmit,
  submitLabel,
}: DriverFormProps) {
  return (
    <View className="mt-4">

      {/* DRIVER DETAILS */}
      <Section title="Driver Details">
        <Input
          label="Driver Full Name"
          value={form.name}
          onChangeText={(v) => onChange("name", v)}
        />
        <Input
          label="Phone Number"
          value={form.phone}
          onChangeText={(v) => onChange("phone", v)}
        />
        <Input
          label="Alternative Phone Number (optional)"
          value={form.altPhone}
          onChangeText={(v) => onChange("altPhone", v)}
        />
      </Section>

      {/* LICENSE */}
      <Section title="License And Identity">
        <Input
          label="Driving License Number"
          value={form.licenseNumber}
          onChangeText={(v) => onChange("licenseNumber", v)}
        />
        <Input
          label="License Type"
          value={form.licenseType}
          onChangeText={(v) => onChange("licenseType", v)}
        />
        <Input
          label="License Expiry Date"
          value={form.licenseExpiry}
          onChangeText={(v) => onChange("licenseExpiry", v)}
        />

        <TouchableOpacity className="mt-3 border border-orange-400 rounded-lg py-3 items-center">
          <Text className="text-orange-500 font-semibold">
            Upload License Photo
          </Text>
        </TouchableOpacity>
      </Section>

      {/* SUBMIT */}
      <TouchableOpacity
        onPress={onSubmit}
        className="bg-orange-500 rounded-xl py-4 mt-6 items-center"
      >
        <Text className="text-white font-bold text-lg">
          {submitLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- SMALL UI PARTS ---------- */

function Section({ title, children }: any) {
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
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
}) {
  return (
    <View className="mb-3">
      <Text className="text-sm font-medium mb-1">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="border border-orange-300 rounded-lg px-4 py-3"
      />
    </View>
  );
}
