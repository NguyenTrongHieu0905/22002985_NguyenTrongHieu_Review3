const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ========================
// ⚙️ KẾT NỐI MONGODB
// ========================
mongoose
  .connect("mongodb://127.0.0.1:27017/food", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Đã kết nối tới MongoDB: food"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// ========================
// 🍜 MÔ HÌNH DỮ LIỆU
// ========================
const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gia: { type: Number, required: true },
});

const Food = mongoose.model("foods", FoodSchema); // ⚠️ trỏ đúng collection "foods"

// ========================
// 🔹 API
// ========================
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/foods", async (req, res) => {
  try {
    const { name, gia } = req.body;
    const newFood = new Food({ name, gia });
    await newFood.save();
    res.json(newFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/foods/:id", async (req, res) => {
  try {
    const { name, gia } = req.body;
    const updated = await Food.findByIdAndUpdate(
      req.params.id,
      { name, gia },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/foods/:id", async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa thành công", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// 🚀 KHỞI ĐỘNG SERVER
// ========================
app.listen(PORT, () =>
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
);
