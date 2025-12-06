
// router.post(
//   "/api/found-items/create",
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { item_name, location_found, date_found, description } = req.body;

//       if (!item_name || !location_found || !date_found || !description) {
//         return res.status(400).json({ message: "All fields are required." });
//       }

//       if (!req.file) {
//         return res.status(400).json({ message: "Image upload is required." });
//       }

//       const image_url = `/uploads/found/${req.file.filename}`;

//       await db.execute(
//         `INSERT INTO found_items 
//           (item_name, location_found, date_found, description, image_url, created_at)
//           VALUES (?, ?, ?, ?, ?, NOW())`,
//         [item_name, location_found, date_found, description, image_url]
//       );

//       res.json({ success: true, message: "Found item posted successfully!" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Database error" });
//     }
//   }
// );
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export default function foundRoutesFactory(db) {
  const router = express.Router();

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), "uploads/found");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  });
  const upload = multer({ storage });

  // Create found item
  router.post("/found-items/create", upload.single("image"), async (req, res) => {
    try {
      const { item_name, location_found, date_found, description } = req.body;
      if (!item_name || !location_found || !date_found || !description)
        return res.status(400).json({ message: "All fields are required." });
      if (!req.file)
        return res.status(400).json({ message: "Image upload is required." });

      const image_url = `/uploads/found/${req.file.filename}`;
      await db.execute(
        `INSERT INTO found_items 
        (item_name, location_found, date_found, description, image_url, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())`,
        [item_name, location_found, date_found, description, image_url]
      );

      res.json({ success: true, message: "Found item posted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  });

  // Get all found items
  router.get("/found-items", async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM found_items ORDER BY created_at DESC"
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Get single found item by ID
  router.get("/found-items/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query("SELECT * FROM found_items WHERE id = ?", [id]);
      if (rows.length === 0) return res.status(404).json({ message: "Item not found" });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Delete found item by ID
  router.delete("/found-items/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query("SELECT * FROM found_items WHERE id = ?", [id]);
      if (rows.length === 0) return res.status(404).json({ message: "Item not found" });

      await db.execute("DELETE FROM found_items WHERE id = ?", [id]);
      res.json({ success: true, message: "Item removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  return router;
}
