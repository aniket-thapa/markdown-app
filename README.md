# Markdown File Management and Sharing Web Application

## Table of Contents

- [Project Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

This web application allows users to register, log in, create, upload, view, and delete Markdown files. It provides a platform to manage and share markdown documents through unique shareable links. Built with Node.js, Express.js, and MongoDB, the app offers a user-friendly interface for handling markdown files with modern features.

## Features

- **User Authentication:** Secure registration and login functionality.
- **Markdown File Management:** Create and upload markdown files.
- **File Viewing:** Render markdown files in the browser with a clean, readable format.
- **Shareable Links:** Generate unique links to share markdown files.
- **File Deletion:** Remove files from the system.

## Screenshots

### Dashboard:

![Dashboard Screenshot (https://freeimage.host/i/dashboard.d0z6PYg)](https://iili.io/d0z6PYg.png)

### Create Markdown File:

![Create Screenshot (https://freeimage.host/i/create.d0zSJvR)](https://iili.io/d0zSJvR.png)

### View Files:

![View Screenshot (https://freeimage.host/i/view.d0zSdpp)](https://iili.io/d0zSdpp.png)

## Technologies Used

- **Node.js:** JavaScript runtime for server-side code.
- **Express.js:** Web framework for Node.js to handle routing and middleware.
- **MongoDB:** NoSQL database for storing user and file information.
- **Multer:** Middleware for handling file uploads.
- **Marked:** Library to parse markdown files into HTML.
- **EJS:** Templating engine for rendering views.

## Installation

### Prerequisites

- Node.js (v18.x or later)
- MongoDB (local or cloud instance)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone <your-repository-url>
   cd markdown-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory of the project and add the following:

   ```plaintext
   PORT=3000
   MONGODB_URI="mongodb://localhost:27017/markdown-app"
   SESSION_SECRET="your-session-secret"
   ```

4. **Start the Application:**

   ```bash
   npm start
   ```

   The application will be running at `http://localhost:3000`.

## Usage

### User Registration

1. Navigate to `/register` to create a new user account.
2. Provide a username and password to register.

### User Login

1. Navigate to `/login` to access your account.
2. Enter your credentials to log in.

### Dashboard

- After logging in, you will be redirected to `/dashboard`.
- Here, you can view and manage your markdown files.

### Create Markdown File

1. Navigate to `/create` to create a new markdown file.
2. Enter a filename and the content of the markdown file.
3. Submit the form to save the file.

### Upload Markdown File

1. Navigate to `/upload` to upload a markdown file from your local system.
2. Use the file upload form to select and upload a `.md` / `.txt` file.

### View Markdown File

1. Access a markdown file using the shareable link provided after uploading or creating the file.
2. Navigate to `/view/:link` to render the markdown file in HTML format.

### Delete File

1. To delete a file, use the DELETE button or functionality available in the dashboard.
2. The file will be removed from the system and database.

## Folder Structure

- `app.js`: Main application file that sets up the Express server.
- `routes/`: Contains route handlers for different endpoints.
- `models/`: Contains Mongoose models for database schemas.
- `views/`: Contains EJS templates for rendering HTML pages.
- `public/uploads/`: Directory where uploaded markdown files are temporarily stored.
- `.env`: Configuration file for environment variables.
- `package.json`: Lists dependencies and scripts for the application.

## Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository** on GitHub.
2. **Create a new branch** for your feature or bug fix.
3. **Submit a pull request** with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, feel free to reach out:

- **Email:** aniketthapa04@gmail.com
- **GitHub:** [github.com/aniket-thapa](https://github.com/aniket-thapa)
- **LinkedIn:** [linkedin.com/in/aniket-thapa](https://linkedin.com/in/aniket-thapa)
