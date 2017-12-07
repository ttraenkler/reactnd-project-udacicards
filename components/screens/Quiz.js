import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { Button, LargeText } from "../elements";
import {
  clearLocalNotification,
  setLocalNotification
} from "../../helpers/notifications";

type QuestionType = {
  question: string,
  answer: string
};

const Question = ({ question, showAnswer }) => (
  <View
    style={{
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
      alignItems: "stretch"
    }}
  >
    <View
      style={{
        marginHorizontal: 25
      }}
    >
      <LargeText style={{ color: "#666" }}>Question:</LargeText>
      <LargeText style={{ color: "black" }}>{question}</LargeText>
    </View>
  </View>
);

const Answer = ({ answer, feedback }) => (
  <View
    style={{
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
      alignItems: "stretch"
    }}
  >
    <View
      style={{
        marginHorizontal: 25
      }}
    >
      <LargeText style={{ color: "#666" }}>Answer:</LargeText>
      <LargeText style={{ color: "black" }}>{answer}</LargeText>
    </View>
  </View>
);

const ShowAnswer = ({ showAnswer }) => (
  <View
    style={{
      flexDirection: "row",
      marginHorizontal: 25,
      marginVertical: 50,
      alignSelf: "center"
    }}
  >
    <Button style={{ color: "#666" }} onPress={showAnswer}>
      Show Answer
    </Button>
  </View>
);

const Feedback = ({ feedback }) => (
  <View
    style={{
      flexDirection: "row",
      marginHorizontal: 25,
      marginVertical: 50,
      alignSelf: "center"
    }}
  >
    <Button style={{ color: "green", flex: 1 }} onPress={() => feedback(true)}>
      Correct
    </Button>
    <Button style={{ color: "red", flex: 1 }} onPress={() => feedback(false)}>
      Incorrect
    </Button>
  </View>
);

const ButtonBar = ({ front, showAnswer, feedback }) =>
  front ? (
    <ShowAnswer showAnswer={showAnswer} />
  ) : (
    <Feedback feedback={feedback} />
  );

type Props = {
  navigation: Object,
  questions: QuestionType[]
};

// flip animation taken from https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.ios.js

class Quiz extends Component {
  static props: Props;

  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      current: 0,
      correct: 0,
      incorrect: 0,
      done: false
    };
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
  }

  showAnswer = () => {
    this.setState({ showAnswer: true });
    this.flipCard();
  };

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  };

  feedback = (correct: boolean) => {
    const { questions } = this.props.navigation.state.params;
    this.flipCard();
    if (correct) {
      this.setState(state => ({
        correct: state.correct + 1,
        showAnswer: false,
        current:
          state.current + 1 < questions.length
            ? state.current + 1
            : state.current,
        done: state.current + 1 >= questions.length ? true : false
      }));
    } else {
      this.setState(state => ({
        incorrect: state.incorrect + 1,
        showAnswer: false,
        current:
          state.current + 1 < questions.length
            ? state.current + 1
            : state.current,
        done: state.current + 1 >= questions.length ? true : false
      }));
    }
  };

  reset = () => {
    this.setState({
      showAnswer: false,
      current: 0,
      correct: 0,
      incorrect: 0,
      done: false
    });
    Animated.spring(this.animatedValue, {
      toValue: 0,
      friction: 8,
      tension: 10
    }).start();
  };

  render() {
    const { showAnswer, correct, incorrect, current, done } = this.state;
    const { questions } = this.props.navigation.state.params;
    const card = questions[current];

    if (done) {
      clearLocalNotification().then(setLocalNotification());
    }

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    return (
      <View style={styles.fullscreen}>
        {!done ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "stretch"
            }}
          >
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Question question={card.question} />
            </Animated.View>
            <Animated.View
              style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}
            >
              <Answer answer={card.answer} />
            </Animated.View>
          </View>
        ) : (
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "stretch",
              flex: 1
            }}
          >
            <Text
              style={{
                fontSize: 32
              }}
            >
              {correct / questions.length * 100}% correct
            </Text>
            <Button style={{ color: "red" }} onPress={this.reset}>
              Restart
            </Button>
          </View>
        )}
        {!done ? (
          <View>
            <Text style={{ alignSelf: "center", margin: 0 }}>
              {questions.length - current} remaining
            </Text>
            <ButtonBar
              front={!this.state.showAnswer}
              showAnswer={this.showAnswer}
              feedback={this.feedback}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: "stretch"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  flipCard: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: "hidden",
    backgroundColor: "white",
    margin: 25,
    borderRadius: 15
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  }
});

export default Quiz;
