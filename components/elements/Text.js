import React from "react";
import { Text } from "react-native";

export const LargeText = ({ style, children }) => (
  <Text style={{ fontSize: 24, margin: 10, alignSelf: "center", ...style }}>
    {children}
  </Text>
);
