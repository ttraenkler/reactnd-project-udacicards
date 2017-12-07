import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Notifications, Permissions, Constants } from "expo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./client/store";
import { setLocalNotification } from "./helpers/notifications";
import { Stack } from "./components/Stack";

export default class App extends React.Component {
  async componentDidMount() {
    setLocalNotification();
  }

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
