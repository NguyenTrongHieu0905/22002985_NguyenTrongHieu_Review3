import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Food } from "../types/Food";

interface Props {
  item: Food;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export default function FoodItem({ item, onEdit, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>Giá: {item.gia}₫</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.btnText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(item._id!)}
        >
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
  },
  text: { fontSize: 16, marginBottom: 4 },
  row: { flexDirection: "row", gap: 8 },
  editBtn: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#E53935",
    padding: 8,
    borderRadius: 6,
  },
  btnText: { color: "#fff" },
});
