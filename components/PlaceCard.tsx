import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Place } from "../types/place";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.65;

interface PlaceCardProps {
  place: Place;
  onPress: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <ImageBackground
        source={{ uri: place.image }}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.overlay}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{place.name}</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={12} color="#ddd" />
              <Text style={styles.locationText}>
                {place.location}, {place.country}
              </Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{place.rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 400,
    marginRight: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  overlay: {
    padding: 15,
    backgroundColor: "rgba(44, 41, 41, 0.73)",
    margin: 20,
    borderRadius: 20,
  },
  infoContainer: {
    gap: 4,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    color: "#ddd",
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    marginLeft: "auto",
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
