import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Post {
  id: number;
  title: string;
  body: string;
}
export default function Api() {
  const [data, setData] = useState<Post[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const handleDelete = (id: number) => {
    Alert.alert("Are you sure?", "This post will be deleted", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          setData(data.filter((post) => post.id !== id));
          axios
            .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(() => {
              console.log("Post deleted");
            });
        },
      },
    ]);
  };

  const startEdit = (post: Post) => {
    setEditId(post.id);
    setTitle("Title");
    setBody("Body");
  };

  const handleUpdate = () => {
    setLoading(true);
    setData(
      data.map((post) =>
        post.id === editId ? { ...post, title: title, body: body } : post,
      ),
    );
    setEditId(null);
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
        title,
        body,
      })
      .then(() => {
        console.log("Post updated");
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    Alert.alert("Post Updated", "The post has been updated successfully", [
      { text: "OK" },
    ]);
  };

  const addNewPost = () => {
    setLoading(true);
    const newPost: Post = {
      id: Math.max(...data.map((p) => p.id), 0) + 1,
      title: "Click the Update Button to Edit this Post",
      body: "",
    };
    setData([newPost, ...data]);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
        console.log("Post created");
      });
    Alert.alert(
      "New Post Created",
      "Click the Update Button to Edit this Post",
      [{ text: "OK" }],
    );
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setTimeout(() => {
          setData(response.data);
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

      {loading === false && (
        <View style={styles.create}>
          <Button title="Create New Post" onPress={addNewPost} color="#fff" />
        </View>
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
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
                    onPress={() => startEdit(item)}
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
  create: {
    margin: 10,
    backgroundColor: "#3C5898",
    borderRadius: 10,
  },
});
