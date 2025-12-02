

// // export default router;
// import express from "express";
// import multer from "multer";
// import path from "path";
// import mysql from "mysql2/promise";

// const router = express.Router();

// // Configure image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/found"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // Database connection
// const db = await mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "campusfind",
// });

// // POST new found item
// rapp.post(
//   "/api/found-items/create",
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       // Match the frontend keys exactly
//       const { item_name, location_found, date_found, description } = req.body;

//       if (!item_name || !location_found || !date_found || !description) {
//         return res
//           .status(400)
//           .json({ message: "All fields are required." });
//       }

//       if (!req.file) {
//         return res
//           .status(400)
//           .json({ message: "Image upload is required." });
//       }

//       const image_url = `/uploads/found/${req.file.filename}`;

//       await db.execute(
//   `INSERT INTO found_items 
//      (item_name, location_found, date_found, description, image_url, created_at)
//      VALUES (?, ?, ?, ?, ?, NOW())`,
//   [item_name, location_found, date_found, description, imageUrl]
// );

//       res.json({ success: true, message: "Found item posted successfully!" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Database error" });
//     }
//   }
// );


// export default router;
router.post(
  "/api/found-items/create",
  upload.single("image"),
  async (req, res) => {
    try {
      const { item_name, location_found, date_found, description } = req.body;

      if (!item_name || !location_found || !date_found || !description) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image upload is required." });
      }

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
  }
);
