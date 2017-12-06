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

const demoQuestion = "Does React Native work with Android?";

class Quiz extends Component {
  render() {
    return (
      <Animated.View style={styles.fullscreen}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              marginHorizontal: 50
            }}
          >
            <Question>{demoQuestion}</Question>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 25,
              marginVertical: 50
            }}
          >
            <Button style={{ color: "green", flex: 1 }}>Yes</Button>
            <Button style={{ color: "red", flex: 1 }}>No</Button>
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default Quiz;
