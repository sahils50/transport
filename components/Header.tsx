import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname, useRouter } from "expo-router";
import type { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderVariant =
  | "default" // typical screen: back + title + right icon(s)
  | "greeting" // home/dashboard style: Hi Name + subtitle, no back
  | "simple-back" // back + title, minimal right side
  | "title-only"; // centered title, no back, no right icons

interface CustomHeaderProps {
  variant?: HeaderVariant;
  title?: string;
  subtitle?: string; // e.g. "You have 1 trip scheduled today"
  userName?: string; // for greeting variant
  showBack?: boolean; // force show / hide (highest priority)
  onBackPress?: () => void; // custom back action
  rightIcon?: "bell" | "gear" | "avatar" | "none";
  onRightPress?: () => void;
  rightContent?: React.ReactNode; // fully custom right side (overrides rightIcon)
}

const CustomHeader: FC<CustomHeaderProps> = ({
  variant = "default",
  title = "",
  subtitle = "",
  userName = "User",
  showBack,
  onBackPress,
  rightIcon = "bell",
  onRightPress,
  rightContent,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const canGoBack = router.canGoBack();

  // ────────────────────────────────────────────────
  // Logic: when should we show the back arrow?
  // ────────────────────────────────────────────────
  const shouldShowBack =
    showBack ??
    // Explicit override wins
    // Otherwise: hide on greeting (home) variant
    //            hide if no navigation history
    //            hide on title-only
    (variant !== "greeting" && variant !== "title-only" && canGoBack);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const isGreeting = variant === "greeting";

  return (
    <LinearGradient
      colors={["#fb923c", "#f97316"]} // orange gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ paddingTop: insets.top }}
      className="pb-5 shadow-sm"
    >
      <View className="flex-row items-center justify-between px-4 pt-3">
        {/* LEFT: Back button or spacer */}
        {shouldShowBack ? (
          <TouchableOpacity
            onPress={handleBack}
            className="p-2 -ml-2 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        ) : (
          <View className="w-11" /> // keeps center alignment balanced
        )}

        {/* CENTER: Title or Greeting */}
        <View className="flex-1 items-center px-2">
          {isGreeting ? (
            <View className="items-center">
              <Text
                className="text-white text-2xl font-bold tracking-wide"
                numberOfLines={1}
              >
                Hi, {userName}
              </Text>
              {subtitle ? (
                <Text
                  className="text-white/90 text-base mt-1 text-center"
                  numberOfLines={2}
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>
          ) : (
            <Text
              className="text-white text-xl font-semibold text-center"
              numberOfLines={1}
            >
              {title ||
                pathname.split("/").pop()?.replace(/-/g, " ") ||
                "Screen"}
            </Text>
          )}
        </View>

        {/* RIGHT: Icon, custom content, or spacer */}
        {rightContent ? (
          <View className="p-2 -mr-2">{rightContent}</View>
        ) : rightIcon !== "none" ? (
          <TouchableOpacity
            onPress={onRightPress}
            className="p-2 -mr-2 active:opacity-70"
          >
            {rightIcon === "bell" && (
              <Ionicons name="notifications-outline" size={26} color="white" />
            )}
            {rightIcon === "gear" && (
              <Ionicons name="settings-outline" size={26} color="white" />
            )}
            {rightIcon === "avatar" && (
              <Ionicons name="person-circle-outline" size={30} color="white" />
            )}
          </TouchableOpacity>
        ) : (
          <View className="w-11" /> // balance when no right content
        )}
      </View>
    </LinearGradient>
  );
};

export default CustomHeader;
