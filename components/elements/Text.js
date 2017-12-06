import React from "react";
import { Text } from "react-native";

export const LargeText = ({ children }) => (
  <Text style={{ fontSize: 18, margin: 10, alignSelf: "center" }}>
    {children}
  </Text>
);
