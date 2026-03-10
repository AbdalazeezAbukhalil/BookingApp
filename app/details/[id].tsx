import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BookingModal } from "../../components/BookingModal";
import { PLACES } from "../../data/places";

const { width } = Dimensions.get("window");

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [bookingVisible, setBookingVisible] = useState(false);

  const place = PLACES.find((p) => p.id === id);

  if (!place) {
    return (
      <View style={styles.errorContainer}>
        <Text>Place not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageBackground source={{ uri: place.image }} style={styles.topImage}>
          <SafeAreaView style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <MaterialIcons name="chevron-left" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="bookmark-outline" size={22} color="white" />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.imageBottomCard}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{place.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.priceValue}>${place.price} / slot</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#ddd" />
              <Text style={styles.locationText}>
                {place.location}, {place.country}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab("Overview")}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Overview" && styles.activeTabText,
                ]}
              >
                Overview
              </Text>
              {activeTab === "Overview" && (
                <View style={styles.activeIndicator} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("Details")}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Details" && styles.activeTabText,
                ]}
              >
                Details
              </Text>
              {activeTab === "Details" && (
                <View style={styles.activeIndicator} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="time-outline" size={20} color="#888" />
              </View>
              <Text style={styles.featureLabel}>Duration</Text>
              <Text style={styles.featureValue}>{place.duration}</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="thermometer-outline" size={20} color="#888" />
              </View>
              <Text style={styles.featureLabel}>Temp</Text>
              <Text style={styles.featureValue}>{place.temperature}</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="star" size={20} color="#FFD700" />
              </View>
              <Text style={styles.featureLabel}>Rating</Text>
              <Text style={styles.featureValue}>{place.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{place.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setBookingVisible(true)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
          <View style={styles.bookButtonIcon}>
            <FontAwesome5 name="paper-plane" size={16} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <BookingModal
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
        placeName={place.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topImage: {
    width: width,
    height: 450,
    justifyContent: "space-between",
    padding: 20,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
    padding: 8,
  },
  imageBottomCard: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 30,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceLabel: {
    color: "#ddd",
    fontSize: 12,
  },
  priceValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  locationText: {
    color: "#ddd",
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
    paddingBottom: 4,
  },
  activeTabText: {
    color: "#000",
  },
  activeIndicator: {
    height: 3,
    backgroundColor: "#1E1E1E",
    borderRadius: 2,
    marginTop: 2,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  featureItem: {
    alignItems: "flex-start",
    width: (width - 40) / 3,
  },
  featureIconContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    color: "#888",
  },
  featureValue: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
    marginTop: 10,
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  bookButton: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 65,
    borderRadius: 20,
    gap: 15,
  },
  bookButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bookButtonIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 12,
  },
});
