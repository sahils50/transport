


// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// export default function VehicleScreen() {
//   const [active, setActive] = useState("All");

//   const FilterBtn = ({ title }: { title: string }) => {
//     const isActive = active === title;

//     return (
//       <TouchableOpacity
//         onPress={() => setActive(title)}
//         className={`px-4 py-2 rounded-full border border-orange-500 mr-3 mb-2 ${
//           isActive ? "bg-orange-500" : "bg-white"
//         }`}
//       >
//         <Text
//           className={`font-medium ${isActive ? "text-white" : "text-black"}`}
//         >
//           {title}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View className="p-3 bg-gray-100 flex-1">
//       {/* ---------------- Vehicles Filter Card ---------------- */}
//       <View className="bg-white border border-orange-500 rounded-2xl p-4">
//         <Text className="text-2xl font-bold mb-3">Vehicles</Text>

//         {/* Search */}
//         <View className="flex-row items-center border border-orange-400 rounded-xl px-3 py-2">
//           <Ionicons name="search" size={20} color="gray" />
//           <TextInput
//             placeholder="Search by vehicle number"
//             className="ml-2 flex-1"
//             placeholderTextColor="#777"
//           />
//         </View>

//         <Text className="mt-3 mb-2 text-gray-700">
//           Business Insights & Performance
//         </Text>

//         {/* Filters */}
//         <View className="flex-row flex-wrap">
//           <FilterBtn title="All" />
//           <FilterBtn title="Running" />
//           <FilterBtn title="Idle" />
//           <FilterBtn title="Maintenance" />
//         </View>
//       </View>

//       {/* ---------------- Vehicle Info Card ---------------- */}
//       <View className="bg-white border border-orange-500 rounded-2xl p-4 mt-4">
//         {/* Top Row */}
//         <View className="flex-row justify-between items-center">
//           <View>
//             <Text className="text-xl font-bold">Mh12AB1234</Text>
//             <Text className="text-gray-500 font-medium">Truck</Text>
//           </View>

//           <TouchableOpacity className="bg-orange-500 px-4 py-2 rounded-lg">
//             <Text className="text-white font-semibold">Edit</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Divider */}
//         <View className="border-b border-orange-200 my-3" />

//         {/* Status */}
//         <View className="bg-green-100 self-start px-3 py-1 rounded-full mb-2">
//           <Text className="text-green-800 font-medium">Running</Text>
//         </View>

//         {/* Driver */}
//         <Text className="font-semibold text-base">Ramesh Kumar</Text>

//         {/* Route */}
//         <View className="bg-orange-50 px-3 py-2 rounded-lg mt-2">
//           <Text className="text-base">Pune → Mumbai</Text>
//         </View>

//         {/* Bottom Buttons */}
//         <View className="flex-row justify-around mt-4">
//           <TouchableOpacity className="items-center border border-orange-400 rounded-xl px-6 py-3">
//             <MaterialIcons name="person" size={22} color="#f97316" />
//             <Text className="mt-1">View Vehicle</Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="items-center border border-orange-400 rounded-xl px-6 py-3">
//             <MaterialIcons name="build" size={22} color="#f97316" />
//             <Text className="mt-1">Maintenance</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }


  import React, { useState } from "react";
  import { View, Text, TouchableOpacity, ScrollView } from "react-native";

  type Vehicle = {
    id: number;
    number: string;
    type: string;
    status: "Running" | "Idle" | "Maintenance";
    driver: string;
    route: string;
  };

  const vehicles: Vehicle[] = [
    {
      id: 1,
      number: "MH12AB1234",
      type: "Truck",
      status: "Running",
      driver: "Ramesh Kumar",
      route: "Pune → Mumbai",
    },
    {
      id: 2,
      number: "MH14CD5678",
      type: "Bus",
      status: "Idle",
      driver: "Suresh Patil",
      route: "Nashik → Pune",
    },
    {
      id: 3,
      number: "MH10EF4321",
      type: "Truck",
      status: "Maintenance",
      driver: "Amit Shah",
      route: "Mumbai → Surat",
    },
  ];

  export default function VehiclesScreen() {
    const [active, setActive] = useState<
      "All" | "Running" | "Idle" | "Maintenance"
    >("All");

    const filteredVehicles =
      active === "All" ? vehicles : vehicles.filter((v) => v.status === active);

    return (
      <ScrollView className="flex-1 bg-gray-100 p-3">
        {/* Filter Buttons */}
        <View className="flex-row flex-wrap mb-3">
          {["All", "Running", "Idle", "Maintenance"].map((btn) => {
            const isActive = active === btn;
            return (
              <TouchableOpacity
                key={btn}
                onPress={() => setActive(btn as any)}
                className={`px-4 py-2 mr-2 mb-2 rounded-full border border-orange-500 ${
                  isActive ? "bg-orange-500" : "bg-white"
                }`}
              >
                <Text
                  className={`${
                    isActive ? "text-white" : "text-black"
                  } font-medium`}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Vehicle Cards */}
        {filteredVehicles.map((item) => (
          <View
            key={item.id}
            className="bg-white border border-orange-500 rounded-2xl p-4 mt-2"
          >
            {/* Top Row */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-xl font-bold">{item.number}</Text>
                <Text className="text-gray-500 font-medium">{item.type}</Text>
              </View>

              <TouchableOpacity className="bg-orange-500 px-4 py-2 rounded-lg">
                <Text className="text-white font-semibold">Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="border-b border-orange-200 my-3" />

            {/* Status Badge */}
            <View
              className={`self-start px-3 py-1 rounded-full mb-2 ${
                item.status === "Running"
                  ? "bg-green-100"
                  : item.status === "Idle"
                    ? "bg-yellow-100"
                    : "bg-red-100"
              }`}
            >
              <Text
                className={`font-medium ${
                  item.status === "Running"
                    ? "text-green-800"
                    : item.status === "Idle"
                      ? "text-yellow-800"
                      : "text-red-800"
                }`}
              >
                {item.status}
              </Text>
            </View>

            {/* Driver */}
            <Text className="font-semibold text-base">{item.driver}</Text>

            {/* Route */}
            <View className="bg-orange-50 px-3 py-2 rounded-lg mt-2">
              <Text className="text-base">{item.route}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
