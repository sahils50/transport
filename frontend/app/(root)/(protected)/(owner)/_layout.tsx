import { HapticTab } from "@/Components/haptic-tab";
import CustomHeader from "@/Components/Header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs } from "expo-router";

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
              showBell={true}
              onBellPress={() =>
                router.push("/(root)/(protected)/(owner)/Notification")
              }
              showAvatar={true}
              onAvatarPress={() =>
                router.push("/(root)/(protected)/(owner)/Profile")
              }
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
              showBack={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="DriverProfileScreen"
        options={{
          href: null,
          title: "Driver Profle",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Driver Profile"
              showBack={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="edit-driver"
        options={{
          href: null,
          title: "Edit Driver Detail",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Edit Driver Detail"
              showBack={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-driver"
        options={{
          href: null,
          title: "Add Driver",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Add Driver "
              showBack={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreateTrip"
        options={{
          href: null,
          title: "Create Trip",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Create Trip "
              showBack={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ApproveExpenses"
        options={{
          href: null,
          title: "Approve Expenses",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Approve Expenses"
              showBack={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ExpenseBreakdown"
        options={{
          href: null,
          title: "ExpenseBreakdown",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="ExpenseBreakdown"
              showBack={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfitAnalysis"
        options={{
          href: null,
          title: "ProfitAnalysis",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="ProfitAnalysis"
              showBack={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Notification"
        options={{
          href: null,
          title: "Notification",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Notification"
              showBack={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          href: null,
          title: "Profile",
          headerShown: true,
          header: () => (
            <CustomHeader variant="default" title="Profile" showBack={true} />
          ),
        }}
      />

      <Tabs.Screen
        name="EditProfile"
        options={{
          href: null,
          title: "EditProfile",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="EditProfile"
              showBack={true}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="EditPasswrd"
        options={{
          href: null,
          title: "EditPasswrd",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="EditPasswrd"
              showBack={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="DelayTrip"
        options={{
          href: null,
          title: "DelayTrip",
          headerShown: true,
          header: () => (
            <CustomHeader variant="default" title="DelayTrip" showBack={true} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-vehicle"
        options={{
          href: null,
          title: "Add Driver",
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="default"
              title="Add Vehicle "
              showBack={true}
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
          header: () => <CustomHeader title="Trips" />,
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
