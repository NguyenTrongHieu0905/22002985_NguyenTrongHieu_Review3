import React, { useState, useCallback } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { addFood } from "../../api/foodApi";

export default function AddFoodScreen() {
  const [name, setName] = useState("");
  const [gia, setGia] = useState("");

  const handleAdd = useCallback(async () => {
    if (!name || !gia) return alert("Nhập đầy đủ tên và giá!");
    await addFood({ name, gia: Number(gia) });
    setName("");
    setGia("");
    alert("Đã thêm món ăn!");
  }, [name, gia]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên thực phẩm"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá"
        keyboardType="numeric"
        value={gia}
        onChangeText={setGia}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.btnText}>Thêm</Text>
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
    backgroundColor: "#1E88E5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
