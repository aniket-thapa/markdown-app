const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Use this for generating random strings
const { marked } = require("marked");
const File = require("../models/File");
const User = require("../models/User"); // Import the User model

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4().replace(/-/g, "").substring(0, 10);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Index Route
router.get("/", (req, res) => {
  res.render("index");
});

// Register Route
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.redirect("/login");
});

// Login Route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.comparePassword(password))) {
    req.session.user = user._id;
    res.redirect("/dashboard");
  } else {
    res.redirect("/login");
  }
});

// Logout Route
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const files = await File.find({});
  res.render("dashboard", { files });
});

// Create Markdown File Route
router.get("/create", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("createMarkdown");
});

router.post("/create", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const { filename, content } = req.body;
  const randomString = uuidv4().replace(/-/g, "").substring(0, 10);
  const filePath = path.join(
    __dirname,
    "../public/uploads/",
    `${randomString}.md`
  );

  fs.writeFile(filePath, content, async (err) => {
    if (err) return res.status(500).send("Error creating file");

    const newFile = new File({
      filename: `${filename}.md`,
      path: filePath,
      shareableLink: randomString,
    });
    await newFile.save();

    res.redirect(`/view/${randomString}`);
  });
});

// Route for uploading Markdown files
router.post("/upload", upload.single("markdown"), (req, res) => {
  const randomString = uuidv4().replace(/-/g, "").substring(0, 10);
  const newFile = new File({
    filename: req.file.filename,
    path: req.file.path,
    shareableLink: randomString,
  });

  newFile
    .save()
    .then(() => res.redirect(`/view/${randomString}`))
    .catch((err) => res.status(500).send("Error saving file"));
});

// View Markdown File via Shareable Link
router.get("/view/:link", async (req, res) => {
  const file = await File.findOne({ shareableLink: req.params.link });

  if (!file)
    return res.status(404).render("error", { message: "File not found" });

  fs.readFile(file.path, "utf8", (err, data) => {
    if (err)
      return res.status(500).render("error", { message: "Error reading file" });
    const htmlContent = marked(data);
    res.render("viewMarkdown", {
      content: htmlContent,
      filename: file.filename,
    });
  });
});

// Route to delete a file
router.post("/delete/:shareableLink", async (req, res) => {
  const { shareableLink } = req.params;

  try {
    // Find and delete the file from the database
    const file = await File.findOneAndDelete({ shareableLink: shareableLink });

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Delete the file from the filesystem
    const filePath = path.join(
      __dirname,
      "../public/uploads",
      file.shareableLink + ".md"
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
        // Continue even if file deletion fails
      }
    });

    // Redirect to the dashboard or another page
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
