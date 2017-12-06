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

const Deck = ({ navigation, cardsCount }) => (
  <View style={styles.fullscreen}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 25
      }}
    >
      <LargeText>
        {navigation.state.params.title} deck {cardsCount} cards
      </LargeText>
      <Button
        style={{ color: "green" }}
        onPress={() => navigation.navigate("Quiz")}
      >
        Start Quiz
      </Button>
    </View>
  </View>
);

export default connect(
  (state, props) => ({
    cardsCount: state[props.navigation.state.params.title].questions.length
  }),
  dispatch => ({})
)(Deck);
