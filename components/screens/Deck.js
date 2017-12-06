import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Button, styles } from "../elements";

const Deck = ({ navigation }) => (
  <View style={styles.fullscreen}>
    <Button color="red">Add Card</Button>
    <Button color="blue" onPress={() => navigation.navigate("Quiz")}>
      Start Quiz
    </Button>
  </View>
);

export default Deck;
