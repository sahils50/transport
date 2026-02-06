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
  rightIcon?: "bell" | "gear" | "avatar" | "none"; // kept for backward compat
  onRightPress?: () => void; // kept for backward compat (applies to single rightIcon)
  rightContent?: React.ReactNode; // fully custom right side (overrides everything)
  // New props for multi-icon flexibility
  showBell?: boolean;
  onBellPress?: () => void;
  showAvatar?: boolean;
  onAvatarPress?: () => void;
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
  showBell = false,
  onBellPress,
  showAvatar = false,
  onAvatarPress,
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

  // Backward compat: map old rightIcon to new props if no explicit show* is passed
  const effectiveShowBell = showBell || (rightIcon === "bell" && !showAvatar);
  const effectiveShowAvatar =
    showAvatar || (rightIcon === "avatar" && !showBell);
  const effectiveOnBellPress =
    onBellPress || (rightIcon === "bell" ? onRightPress : undefined);
  const effectiveOnAvatarPress =
    onAvatarPress || (rightIcon === "avatar" ? onRightPress : undefined);

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

        {/* RIGHT: Multi-icon support, custom content, or spacer */}
        {rightContent ? (
          <View className="p-2 -mr-2">{rightContent}</View>
        ) : effectiveShowBell || effectiveShowAvatar || rightIcon === "gear" ? (
          <View className="flex-row items-center -mr-2">
            {/* Bell */}
            {effectiveShowBell && (
              <TouchableOpacity
                onPress={effectiveOnBellPress}
                className="p-2 active:opacity-70"
              >
                <Ionicons
                  name="notifications-outline"
                  size={26}
                  color="white"
                />
              </TouchableOpacity>
            )}

            {/* Avatar */}
            {effectiveShowAvatar && (
              <TouchableOpacity
                onPress={effectiveOnAvatarPress}
                className="p-2 active:opacity-70 ml-2"
              >
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            )}

            {/* Gear (single, for backward compat) */}
            {rightIcon === "gear" &&
              !effectiveShowBell &&
              !effectiveShowAvatar && (
                <TouchableOpacity
                  onPress={onRightPress}
                  className="p-2 active:opacity-70"
                >
                  <Ionicons name="settings-outline" size={26} color="white" />
                </TouchableOpacity>
              )}
          </View>
        ) : (
          <View className="w-11" /> // balance when no right content
        )}
      </View>
    </LinearGradient>
  );
};

export default CustomHeader;
