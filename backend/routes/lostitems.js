

// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// export default function lostRoutesFactory(db) {
//   const router = express.Router();

//   // Ensure upload directory exists
//   const uploadDir = path.join(process.cwd(), "uploads", "lost");
//   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//   // Multer storage
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadDir),
//     filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
//   });
//   const upload = multer({ storage });

//   // Create lost item
//   router.post("/lost-items/create", upload.single("image"), async (req, res) => {
//     try {
//       const { item_name, location_lost, date_lost, description } = req.body;
//       if (!item_name || !location_lost || !date_lost || !description)
//         return res.status(400).json({ message: "All fields are required." });
//       if (!req.file)
//         return res.status(400).json({ message: "Image upload is required." });

//       const image_url = `/uploads/lost/${req.file.filename}`;
//       await db.execute(
//         `INSERT INTO lost_items 
//         (item_name, location_lost, date_lost, description, image_url, created_at)
//         VALUES (?, ?, ?, ?, ?, NOW())`,
//         [item_name, location_lost, date_lost, description, image_url]
//       );

//       res.json({ success: true, message: "Lost item posted successfully!" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Database error" });
//     }
//   });

//   // Get all lost items
//   router.get("/lost-items", async (req, res) => {
//     try {
//       const [rows] = await db.query("SELECT * FROM lost_items ORDER BY created_at DESC");
//       res.json(rows);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

//   // Get single lost item
//   router.get("/lost-items/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//       const [rows] = await db.query("SELECT * FROM lost_items WHERE id = ?", [id]);
//       if (rows.length === 0) return res.status(404).json({ message: "Item not found" });
//       res.json(rows[0]);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

//   // Delete lost item
//   router.delete("/lost-items/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//       const [rows] = await db.query("SELECT * FROM lost_items WHERE id = ?", [id]);
//       if (rows.length === 0) return res.status(404).json({ message: "Item not found" });

//       await db.execute("DELETE FROM lost_items WHERE id = ?", [id]);
//       res.json({ success: true, message: "Item removed successfully" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

//   return router;
// }

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export default function lostRoutesFactory(db) {
  const router = express.Router();

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), "uploads", "lost");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  });
  const upload = multer({ storage });

  // Create lost item -> POST /api/lost-items/create
  router.post("/create", upload.single("image"), async (req, res) => {
    try {
      const { item_name, location_lost, date_lost, description } = req.body;
      if (!item_name || !location_lost || !date_lost || !description)
        return res.status(400).json({ message: "All fields are required." });
      if (!req.file)
        return res.status(400).json({ message: "Image upload is required." });

      const image_url = `/uploads/lost/${req.file.filename}`;
      await db.execute(
        `INSERT INTO lost_items 
         (item_name, location_lost, date_lost, description, image_url, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [item_name, location_lost, date_lost, description, image_url]
      );

      res.json({ success: true, message: "Lost item posted successfully!" });
    } catch (err) {
      console.error("lost-items/create error:", err);
      res.status(500).json({ message: "Database error" });
    }
  });

  // GET all -> GET /api/lost-items
  router.get("/", async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT * FROM lost_items ORDER BY created_at DESC");
      res.json(rows);
    } catch (err) {
      console.error("lost-items GET / error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // GET single -> GET /api/lost-items/:id
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.execute("SELECT * FROM lost_items WHERE id = ?", [id]);
      if (rows.length === 0) return res.status(404).json({ message: "Item not found" });
      res.json(rows[0]);
    } catch (err) {
      console.error("lost-items GET /:id error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // DELETE -> DELETE /api/lost-items/:id
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.execute("SELECT * FROM lost_items WHERE id = ?", [id]);
      if (rows.length === 0) return res.status(404).json({ message: "Item not found" });

      await db.execute("DELETE FROM lost_items WHERE id = ?", [id]);
      res.json({ success: true, message: "Item removed successfully" });
    } catch (err) {
      console.error("lost-items DELETE /:id error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  return router;
}

