import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import { DeckList, Deck, Quiz, NewDeck, NewCard } from "./screens";
import { AddButton } from "./elements";

export const Stack = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: "Decks",
      headerRight: (
        <AddButton
          label="New Deck"
          onPress={() => navigation.navigate("NewDeck")}
        />
      )
    })
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: "Deck",
      headerRight: (
        <AddButton
          label="New Card"
          onPress={() =>
            navigation.navigate("NewCard", {
              title: navigation.state.params.title
            })
          }
        />
      )
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: "Quiz"
    })
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: ({ navigation }) => ({
      title: "New Deck"
    })
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      title: "New Card"
    })
  }
});
