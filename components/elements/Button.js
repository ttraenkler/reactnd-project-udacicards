import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const Button = ({
  children,
  onPress,
  style
}: {
  children: string,
  color: string,
  onPress?: void => void
}) => (
  <TouchableOpacity
    style={{
      margin: 10,
      padding: 15,
      flex: style && style.flex,
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: style && style.color
    }}
    onPress={onPress}
  >
    <Text style={{ color: "white", fontSize: 20 }}>{children}</Text>
  </TouchableOpacity>
);
