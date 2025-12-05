# 🏗️ KakaWallet Project Architecture Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Why Two Backend Folders?](#why-two-backend-folders)
3. [Database Architecture](#database-architecture)
4. [ORM Usage (Sequelize)](#orm-usage-sequelize)
5. [Project Structure](#project-structure)
6. [How Everything Works Together](#how-everything-works-together)

---

## 🎯 Project Overview

**KakaWallet** is a money management system that helps you:
- **Keep money for people** (Money Keeping feature)
- **Track loans** (Loans feature)
- Manage transactions and balances
- View dashboard statistics

The project uses:
- **Frontend**: React (in `frontedBoilerPlate-main/`)
- **Backend**: Express.js with two deployment options
- **Database**: SQLite (local) or PostgreSQL (production)
- **ORM**: Sequelize

---

## 🤔 Why Two Backend Folders?

You have **TWO separate backend implementations** for different deployment strategies:

### 1. `Backend_/` - Full Express Server (Traditional Deployment)
**Purpose**: Traditional Express.js server that runs continuously

**Used for:**
- Local development
- Deployment to **Render**, **Railway**, **Heroku** (platforms that support long-running servers)
- Full-featured backend with all routes, middleware, and features

**Key Files:**
- `Backend_/app.js` - Main Express server
- `Backend_/config/database.js` - SQLite database configuration
- `Backend_/models/` - Sequelize models
- `Backend_/routes/` - Express routes
- `Backend_/controllers/` - Business logic

**How it runs:**
```bash
cd Backend_
npm start  # Runs on port 5002
```

---

### 2. `api/` - Vercel Serverless Functions
**Purpose**: Serverless functions for Vercel deployment

**Used for:**
- Deployment to **Vercel** (serverless platform)
- Each file in `api/` becomes a serverless function
- Functions are stateless and run on-demand

**Key Files:**
- `api/index.js` - Root endpoint handler
- `api/health.js` - Health check endpoint
- `api/users/login.js` - Login function
- `api/users/index.js` - User management function
- `api/config/database.js` - PostgreSQL configuration (for Vercel)

**How it works:**
- Vercel automatically converts each file in `api/` to a serverless function
- `api/users/login.js` → `https://your-app.vercel.app/api/users/login`
- `api/users/index.js` → `https://your-app.vercel.app/api/users`

**Why separate?**
- Vercel uses **serverless functions** (each endpoint is a separate function)
- Traditional servers use **one Express app** with routes
- Different deployment platforms require different code structures

---

## 🗄️ Database Architecture

### Database Types

#### 1. **SQLite** (Local Development - `Backend_/`)
- **File-based database**: `Backend_/database/kaka_wallet.sqlite`
- **No server needed**: Database is a single file
- **Perfect for**: Development, testing, small deployments
- **Location**: Stored locally on your machine

**Configuration** (`Backend_/config/database.js`):
```javascript
const dbPath = path.join(__dirname, '../database/kaka_wallet.sqlite');
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,  // Points to the .sqlite file
  logging: false
});
```

#### 2. **PostgreSQL** (Production - `api/`)
- **Server-based database**: Requires a database server (Vercel Postgres, Supabase, etc.)
- **Connection string**: Provided via `DATABASE_URL` environment variable
- **Perfect for**: Production deployments, scaling

**Configuration** (`api/config/database.js`):
```javascript
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
});
```

---

### Database Schema

Your database has **4 main tables**:

#### 1. **users** Table
Stores both **admin users** and **people you keep money for**:
```sql
- id (INTEGER, PRIMARY KEY)
- name (STRING)
- email (STRING, UNIQUE, OPTIONAL)
- phone (STRING, OPTIONAL)
- address (TEXT, OPTIONAL)
- password (STRING, OPTIONAL - only for admins)
- is_admin (BOOLEAN) - true for admin, false for people
- admin_id (INTEGER) - which admin owns this person record
- join_date (DATE)
- status (ENUM: 'active', 'inactive')
- notes (TEXT)
- created_at, updated_at (TIMESTAMPS)
```

**Key Concept**: 
- `isAdmin = true` → This is an admin user (can log in)
- `isAdmin = false` → This is a person you keep money for
- `adminId` → Links people to their admin owner

#### 2. **transactions** Table
Tracks money given/returned for money keeping:
```sql
- id (INTEGER, PRIMARY KEY)
- user_id (INTEGER, FOREIGN KEY → users.id)
- type (ENUM: 'given', 'returned')
  - 'given' = person gave you money
  - 'returned' = you returned money to person
- amount (DECIMAL 10,2)
- description (TEXT, OPTIONAL)
- date (DATE)
- admin_id (INTEGER, FOREIGN KEY → users.id)
- created_at, updated_at (TIMESTAMPS)
```

#### 3. **loan_persons** Table
Stores people you give loans to:
```sql
- id (INTEGER, PRIMARY KEY)
- name (STRING)
- email (STRING, OPTIONAL)
- phone (STRING, OPTIONAL)
- notes (TEXT, OPTIONAL)
- status (ENUM: 'active', 'inactive')
- join_date (DATE)
- admin_id (INTEGER, FOREIGN KEY → users.id)
- created_at, updated_at (TIMESTAMPS)
```

#### 4. **loans** Table
Tracks loan transactions:
```sql
- id (INTEGER, PRIMARY KEY)
- loan_person_id (INTEGER, FOREIGN KEY → loan_persons.id)
- type (ENUM: 'given', 'repaid')
  - 'given' = you gave loan to person
  - 'repaid' = person repaid loan to you
- amount (DECIMAL 10,2)
- description (TEXT, OPTIONAL)
- date (DATE)
- admin_id (INTEGER, FOREIGN KEY → users.id)
- created_at, updated_at (TIMESTAMPS)
```

### Relationships

```
users (admin)
  ├── has many → users (people) [via admin_id]
  ├── has many → transactions [via admin_id]
  ├── has many → loan_persons [via admin_id]
  └── has many → loans [via admin_id]

users (person)
  └── has many → transactions [via user_id]

loan_persons
  └── has many → loans [via loan_person_id]
```

---

## 🔧 ORM Usage (Sequelize)

### What is Sequelize?
**Sequelize** is an **Object-Relational Mapping (ORM)** library. Instead of writing raw SQL queries, you use JavaScript objects and methods.

### How It Works in Your Project

#### 1. **Model Definition** (Defines Table Structure)

Example from `Backend_/models/User.js`:
```javascript
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users'  // Maps to 'users' table in database
});

export default User;
```

**What this does:**
- Creates a JavaScript class `User` that represents the `users` table
- Defines column types, constraints, and validations
- Sequelize automatically converts this to SQL when needed

#### 2. **Database Connection** (Initializes Sequelize)

From `Backend_/config/database.js`:
```javascript
export const sequelize = new Sequelize({
  dialect: 'sqlite',        // Database type
  storage: dbPath,          // File path for SQLite
  logging: false,          // Don't log SQL queries
  define: {
    timestamps: true,      // Auto-add created_at, updated_at
    underscored: true      // Use snake_case for column names
  }
});
```

#### 3. **Database Synchronization** (Creates Tables)

From `Backend_/config/database.js`:
```javascript
export const syncDatabase = async () => {
  // Import all models first
  await import('../models/User.js');
  await import('../models/Transaction.js');
  await import('../models/LoanPerson.js');
  await import('../models/Loan.js');
  
  // Create tables if they don't exist
  await sequelize.sync();
};
```

**What `sequelize.sync()` does:**
- Reads all model definitions
- Creates tables in the database if they don't exist
- Adds missing columns if models changed
- **Does NOT delete columns** (safe for production)

#### 4. **Using Models in Controllers** (CRUD Operations)

Example from `Backend_/controllers/userController.js`:

**CREATE** (Insert):
```javascript
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  isAdmin: false,
  adminId: req.user.id
});
// Sequelize generates: INSERT INTO users (name, email, is_admin, admin_id) VALUES (...)
```

**READ** (Select):
```javascript
// Find all users
const users = await User.findAll({
  where: { isAdmin: false, adminId: req.user.id }
});
// Sequelize generates: SELECT * FROM users WHERE is_admin = false AND admin_id = ?

// Find one user
const user = await User.findOne({ where: { email: 'john@example.com' } });
// Sequelize generates: SELECT * FROM users WHERE email = ? LIMIT 1

// Find by primary key
const user = await User.findByPk(1);
// Sequelize generates: SELECT * FROM users WHERE id = 1
```

**UPDATE**:
```javascript
await user.update({
  name: 'Jane Doe',
  phone: '1234567890'
});
// Sequelize generates: UPDATE users SET name = ?, phone = ? WHERE id = ?
```

**DELETE**:
```javascript
await user.destroy();
// Sequelize generates: DELETE FROM users WHERE id = ?
```

#### 5. **Relationships (Associations)**

From `Backend_/models/Transaction.js`:
```javascript
// Define relationship
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
```

**What this does:**
- Links `Transaction` to `User` via `userId` foreign key
- Allows you to include related data in queries

**Using relationships:**
```javascript
// Get user with all their transactions
const user = await User.findByPk(1, {
  include: [{
    model: Transaction,
    as: 'transactions'  // Use the alias from the association
  }]
});

// Now you can access: user.transactions (array of Transaction objects)
```

#### 6. **Virtual Fields (Calculated Properties)**

From `Backend_/models/User.js`:
```javascript
getterMethods: {
  moneyKeepingBalance() {
    // Calculate balance from transactions
    if (this.transactions && this.transactions.length > 0) {
      const totalGiven = this.transactions
        .filter(t => t.type === 'given')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
      const totalReturned = this.transactions
        .filter(t => t.type === 'returned')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
      return totalGiven - totalReturned;
    }
    return 0;
  }
}
```

**What this does:**
- Calculates balance on-the-fly from related transactions
- Not stored in database, computed when accessed
- Access via: `user.moneyKeepingBalance`

---

## 📁 Project Structure

```
kaka-wallet/
│
├── 📂 Backend_/                    # Traditional Express Server
│   ├── app.js                      # Main Express application
│   ├── package.json                # Dependencies
│   │
│   ├── 📂 config/
│   │   └── database.js             # Sequelize configuration (SQLite)
│   │
│   ├── 📂 models/                  # Sequelize Models (Table Definitions)
│   │   ├── User.js                 # Users table (admins + people)
│   │   ├── Transaction.js          # Transactions table
│   │   ├── LoanPerson.js           # Loan persons table
│   │   └── Loan.js                 # Loans table
│   │
│   ├── 📂 controllers/             # Business Logic
│   │   ├── userController.js       # User CRUD operations
│   │   ├── loanController.js       # Loan operations
│   │   └── loanPersonController.js # Loan person operations
│   │
│   ├── 📂 routes/                  # Express Routes
│   │   ├── userRoutes.js           # User endpoints
│   │   ├── loanRoutes.js           # Loan endpoints
│   │   └── loanPersonRoutes.js     # Loan person endpoints
│   │
│   ├── 📂 utils/
│   │   └── authMiddleware.js       # JWT authentication
│   │
│   ├── 📂 database/
│   │   └── kaka_wallet.sqlite      # SQLite database file
│   │
│   └── 📂 backups/                 # Auto-generated backups
│
├── 📂 api/                         # Vercel Serverless Functions
│   ├── index.js                    # Root endpoint
│   ├── health.js                   # Health check
│   │
│   ├── 📂 config/
│   │   └── database.js             # Sequelize config (PostgreSQL)
│   │
│   ├── 📂 models/                  # Models (same as Backend_)
│   │   ├── User.js
│   │   └── Transaction.js
│   │
│   └── 📂 users/
│       ├── login.js                # Login serverless function
│       ├── admin.js                # Admin registration function
│       └── index.js                # User management function
│
└── 📂 frontedBoilerPlate-main/     # React Frontend
    ├── src/
    │   ├── App.js
    │   ├── Pages/
    │   │   ├── Login.jsx
    │   │   ├── Home.jsx
    │   │   ├── People.jsx          # Money keeping page
    │   │   ├── Loans.jsx           # Loans page
    │   │   └── ...
    │   └── Utils/
    │       └── apiService.js       # API calls to backend
```

---

## 🔄 How Everything Works Together

### Request Flow (Example: Creating a User)

#### 1. **Frontend** (`frontedBoilerPlate-main/src/Pages/People.jsx`)
```javascript
// User clicks "Add Person" button
const response = await apiService.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890'
});
```

#### 2. **API Service** (`frontedBoilerPlate-main/src/Utils/apiService.js`)
```javascript
// Sends HTTP POST request to backend
axios.post('http://localhost:5002/api/users', userData, {
  headers: { 'x-admin-id': adminId }
});
```

#### 3. **Backend Route** (`Backend_/routes/userRoutes.js`)
```javascript
// Express route handler
router.post('/', userValidation, createUser);
```

#### 4. **Middleware** (`Backend_/utils/authMiddleware.js`)
```javascript
// Verifies admin authentication
export const adminAuth = (req, res, next) => {
  const adminId = req.headers['x-admin-id'];
  // Verify JWT token, set req.user
  next();
};
```

#### 5. **Controller** (`Backend_/controllers/userController.js`)
```javascript
export const createUser = async (req, res) => {
  // Business logic
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    adminId: req.user.id  // Link to admin
  });
  res.json({ success: true, data: user });
};
```

#### 6. **ORM (Sequelize)** (`Backend_/models/User.js`)
```javascript
// Sequelize converts JavaScript to SQL
User.create({ ... })
// → Executes: INSERT INTO users (name, email, admin_id) VALUES (?, ?, ?)
```

#### 7. **Database** (`Backend_/database/kaka_wallet.sqlite`)
```sql
-- SQLite executes the INSERT statement
-- New row added to users table
```

#### 8. **Response Flow** (Back to Frontend)
```
Database → Sequelize → Controller → Route → Frontend
```

---

### Database Operations Flow

#### When Server Starts (`Backend_/app.js`):

1. **Import database config**
   ```javascript
   import { testConnection, syncDatabase } from './config/database.js';
   ```

2. **Test connection**
   ```javascript
   testConnection();  // Checks if database file exists and is accessible
   ```

3. **Sync database**
   ```javascript
   syncDatabase();  // Creates tables if they don't exist
   ```

4. **Import models** (inside `syncDatabase`)
   ```javascript
   await import('../models/User.js');
   await import('../models/Transaction.js');
   // ... other models
   ```

5. **Create tables**
   ```javascript
   await sequelize.sync();  // Generates CREATE TABLE statements
   ```

#### When Making Queries:

1. **Controller calls model method**
   ```javascript
   const users = await User.findAll({ where: { isAdmin: false } });
   ```

2. **Sequelize generates SQL**
   ```sql
   SELECT * FROM users WHERE is_admin = 0;
   ```

3. **SQLite executes query**
   - Reads from `kaka_wallet.sqlite` file
   - Returns rows

4. **Sequelize converts to JavaScript objects**
   ```javascript
   // Returns array of User instances
   [
     { id: 1, name: 'John', email: 'john@example.com', ... },
     { id: 2, name: 'Jane', email: 'jane@example.com', ... }
   ]
   ```

5. **Controller sends JSON response**
   ```javascript
   res.json({ success: true, data: users });
   ```

---

## 🎓 Key Concepts Summary

### 1. **Why Two Backends?**
- `Backend_/` = Traditional server (Render, Railway, Heroku)
- `api/` = Serverless functions (Vercel)

### 2. **Database Types**
- **SQLite** = File-based, local development (`Backend_/`)
- **PostgreSQL** = Server-based, production (`api/`)

### 3. **ORM (Sequelize)**
- Converts JavaScript objects to SQL queries
- Models define table structure
- Relationships link tables together
- Virtual fields calculate values on-the-fly

### 4. **Data Flow**
```
Frontend → API Service → Express Route → Controller → Sequelize ORM → SQLite/PostgreSQL
```

### 5. **Main Features**
- **Money Keeping**: Track money given/returned to people
- **Loans**: Track loans given/repaid
- **Multi-admin**: Each admin has their own data (via `adminId`)
- **Auto-backup**: Database backed up every 24 hours

---

## 🚀 Quick Reference

### Start Backend (Local)
```bash
cd Backend_
npm install
npm start  # Runs on http://localhost:5002
```

### Database Location
- **SQLite**: `Backend_/database/kaka_wallet.sqlite`
- **PostgreSQL**: Connection string in `DATABASE_URL` env variable

### Main Models
- `User` → `users` table (admins + people)
- `Transaction` → `transactions` table (money keeping)
- `LoanPerson` → `loan_persons` table
- `Loan` → `loans` table

### Main Endpoints
- `POST /api/users/admin` - Create admin
- `POST /api/users/login` - Login
- `GET /api/users` - Get all people
- `POST /api/users/:userId/transactions` - Add transaction
- `GET /api/loans` - Get all loans
- `GET /api/users/dashboard/stats` - Dashboard statistics

---

## 📚 Additional Resources

- **Sequelize Docs**: https://sequelize.org/docs/v6/
- **SQLite Docs**: https://www.sqlite.org/docs.html
- **Express.js Docs**: https://expressjs.com/

---

**Need help?** Check the code comments in each file for detailed explanations!

