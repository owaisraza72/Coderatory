# 🚀 Node.js TypeScript Server Boilerplate

A lightweight boilerplate for building scalable Node.js applications using TypeScript. Perfect for rapid development and adhering to best practices!

## 🌟 Features

- **TypeScript**: Strong typing for better code quality.
- **Express**: Fast and minimalist web framework.
- **ESLint & Prettier**: Maintain code quality and style.
- **Jest**: Easy testing for reliability.
- **dotenv-flow**: Manage environment variables effortlessly.
- **Mongoose**: Simplified MongoDB interactions.
- **Winston**: Comprehensive logging.

## 🚀 Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/yourusername/base_server.git
   cd base_server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment files**:
   Copy `.env.example` and configure.

4. **Start development**:
   ```bash
   npm run start:dev
   ```

## 🛠️ Scripts

- **Build**: `npm run build` - Compile TypeScript.
- **Test**: `npm run test` - Run tests.
- **Lint**: `npm run lint` - Check code for issues.
- **Fix Linting**: `npm run lint:fix` - Automatically fix lint issues.
- **Format Check**: `npm run format:check` - Check code formatting.
- **Fix Formatting**: `npm run format:fix` - Automatically fix formatting.
- **Migrate Dev**: `npm run migrate:dev` - Run development migrations.
- **Migrate Prod**: `npm run migrate:prod` - Run production migrations.
- **Dockerize Dev**: `npm run dockerize:dev` - Build Docker image for development.

## 🤝 Contributing

Contributions are welcome! Fork the repo and submit a pull request.

## 📜 License

MIT License
```







You are a senior Node.js + TypeScript backend developer working on an existing enterprise-grade project.

IMPORTANT RULES:
- DO NOT modify or break existing codebase (especially user module)
- ONLY add new code inside todo module
- Follow existing architecture strictly
- Do not refactor unrelated files

---

PROJECT STRUCTURE:
src/APIs/
  user/
    _shared/models/
    repo/
    controller.ts
    router.ts
  todo/ (NEW MODULE)

TECH STACK:
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Architecture: controller → repo → model

---

TASK:
Implement ONLY "Create Todo (POST /todos)" feature.

---

STEP 1: CREATE MODULE
Create:
src/APIs/todo/

Inside it:
- _shared/models/todo.model.ts
- repo/todo.repo.ts
- controller.ts
- router.ts

---

STEP 2: TODO MODEL
Fields:
- title: string (required)
- completed: boolean (default false)

---

STEP 3: IMPLEMENT ONLY CREATE TODO
Endpoint:
POST /todos

Request:
{
  "title": "Learn Node.js"
}

Response:
{
  "success": true,
  "data": createdTodo
}

---

STEP 4: ARCHITECTURE RULES
- Model: mongoose schema only
- Repo: DB operations only
- Controller: request/response only
- Router: define endpoint only

---

STEP 5: CONNECT ROUTE
In src/APIs/router.ts:
add:
router.use("/todos", todoRouter)

---

STEP 6: POSTMAN READY COMMIT

After implementation, generate git commit:

git commit -m "feat: add create todo API (POST /todos)"

---

STEP 7: OUTPUT EXPECTATION
- Only required new files
- Clean production-ready TypeScript code
- No changes outside todo module
- Fully working POST /todos endpoint