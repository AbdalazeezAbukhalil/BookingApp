import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { usePostStore } from "../store/appStore";
interface Post {
  id: string;
  title: string;
  body: string;
}
export default function Api() {
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const posts = usePostStore((state) => state.posts);
  const handleDelete = (id: string) => {
    Alert.alert("Are you sure?", "This post will be deleted", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          usePostStore.getState().deletePost(id);
          axios
            .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(() => {
              console.log("Post deleted");
            });
        },
      },
    ]);
  };

  const handleUpdate = () => {
    if (!editId) return;
    router.push({ pathname: "/updateForm", params: { id: editId } });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setTimeout(() => {
          // Convert all ids to string for consistency
          const posts: Post[] = response.data.map((post: any) => ({
            ...post,
            id: post.id.toString(),
          }));
          usePostStore.getState().clearPosts();
          posts.forEach((post) => usePostStore.getState().addPost(post));
          setLoading(false);
        }, 200);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editId === item.id ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  style={styles.input}
                  value={body}
                  onChangeText={setBody}
                  multiline
                />
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.updateBtn}
                    onPress={handleUpdate}
                  >
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => setEditId(null)}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.body}</Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.updateBtn}
                    onPress={() =>
                      router.push({
                        pathname: "/updateForm",
                        params: { id: item.id },
                      })
                    }
                  >
                    <Text style={styles.btnText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#3C5898",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
    gap: 10,
  },
  updateBtn: {
    backgroundColor: "#3C5898",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
