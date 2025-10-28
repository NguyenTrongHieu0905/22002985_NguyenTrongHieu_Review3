import React, { useState, useCallback } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { updateFood } from "../api/foodApi";

export default function EditFoodScreen() {
  const { id, _id, name: initName, gia: initGia } = useLocalSearchParams();
  const foodId = id || _id; // fix lỗi id không đúng key
  const [name, setName] = useState(String(initName || ""));
  const [gia, setGia] = useState(String(initGia || ""));
  const router = useRouter();

  const handleSave = useCallback(async () => {
    if (!foodId || !name || !gia) {
      Alert.alert("Thiếu thông tin!", "Vui lòng nhập đầy đủ tên và giá!");
      return;
    }
    try {
      await updateFood(String(foodId), { name, gia: Number(gia) });
      Alert.alert("Thành công", "Cập nhật món ăn thành công!");
      router.back();
    } catch (err) {
      console.error("Cập nhật lỗi:", err);
      Alert.alert("Lỗi", "Không thể cập nhật dữ liệu!");
    }
  }, [foodId, name, gia, router]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tên thực phẩm"
      />
      <TextInput
        style={styles.input}
        value={gia}
        onChangeText={setGia}
        keyboardType="numeric"
        placeholder="Giá"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.btnText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
