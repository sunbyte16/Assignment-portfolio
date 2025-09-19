<h1 align="center">📚 Express Book Reviews</h1>

<p align="center">
	<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
	<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

---

## 🚀 Project Overview

Express Book Reviews is a RESTful API project for managing and reviewing books. It demonstrates user authentication, book data handling, and secure endpoints using Node.js and Express.js.

---

## 📦 Features

- 🔐 User authentication (login/register)
- 📖 Browse books database
- 📝 Add, update, and delete book reviews
- 🌐 RESTful API endpoints
- 🛡️ Secure routes for registered users

---

## 🛠️ Installation & Usage

```bash
# Clone the repository
$ git clone https://github.com/sunbyte16/expressBookReviews.git

# Navigate to the project folder
$ cd expressBookReviews/final_project

# Install dependencies
$ npm install

# Start the server
$ node index.js
```

---

## 📚 API Endpoints

| Method | Endpoint                | Description                |
|--------|------------------------|----------------------------|
| POST   | /login                 | User login                 |
| POST   | /register              | User registration          |
| GET    | /books                 | Get all books              |
| GET    | /books/:isbn           | Get book by ISBN           |
| POST   | /books/:isbn/review    | Add a review (auth)        |
| PUT    | /books/:isbn/review    | Update review (auth)       |
| DELETE | /books/:isbn/review    | Delete review (auth)       |

---

## 🌐 Connect with Me

<p align="center">
	<a href="https://github.com/sunbyte16" target="_blank">
		<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
	</a>
	<a href="https://www.linkedin.com/in/sunil-kumar-bb88bb31a/" target="_blank">
		<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
	</a>
	<a href="https://lively-dodol-cc397c.netlify.app" target="_blank">
		<img src="https://img.shields.io/badge/Portfolio-00C896?style=for-the-badge&logo=internet-archive&logoColor=white" alt="Portfolio" />
	</a>
</p>

---

## 👨‍💻 Author

<p align="center">
	<b>Created By Sunil Sharma</b> <span style="font-size:1.5em;">❤️</span>
</p>

---

## 📄 License

This project is licensed under the MIT License.