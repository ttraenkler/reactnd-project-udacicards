import React from "react";
import { Text } from "react-native";

export const LargeText = ({ children }) => (
  <Text style={{ fontSize: 24, margin: 25, alignSelf: "center" }}>
    {children}
  </Text>
);
