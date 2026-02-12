// import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// export default function Profile() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <ScrollView className="flex-1 bg-gray-100 px-4">
//       {/* Profile Header Card */}
//       <View className="bg-white rounded-2xl p-5 mt-8 shadow-sm flex-row items-center">
//         <View className="w-20 h-20 rounded-full bg-orange-500 justify-center items-center shadow-md">
//           <FontAwesome name="user" size={36} color="white" />
//         </View>

//         <View className="ml-4">
//           <Text className="text-2xl font-bold text-gray-800">Ramesh Kumar</Text>
//           <Text className="text-sm text-gray-500 mt-1">
//             Business Code : RG-1234
//           </Text>
//         </View>
//       </View>

//       {/* Personal Information Card */}
//       <View className="bg-white rounded-2xl p-5 mt-6 shadow-sm">
//         <Text className="text-lg font-semibold text-gray-800 mb-4">
//           Personal Information
//         </Text>

//         {[
//           { label: "Full Name", value: "Ramesh Kumar" },
//           { label: "Phone Number", value: "+91 92764 73833" },
//           { label: "Alternate Phone Number", value: "+91 82764 73833" },
//           { label: "Email", value: "ramesh@gmail.com" },
//           { label: "Business Name", value: "Rahul Logistics" },
//         ].map((item, index) => (
//           <View key={index} className="py-3 border-b border-gray-200">
//             <Text className="text-sm text-gray-500">{item.label}</Text>
//             <Text className="text-base font-medium text-gray-800 mt-1">
//               {item.value}
//             </Text>
//           </View>
//         ))}

//         {/* Password Row */}
//         <View className="py-3 flex-row justify-between items-center">
//           <View>
//             <Text className="text-sm text-gray-500">Password</Text>
//             <Text className="text-base font-medium text-gray-800 mt-1">
//               {showPassword ? "MyPassword123" : "************"}
//             </Text>
//           </View>

//           <TouchableOpacity
//             onPress={() => setShowPassword(!showPassword)}
//             className="p-2"
//           >
//             <Ionicons
//               name={showPassword ? "eye-off-outline" : "eye-outline"}
//               size={22}
//               color="#6B7280"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity className="mt-8 mb-10 bg-red-500 rounded-xl p-4 shadow-md active:opacity-80">
//         <View className="flex-row justify-center items-center">
//           <FontAwesome name="sign-out" size={20} color="white" />
//           <Text className="text-white text-base font-semibold ml-2">
//             Logout
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }



import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export default function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "Ramesh Kumar",
    phone: "+91 92764 73833",
    altPhone: "+91 82764 73833",
    email: "ramesh@gmail.com",
    business: "Rahul Logistics",
    password: "MyPassword123",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      {/* Profile Header */}
      <View className="bg-white rounded-2xl p-5 mt-8 shadow-sm flex-row items-center">
        <View className="w-20 h-20 rounded-full bg-orange-500 justify-center items-center shadow-md">
          <FontAwesome name="user" size={36} color="white" />
        </View>

        <View className="ml-4">
          <Text className="text-2xl font-bold text-gray-800">Edit Profile</Text>
          <Text className="text-sm text-gray-500 mt-1">
            Business Code : RG-1234
          </Text>
        </View>
      </View>

      {/* Form Card */}
      <View className="bg-white rounded-2xl p-5 mt-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </Text>

        {/* Input Fields */}
        {[
          { label: "Full Name", key: "fullName" },
          { label: "Phone Number", key: "phone" },
          { label: "Alternate Phone Number", key: "altPhone" },
          { label: "Email", key: "email" },
          { label: "Business Name", key: "business" },
        ].map((item, index) => (
          <View key={index} className="py-3 border-b border-gray-200">
            <Text className="text-sm text-gray-500">{item.label}</Text>
            <TextInput
              value={(form as any)[item.key]}
              onChangeText={(text) => handleChange(item.key, text)}
              className="text-base font-medium text-gray-800 mt-1"
            />
          </View>
        ))}

        {/* Password Field */}
        {/* Password Field */}
        <View className="py-3 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-500">Password</Text>
            <Text className="text-base font-medium text-gray-800 mt-1">
              ************
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(root)/(protected)/(owner)/EditPasswrd")}
            className="p-2"
          >
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity className="mt-8 mb-10 bg-orange-500 rounded-xl p-4 shadow-md active:opacity-80">
        <View className="flex-row justify-center items-center">
          <Ionicons name="checkmark-circle-outline" size={22} color="white" />
          <Text className="text-white text-base font-semibold ml-2">
            Save Changes
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

