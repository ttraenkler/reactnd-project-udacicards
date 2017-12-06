import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { Button, LargeText, styles } from "../elements";

const Question = ({ children }) => <LargeText>{children}</LargeText>;

class Quiz extends Component {
  render() {
    return (
      <Animated.View style={styles.fullscreen}>
        <Question>Does React Native work with Android?</Question>
        <Button color="green">Correct</Button>
        <Button color="red">Incorrect</Button>
      </Animated.View>
    );
  }
}

export default Quiz;
