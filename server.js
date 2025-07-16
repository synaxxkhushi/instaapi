const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/api/instagram-profile", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ success: false, message: "Username required" });
  }

  try {
    const response = await axios.get(
      `https://instagram-profile1.p.rapidapi.com/getprofile/${username}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "instagram-profile1.p.rapidapi.com",
        },
      }
    );

    res.json({ success: true, profile: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to fetch profile info" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
