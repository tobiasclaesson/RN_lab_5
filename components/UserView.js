import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        phone: "",
      },
    };
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
        <Text>{this.state.user.name}</Text>
        <Text>{this.state.user.email}</Text>
        <Text>{this.state.user.phone}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({});
