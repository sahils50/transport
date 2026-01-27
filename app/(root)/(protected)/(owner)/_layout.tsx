import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function OwnerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
          height: 56,
          paddingBottom: 4,
        },

        tabBarActiveTintColor: "#111",
        tabBarInactiveTintColor: "#888",

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginBottom: 2,
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="DriverScreen"
        options={{
          title: "Drivers",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-tie"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="VehicleScreen"
        options={{
          title: "Vehicles",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="car-multiple"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TripScreen"
        options={{
          title: "Trips",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-marker-path"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ReportScreen"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
