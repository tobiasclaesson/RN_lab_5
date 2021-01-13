import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ClassComponentLab from "./components/LabComponent";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ClassComponentLab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
});
