import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { Card } from "../../client/actions";
import { Button, LargeText, styles } from "../elements";

class NewCard extends Component {
  state = {
    question: "",
    answer: ""
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View
          style={{
            margin: 15,
            marginVertical: 0,
            padding: 25
          }}
        >
          <TextInput
            editable={true}
            maxLength={40}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <LargeText>Question:</LargeText>
          <TextInput
            editable={true}
            maxLength={40}
            multiline={true}
            numberOfLines={4}
            style={styles.textinput}
            autoCorrect={false}
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />

          <LargeText>Answer:</LargeText>
          <TextInput
            editable={true}
            multiline={true}
            maxLength={40}
            numberOfLines={4}
            autoCorrect={false}
            style={styles.textinput}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
          <View style={{ height: 50 }} />

          <Button
            style={{ color: "blue" }}
            onPress={() => {
              const { question, answer } = this.state;
              if (
                this.props.navigation.state.params.title &&
                question &&
                answer
              ) {
                this.props.create(
                  this.props.navigation.state.params.title,
                  question,
                  answer
                );
                this.props.navigation.goBack();
              }
            }}
          >
            Create
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    create: (deck, question, answer) =>
      dispatch(Card.create(deck, question, answer))
  })
)(NewCard);
