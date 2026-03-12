import { usePostStore } from "@/store/appStore";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function UpdatePostScreen() {
  const router = useRouter();
  const updatePost = usePostStore((state) => state.updatePost);
  const posts = usePostStore((state) => state.posts);
  const { id } = useLocalSearchParams();
  const post = posts.find((p) => p.id === id);

  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");

  const handleUpdate = async () => {
    if (!id) return;
    updatePost(id as string, { title, body });
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      title,
      body,
    });
    Alert.alert("Post Updated");
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Edit title"
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
        placeholder="Edit body"
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

      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update Post</Text>
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
