import { usePostStore } from "@/store/appStore";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function Create() {
  const router = useRouter();
  const addPost = usePostStore((state) => state.addPost);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createPost = async () => {
    const newPost = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title,
      body,
    };

    addPost(newPost);
    await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    Alert.alert("Post Created");
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          borderRadius: 4,
        }}
      />

      <TextInput
        placeholder="Enter body"
        value={body}
        onChangeText={setBody}
        multiline
        style={{
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          borderRadius: 4,
        }}
      />

      <TouchableOpacity onPress={createPost} style={styles.button}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  buttonText: {
    backgroundColor: "#3C5898",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#3C5898",
    alignItems: "center",
    color: "#fff",
  },
});
