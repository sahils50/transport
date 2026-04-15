import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type ActionButtonProps = {
  label: string;

  /** Optional click handler */
  onPress?: () => void;

  /** Tailwind class overrides */
  containerClassName?: string;
  buttonClassName?: string;
  textClassName?: string;

  /** Style override (optional, advanced) */
  style?: ViewStyle;
};

export default function ActionButton({
  label,
  onPress,
  containerClassName ,
  buttonClassName ,
  textClassName,
  style,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`mt-6  ${containerClassName}`}
      style={style}
    >
      <LinearGradient
        colors={["#FFA24C", "#FF7A18"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={`rounded-xl py-4 ${buttonClassName}`}
      >
        <Text
          className={`text-white text-center font-semibold text-base ${textClassName}`}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
