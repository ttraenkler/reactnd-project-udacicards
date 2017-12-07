import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Notifications, Permissions, Constants } from "expo";
import { StackNavigator } from "react-navigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import devToolsEnhancer from "remote-redux-devtools";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { PersistGate } from "redux-persist/es/integration/react";
import { DeckList, Deck, Quiz, NewDeck, NewCard } from "./components/screens";
import { reducer } from "./client/reducer";
import { setLocalNotification } from "./helpers/notifications";

const config = {
  key: "root",
  storage
};

const combinedReducers = combineReducers({ decks: reducer });
const reducers = persistReducer(config, combinedReducers);
const store = createStore(reducers, devToolsEnhancer());
const persistor = persistStore(store);

// const store = createStore(reducer, devToolsEnhancer());

const AddButton = ({ onPress, label = "+" }: { onPress: void => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      style={{
        marginTop: -5,
        backgroundColor: "transparent",
        color: "#666",
        fontSize: 17,
        marginHorizontal: 15
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const Stack = StackNavigator({
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

export default class App extends React.Component {
  async componentDidMount() {
    setLocalNotification();
  }

  /* 
  sendDelayedLocalNotification() {
    Notifications.scheduleLocalNotificationAsync(
      { title: "title", body: "body", data: { type: "delayed" } },
      { time: new Date().getTime() + 5000 }
    ).then(id => console.warn(`Delayed notification scheduled (${id})`));
  } 
  */

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Text>Loading</Text>}>
          <View style={styles.container}>
            <Stack />
          </View>
        </PersistGate>
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
