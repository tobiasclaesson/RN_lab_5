import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: this.props.user.name,
        email: this.props.user.email,
        phone: this.props.user.phone,
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("returning " + (nextProps.user != this.props.user));

    if (
      nextProps.user.name === this.props.user.name &&
      nextState.user.name === this.state.user.name
    ) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.name != this.props.user.name) {
      this.fetchUserWithId(this.props.user.id);
    }
  }

  fetchUserWithId(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => {
        let result = {
          name: json.name,
          email: json.email,
          phone: json.phone,
        };

        this.setState({ user: result });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
            marginTop: 5,
          }}
        >
          Candidate Info
        </Text>
        <Text>{this.state.user.name}</Text>
        <Text>{this.state.user.email}</Text>
        <Text>{this.state.user.phone}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({});
