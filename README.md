# 📅 Meetly – A Simple Calendly Clone

**Meetly** is a lightweight, fullstack appointment scheduling app built with the latest technologies. It allows users to define their availability and enables visitors to book meetings without creating an account.

Built with **Next.js 15 App Router**, **Tailwind CSS**, **Shadcn UI**, **Prisma**, and **BetterAuth**.

---

## 🚀 Tech Stack

| Tech              | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `Next.js 15`      | App Router, server components, API routes       |
| `React 19`        | Building UI components                          |
| `TypeScript 5`    | Static typing for JavaScript                    |
| `Zod`             | Schema validation for forms                     |
| `React Hook Form` | Form handling and validation                    |
| `React Query`     | Data fetching, caching and synchronization      |
| `React Day Picker`| Calendar and date picker component              |
| `Tailwind CSS`    | Utility-first CSS styling                       |
| `shadcn/ui`       | Reusable UI components with headless primitives |
| `Prisma ORM`      | PostgreSQL database access                      |
| `Neon`            | Serverless PostgreSQL hosting                   |
| `BetterAuth`      | Simple email/password authentication            |
| `Zustand`         | Lightweight state management                    |
| `Axios`           | HTTP client for API communication               |
| `React Hot Toast`  | Notifications for user feedback                 |

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

## User Workflow 🧑‍💻

- ✅ [Calendar 📅] : The user selects an available day.
- ✅ [Fetch available time slots API 🔄] : Dynamically retrieves possible slots for the selected day.
- ✅ [Smart form ✉️] : The form is automatically pre-filled based on the entered email.
- ✅ [Time slot selection ⏰] : The user picks a specific time.
- ✅ [Appointment confirmation ✅] : Sends the booking to the server.
- ✅ [Redirect to confirmation page 🎉] : The appointment is confirmed and displayed to the user.

---

**\## 🧱 Project Structure (not yet final)**

├── app/                       # content route app

│   ├── signup/              # User registration page

│   ├── login/                 # User login page

│   ├── dashboard/             # User dashboard for availability management

│   ├── confirmation/[visitor]/      # Confirmation Page after Booking

│   ├── user/[username]/      # Select a date and time slot to book an appointment

│   └── api/

│       ├── auth/              # API route to handle Better-Auth for register/login

│       ├── book/              # API route to handle bookings

│       ├── apointments/       # API route to handle appointment for connected user

│       ├── slots/              # API route to handle time slots

│       └── availability/      # API to fetch user availabilities

│

├── lib/                      # date check function and authentication users

├── components/

│   ├── ui/                    # UI components from shadcn/ui

│   └── custom/                # Custom components (e.g. forms, calendar)

│

├── prisma/

│   └── schema.prisma          # Database schema definition

│

├── auth/

│   └── prisma.ts              # Prisma client singleton

│

├── .env.local                 # Environment variables (DB URL, JWT secret)


---

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/freddy-jop/meetly.git
cd meetly
npm install
npm run doc
npm run dev
