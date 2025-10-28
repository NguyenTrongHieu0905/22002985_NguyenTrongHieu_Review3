import { Food } from "../types/Food";

const BASE_URL = "http://192.168.5.15:5000/api/foods"; 

export const getFoods = async (): Promise<Food[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addFood = async (food: Food): Promise<Food> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  return res.json();
};

export const updateFood = async (id: string, food: Food): Promise<Food> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  return res.json();
};

export const deleteFood = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
