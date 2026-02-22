# 🐾 PetLove

**PetLove** is an application designed to help users browse pets, save favorites, view details, add their own pets, read news, and manage their profile. Built with **React + TypeScript**, and **React Query** for efficient data handling.

---

## ✨ Features

### Search & Filters

- 🔍 Search pets by name or keyword
- 🏷 Filter by category (sell/free), species (cat, dog, fish), sex, and location
- ⭐ Sort by popularity or price

### Pet Details

- 🖼 Photo, name, species, category, age, sex
- 💬 Description/comment
- 💰 Price (if for sale)
- ⭐ Add to Favorites

### Favorites

- 🌟 Add/remove pets from favorites
- 💾 Stored in **LocalStorage** for guests or in backend for logged-in users
- 💖 UI heart reflects favorite status

### Authentication

- 🔐 User registration & login via backend API (Swagger)
- 👤 Persistent user state
- 🚪 Logout

### Profile

- 🧍 Display username and avatar
- 🐾 User’s pets
- ⭐ User’s favorite pets
- 🗑 Ability to delete pets or remove favorites

### Modals

- 📩 Meeting request / contact pet owner
- ℹ️ Pet details (`ModalNotice`)
- ⚠️ Attention modal for unauthenticated actions

### Pagination / Infinite Scroll

- 🔄 Load pets by page or “load more”
- 🧩 Uses **React Query** for caching and query invalidation

---

## 🧩 Tech Stack

| Technology                 | Purpose                          |
| -------------------------- | -------------------------------- |
| React + TypeScript         | UI + type safety                 |
| React Router               | Client-side routing              |
| React Query                | Data fetching + caching          |
| Firebase Auth              | Authentication                   |
| Firebase Realtime Database | Pets, favorites, views storage   |
| Context API / Zustand      | Global state (modals, loader)    |
| LocalStorage               | Favorites persistence for guests |
| Axios                      | HTTP requests                    |
| CSS Modules                | Scoped styling                   |

---

## 🖥 Deployment

- 🌐 Firebase Hosting
- ▲ Vercel
- 🌐 Netlify
