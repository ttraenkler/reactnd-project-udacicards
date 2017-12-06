import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import { DeckList, Deck, Quiz, NewDeck } from "./components/screens";

const Stack = StackNavigator({
  DeckList: {
    screen: DeckList
  },
  Deck: {
    screen: Deck
  },
  Quiz: {
    screen: Quiz
  },
  NewDeck: {
    screen: NewDeck
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Stack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  }
});
