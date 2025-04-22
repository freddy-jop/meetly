# 📅 Meetly – A Simple Calendly Clone

**Meetly** is a lightweight, fullstack appointment scheduling app built with the latest technologies. It allows users to define their availability and enables visitors to book meetings without creating an account.

Built with **Next.js 15 App Router**, **Tailwind CSS**, **Shadcn UI**, **Prisma**, and **BetterAuth**.

---

## 🚀 Tech Stack

| Tech           | Purpose                                         |
| -------------- | ----------------------------------------------- |
| `Next.js 14`   | App Router, server components, API routes       |
| `Tailwind CSS` | Utility-first CSS styling                       |
| `shadcn/ui`    | Reusable UI components with headless primitives |
| `Prisma ORM`   | PostgreSQL database access                      |
| `Neon`         | Serverless PostgreSQL hosting                   |
| `BetterAuth`   | Simple email/password authentication            |
| `Zod`          | Schema validation for API safety                |

---

## 🧩 Features

- ✅ Register/Login with hashed passwords
- ✅ JWT authentication via HttpOnly cookies
- ✅ Dashboard for availability management
- ✅ Public booking page per user (e.g. `/john-doe`)
- ✅ Time-slot based scheduling
- ✅ Client & server validation (Zod + Toasts)
- ✅ Prevent double-booking
- ✅ Responsive and modern UI
- ✅ Ready for Vercel deployment

---

## 🖥️ App Overview

### 👤 User (Admin)
- Register, login and manage your availability (days & times)
- View upcoming appointments

### 🌐 Visitor
- Access a user’s public booking page
- Choose an available slot and submit your name/email
- Receive confirmation instantly

---

**\## 🧱 Project Structure (not yet final)**

├── app/                       # content route app

│   ├── register/              # User registration page

│   ├── login/                 # User login page

│   ├── dashboard/             # User dashboard for availability management

│   └── api/

│       ├── auth/              # API routes for register/login

│       ├── book/              # API route to handle bookings

│       └── availability/      # API to fetch user availabilities

│

├── utils/                     # date check function

├── components/

│   ├── ui/                    # UI components from shadcn/ui

│   └── custom/                # Custom components (e.g. forms, calendar)

│

├── prisma/

│   └── schema.prisma          # Database schema definition

│

├── lib/

│   └── prisma.ts              # Prisma client singleton

│

├── tailwind.config.js         # Tailwind CSS configuration

├── .env.local                 # Environment variables (DB URL, JWT secret)


---

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/freddy-jop/meetly.git
cd meetly
npm install
npm run dev