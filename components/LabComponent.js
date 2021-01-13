import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import UserView from "./UserView";

export default class ClassComponentLab extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [{ id: 0, name: "", email: "", phone: "" }],
      selectedUser: 0,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        let results = [];
        json.forEach((item) => {
          let result = {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
          };
          results.push(result);
        });
        this.setState({ candidates: results });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Candidates</Text>
        <FlatList
          data={this.state.candidates}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ selectedUser: index });
                }}
              >
                <View
                  style={{
                    ...styles.listView,
                    backgroundColor:
                      index === this.state.selectedUser ? "orange" : null,
                  }}
                >
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          style={styles.flatList}
        />
        <View style={styles.userView}>
          <UserView user={this.state.candidates[this.state.selectedUser]} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="prev"
            onPress={() => {
              this.state.selectedUser > 0
                ? this.setState({ selectedUser: this.state.selectedUser - 1 })
                : null;
            }}
          />
          <Text>{this.state.selectedUser}</Text>
          <Button
            title="next"
            onPress={() => {
              this.state.selectedUser < this.state.candidates.length - 1
                ? this.setState({ selectedUser: this.state.selectedUser + 1 })
                : null;
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  listView: {
    padding: 10,
  },
  flatList: {
    width: "70%",
    marginTop: 10,
    flex: 1,
  },
  userView: {
    marginTop: 10,
    width: "70%",
    flex: 0.5,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
});
