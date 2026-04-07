// import React, { useRef } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { Ionicons } from "@expo/vector-icons";

// type Vehicle = {
//   id: number;
//   latitude: number;
//   longitude: number;
// };

// const vehicles: Vehicle[] = [
//   { id: 1, latitude: 19.076, longitude: 72.8777 },
//   { id: 2, latitude: 19.086, longitude: 72.8877 },
//   { id: 3, latitude: 19.066, longitude: 72.8677 },
//   { id: 4, latitude: 19.096, longitude: 72.8977 },
// ];

// const LiveTripsMap = () => {
//   const mapRef = useRef<MapView>(null);

//   const zoomIn = () => {
//     mapRef.current?.animateCamera({ zoom: 14 });
//   };

//   const zoomOut = () => {
//     mapRef.current?.animateCamera({ zoom: 10 });
//   };

//   return (
//     <View className="mx-4 mt-4 rounded-2xl overflow-hidden border border-gray-300">
//       {/* Header */}
//       <View className="p-3">
//         <View className="flex-row items-center gap-2 mb-2">
//           <Ionicons name="location-outline" size={22} color="orange" />
//           <Text className="text-lg font-semibold">Live Trips</Text>
//         </View>

//         <View className="flex-row justify-between">
//           <Text className="text-gray-600">8 Active Vehicles</Text>
//           <Text className="text-gray-500">Updated 2 min ago</Text>
//         </View>
//       </View>

//       {/* Map */}
//       <View className="h-64">
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: 19.076,
//             longitude: 72.8777,
//             latitudeDelta: 0.1,
//             longitudeDelta: 0.1,
//           }}
//         >
//           {vehicles.map((v) => (
//             <Marker
//               key={v.id}
//               coordinate={{ latitude: v.latitude, longitude: v.longitude }}
//             >
//               <View className="bg-orange-500 w-8 h-8 rounded-full items-center justify-center">
//                 <Text className="text-white font-bold">{v.id}</Text>
//               </View>
//             </Marker>
//           ))}
//         </MapView>

//         {/* Zoom Buttons */}
//         <View className="absolute left-3 top-3 gap-2">
//           <TouchableOpacity
//             onPress={zoomIn}
//             className="bg-white w-8 h-8 rounded-md items-center justify-center shadow"
//           >
//             <Text className="text-lg font-bold">+</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={zoomOut}
//             className="bg-white w-8 h-8 rounded-md items-center justify-center shadow"
//           >
//             <Text className="text-lg font-bold">−</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default LiveTripsMap;
