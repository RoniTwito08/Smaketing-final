import app, { connectDB } from "./server";
import path from "path";
import express from "express";

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
    }).catch((error) => {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
);