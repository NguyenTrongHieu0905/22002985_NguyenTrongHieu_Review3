import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { getFoods, deleteFood } from "../../api/foodApi";
import { Food } from "../../types/Food";
import FoodItem from "../../components/FoodItem";

export default function FoodListScreen() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFoods();
      setFoods(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteFood(id);
      fetchFoods();
    },
    [fetchFoods]
  );

  const renderItem = useCallback(
    ({ item }: { item: Food }) => (
      <FoodItem
        item={item}
        onEdit={() => router.push({ pathname: "/edit", params: item })}
        onDelete={handleDelete}
      />
    ),
    [router, handleDelete]
  );

  const list = useMemo(
    () => (
      <FlatList
        data={foods}
        keyExtractor={(item) => item._id ?? ""}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchFoods} />
        }
      />
    ),
    [foods, refreshing, renderItem, fetchFoods]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh Sách Thực Phẩm</Text>
      {loading ? <ActivityIndicator size="large" /> : list}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
});
