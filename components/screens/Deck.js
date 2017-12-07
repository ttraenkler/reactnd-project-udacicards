import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Button, styles, LargeText } from "../elements";

const Deck = ({ navigation, questions }) => (
  <View style={styles.fullscreen}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 25
      }}
    >
      <Text style={{ fontSize: 32, alignSelf: "center" }}>
        {navigation.state.params.title}
      </Text>
      <LargeText>{questions.length} cards</LargeText>
      <Button
        style={{ color: "green", margin: 50 }}
        onPress={() => {
          if (questions.length) {
            navigation.navigate("Quiz", {
              questions
            });
          }
        }}
      >
        Start Quiz
      </Button>
    </View>
  </View>
);

export default connect(
  (state, props) => ({
    questions: state.decks[props.navigation.state.params.title].questions
  }),
  dispatch => ({})
)(Deck);
