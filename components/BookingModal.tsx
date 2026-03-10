import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  placeName: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  onClose,
  placeName,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zipcode: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validate = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "Zipcode is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipcode)) {
      newErrors.zipcode = "Invalid Zipcode (e.g. 12345)";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsConfirmed(true);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", address: "", zipcode: "", email: "" });
    setErrors({});
    setIsConfirmed(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {isConfirmed ? "Booking Confirmed" : `Book ${placeName}`}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {isConfirmed ? (
            <View style={styles.confirmedContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
              <Text style={styles.confirmedText}>
                Your trip to {placeName} has been confirmed!
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    value={formData.name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={[styles.input, errors.address && styles.inputError]}
                    value={formData.address}
                    onChangeText={(text) =>
                      setFormData({ ...formData, address: text })
                    }
                    placeholder="Enter your street address"
                  />
                  {errors.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Zip Code</Text>
                  <TextInput
                    style={[styles.input, errors.zipcode && styles.inputError]}
                    value={formData.zipcode}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setFormData({ ...formData, zipcode: text })
                    }
                  />
                  {errors.zipcode && (
                    <Text style={styles.errorText}>{errors.zipcode}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    value={formData.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    gap: 15,
    paddingBottom: 20,
  },
  inputGroup: {
    gap: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmedContainer: {
    padding: 40,
    alignItems: "center",
    gap: 20,
  },
  confirmedText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    lineHeight: 26,
  },
  closeButton: {
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
