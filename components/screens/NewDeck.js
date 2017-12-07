import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import { Button, LargeText, color, styles } from "../elements";
import { Deck } from "../../client/actions";
//import { submitEntry, removeEntry } from "../../helpers/api";

type Props = {
  navigation: Object,
  create: Function
};

class NewDeck extends Component {
  static props: Props;

  state = {
    text: ""
  };
  render() {
    return (
      <View
        style={{
          margin: 30,
          flex: 1,
          alignItems: "stretch"
        }}
      >
        <LargeText>What is the title of your new deck?</LargeText>
        <TextInput
          style={styles.textinput}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 50,
            flex: 1,
            alignItems: "stretch"
          }}
        >
          <Button
            style={{ color: "blue" }}
            onPress={() => {
              this.props.create(this.state.text);
              this.props.navigation.navigate("Deck", {
                title: this.state.text
              });
            }}
          >
            Create
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    create: (title: string) => {
      dispatch(Deck.create(title));
    }
  })
)(NewDeck);
