import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import data from "../../data.json";
import { Button } from "../elements";

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
    style={{ alignItems: "center", padding: 10 }}
    onPress={onPress}
  >
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.footerText}>{numberOfCards} cards</Text>
  </TouchableOpacity>
);

const DeckList = ({ navigation }: { navigation: Object }) => (
  <View
    style={{
      alignItems: "stretch",
      backgroundColor: "white"
      //paddingTop: Constants.statusBarHeight
    }}
  >
    <FlatList
      contentContainerStyle={{ alignItems: "stretch" }}
      data={Object.keys(data).map(key => ({ ...data[key], key }))}
      renderItem={({ item }) => (
        <Deck
          key={item.key}
          name={item.title}
          numberOfCards={item.questions.length}
          onPress={() => navigation.navigate("Deck")}
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "lightgray", height: 1 }} />
      )}
    />
    <Button color="blue" onPress={() => navigation.navigate("NewDeck")}>
      Create Deck
    </Button>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    margin: 5
  },
  footerText: {
    fontSize: 12
  }
});

export default DeckList;
