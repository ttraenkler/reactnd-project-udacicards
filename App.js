import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import devToolsEnhancer from "remote-redux-devtools";
import { DeckList, Deck, Quiz, NewDeck, NewCard } from "./components/screens";
import { reducer } from "./client/reducer";

const store = createStore(reducer, devToolsEnhancer());

const PlusButton = ({ onPress }: { onPress: void => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      style={{
        marginTop: -5,
        backgroundColor: "transparent",
        color: "#666",
        fontSize: 30,
        marginHorizontal: 15
      }}
    >
      +
    </Text>
  </TouchableOpacity>
);

const Stack = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: "Decks",
      headerRight: <PlusButton onPress={() => navigation.navigate("NewDeck")} />
    })
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
      headerRight: (
        <PlusButton
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  }
});
