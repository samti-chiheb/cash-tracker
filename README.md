# Cash Tracker - Next.js 14

## Overview
**Cash Tracker** is a full-stack budget management application built with **Next.js 14**. It allows users to efficiently and intuitively track their finances.

## Features

### Transaction Management
- Add, edit, and delete transactions.
- Organize expenses and income by categories.
- Support for multiple currencies.

### Detailed Financial Statistics
- Interactive charts to visualize expenses and income.
- Track financial trends over different periods (monthly, yearly, etc.).
- Categorized transactions for better analysis.

### Customization & UX
- Modern user interface with **Tailwind CSS** and **Shadcn UI**.
- Icon selector for quick identification of different expense categories.
- Light and dark mode for enhanced visual comfort.

### Security & Authentication
- User authentication and management with **Clerk**.
- Role and permission management for secure data access.

### Database & Performance
- Transactions stored using **Prisma ORM**, supporting **SQLite** and **PostgreSQL**.
- Optimized queries with **React-Query** for better responsiveness.

### Deployment & Accessibility
- Hosted on **Vercel** for fast and efficient deployment.
- Fully responsive interface optimized for **mobile** and **tablet** users.

## Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, Shadcn UI
- **Backend:** Next.js API Routes, Server Actions
- **Database:** Prisma ORM, SQLite / PostgreSQL
- **State Management:** React-Query for caching and data synchronization
- **Security:** Clerk for authentication and user management
- **Data Visualization:** Recharts for displaying financial data with interactive charts

## Purpose
This project enables **efficient financial management** for personal or business use, offering precise tracking of transactions and budget trends.

## 📌 Getting Started

### Clone the repository
```bash
git clone https://github.com/your-username/cash-tracker.git
cd cash-tracker
```

### Install dependencies
```bash
yarn install
# or
npm install
```

### Set up environment variables
Create a `.env.local` file and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZXF1aXBwZWQtZmxlYS04MC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_0g88xVH330dsIjDeMei01IqnM8KMw9dpFBVOfs2VqS

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/wizard

NEXT_PUBLIC_SEEDED_USER_ID=user_2sdrInjp9MIarkQMVJBtw16tAlf

NODE_ENV=development
```

### 4️⃣ Run database migrations and seed data
```bash
npx prisma migrate dev --name init
npx prisma db seed
```
This will add initial data to the specified account ID.

### 5️⃣ Run the application
```bash
yarn dev
# or
npm run dev
```
The app will be available at `http://localhost:3000`

### 6️⃣ Deploy to Vercel
```bash
vercel
```

## 📌 Contributing
Pull requests are welcome! Feel free to submit issues or suggest new features.

## 📜 License
This project is licensed under the **MIT License**.
