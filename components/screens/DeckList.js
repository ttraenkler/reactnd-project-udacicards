import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";
import { Button, color } from "../elements";

const Deck = ({
  name,
  numberOfCards,
  onPress
}: {
  name: string,
  numberOfCards: number,
  onPress: Function
}) => (
  <TouchableOpacity
    style={{
      alignItems: "center",
      padding: 20
    }}
    onPress={onPress}
  >
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.footerText}>
      {numberOfCards} {numberOfCards !== 1 ? "cards" : "card"}
    </Text>
  </TouchableOpacity>
);

const DeckList = ({
  data,
  navigation
}: {
  data: Object,
  navigation: Object
}) => (
  <View
    style={{
      flex: 1,
      alignItems: "stretch"
    }}
  >
    <FlatList
      contentContainerStyle={{ alignItems: "stretch" }}
      data={Object.keys(data).map(key => ({ ...data[key], key }))}
      renderItem={({ item }) => (
        <Deck
          key={item.key}
          name={item.title}
          numberOfCards={(item && item.questions && item.questions.length) || 0}
          onPress={() =>
            navigation.navigate("Deck", {
              title: item.title
            })
          }
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            backgroundColor: color.lightGray,
            height: 1,
            marginHorizontal: 15,
            marginVertical: 0
          }}
        />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    margin: 5
  },
  footerText: {
    fontSize: 12
  }
});

export default connect(state => ({
  data: state.decks
}))(DeckList);
