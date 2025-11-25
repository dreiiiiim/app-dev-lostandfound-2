const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password)
            return res.status(400).json({ msg: "Please fill all fields" });

        const [existing] = await pool.query(
            "SELECT user_id FROM users WHERE email = ?",
            [email]
        );
        if (existing.length > 0)
            return res.status(400).json({ msg: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
            [fullname, email, hashed]
        );

        res.json({ msg: "Registered successfully", user_id: result.insertId });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (rows.length === 0)
            return res.status(400).json({ msg: "Invalid email or password" });

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ msg: "Invalid email or password" });

        const token = jwt.sign(
            { user_id: user.user_id, fullname: user.fullname },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        res.json({
            msg: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};
