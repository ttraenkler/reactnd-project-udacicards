import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { Button, LargeText } from "../elements";

class NewDeck extends Component {
  state = {
    text: ""
  };
  render() {
    return (
      <View style={{ margin: 25, alignItems: "stretch" }}>
        <LargeText>What is the title of your new deck?</LargeText>
        <TextInput
          style={{
            height: 40,
            borderColor: "transparent",
            borderBottomColor: "gray",
            borderWidth: 1
          }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button color="blue" onPress={() => this.props.navigation.goBack()}>
          Create Deck
        </Button>
      </View>
    );
  }
}

export default NewDeck;
