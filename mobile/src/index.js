import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";
export default function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    console.log(title, owner);
    if (!(title === "" || owner === "")) {
      const response = await api.post("projects", {
        title: title,
        owner: owner,
      });

      const project = response.data;
      setProjects([...projects, project]);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"></StatusBar>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        ></FlatList>

        <TextInput
          style={styles.input}
          onChangeText={(title) => setTitle(title)}
        />

        <TextInput
          style={styles.input}
          onChangeText={(owner) => setOwner(owner)}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },

  project: {
    color: "#fff",
    fontSize: 20,
  },

  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 10,
    height: 38,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
});
