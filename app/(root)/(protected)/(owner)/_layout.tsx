import { HapticTab } from "@/components/haptic-tab";
import CustomHeader from "@/components/Header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function OwnerLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => <HapticTab {...props} />,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="greeting"
              userName="Rahul"
              subtitle="You have 1 trip scheduled today"
            />
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
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Drivers detail"
              showBack = {true}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="DriverProfileScreen"
        options={{
          href: null,
          title: "Driver Profle",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="car-multiple"
              size={24}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Driver Profile"
              showBack = {true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="edit-driver"
        options={{
          href: null,
          title: "Edit Driver Detail",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="car-multiple"
              size={24}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Edit Driver Detail"
              showBack = {true}
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
          headerShown: true,
          header: () => <CustomHeader title="Vechicle Management" />,
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
          headerShown: true,
          header: () => (
            <CustomHeader
             title="Trips"
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