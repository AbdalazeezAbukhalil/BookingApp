import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Api from "./api";
export default function Options() {
  const [showData, setShowData] = useState(false);
  const fetchData = () => {
    setShowData(true);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.fetchBtn} onPress={fetchData}>
            <Text style={styles.btnText}>Fetch Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hideBtn}
            onPress={() => setShowData(false)}
          >
            <Text style={styles.btnText}>Hide Data</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showData && <Api />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fetchBtn: {
    backgroundColor: "#3C5898",
    padding: 15,
    borderRadius: 8,
  },
  hideBtn: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});
