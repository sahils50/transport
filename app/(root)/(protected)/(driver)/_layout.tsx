import { HapticTab } from "@/components/haptic-tab";
import CustomHeader from "@/components/Header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs } from "expo-router";

export default function DriverLayout() {
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
              variant="title-only"
              title="Today's Trips"
              showBack={false}
              showBell={true}
              onBellPress={() => router.push("/Notification")}
              showAvatar={true}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddExpense"
        options={{
          href: null,
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="title-only"
              title="Add Expense"
              showBack={true}
              showBell={true}
              onBellPress={() => router.push("/Notification")}
              showAvatar={true}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ContactOwner"
        options={{
          href: null,
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="title-only"
              title="Contact Owner"
              showBack={true}
              showBell={true}
              onBellPress={() => router.push("/Notification")}
              showAvatar={true}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          href: null,
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="title-only"
              title="Notifications"
              showBack={true}
              showBell={false}
              onBellPress={() => router.push("/Notification")}
              showAvatar={false}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TripScreen"
        options={{
          title: "Trip",
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
              variant="title-only"
              title="My Trip"
              showBack={false}
              showBell={true}
              onBellPress={() => router.push("/Notification")}
              showAvatar={true}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ExpenseScreen"
        options={{
          title: "Expense",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cash-multiple"
              size={24}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="title-only"
              title="Expense"
              showBack={false}
              showBell={true}
              onBellPress={() => router.push("/Notification")}
              showAvatar={true}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="title-only"
              title="Account"
              showBack={false}
              showBell={true}
              onBellPress={() => router.push("/Notification")}
              showAvatar={true}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ExpenseDetails"
        options={{
          href: null,
          headerShown: true,
          header: () => (
            <CustomHeader
              variant="title-only"
              title="ExpenseDetails"
              showBack={true}
              showBell={false}
              onBellPress={() => router.push("/Notification")}
              showAvatar={false}
              onAvatarPress={() => router.push("/ProfileScreen")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
