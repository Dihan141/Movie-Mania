# 🎬 Movie Mania

**Movie Mania** is a sleek, responsive movie search app built with **Vite + React**, powered by **The Movie Database (TMDb) API**. Users can search for movies, view trending titles, and enjoy a smooth, fast-loading experience. 

![Movie Mania Banner](./frontend/public/hero.png)

---

## 🚀 Live Demo

👉 [Visit Movie Mania on Vercel](https://movie-mania-lilac.vercel.app/)

---

## ✨ Features

- 🔍 **Search for Movies**: Debounced input to reduce unnecessary API calls
- 🔥 **Trending Section**: Displays the most searched or trending movies
- 🎬 **Movie Details**: Clean and minimal UI showing posters and titles
- ⚡ **Fast & Lightweight**: Powered by Vite for blazing-fast development and builds
- ☁️ **Backend Integration**: Uses Appwrite for tracking search popularity

---

## 📦 Tech Stack

- **Frontend**: React + Vite
- **State Management**: React Hooks
- **Styling**: Tailwind CSS (and custom CSS)
- **API**: [TMDb API](https://developer.themoviedb.org/)
- **Backend**: Appwrite (for storing trending data)

---

## 📁 Project Structure
```bash
Movie-Mania/
├── public/
│   └── index.html              # Root HTML file
├── src/
│   ├── appwrite/               # Appwrite integration logic (e.g., fetch trending)
│   ├── components/             # Reusable UI components (Search, Spinner, MovieCard)
│   ├── App.css                 # Global and custom styles
│   ├── App.jsx                 # Main app component and logic
│   └── main.jsx                # Entry point for React app
```

## 🔧 Getting Started

### Prerequisites

- Node.js (v16+)
- TMDb API Key
- Appwrite Project

### Installation

```bash
git clone https://github.com/Dihan141/Movie-Mania.git
cd Movie-Mania
npm install
```
## ⚙️ Setup Environment
```bash
VITE_TMDB_API_KEY="TMDB API KEY"

VITE_APPWRITE_PROJECT_ID="APPWRITE PROJECT ID"
VITE_APPWRITE_DATABASE_ID="APPWRITE DATABASE OD"
VITE_APPWRITE_COLLECTION_ID="APPWRITE COLLECTION ID"

```
Create a .env file in root and paste this with your info

## 🌐 API Usage
This project uses the TMDb API to fetch movie data and Appwrite to store and retrieve trending search data.

## 🙌 Acknowledgements

Special thanks to the awesome platforms and tools that made this project possible:

- [TMDb](https://www.themoviedb.org/) – for the movie data API  
- [Appwrite](https://appwrite.io/) – for backend-as-a-service features  
- [Vercel](https://vercel.com/) – for effortless deployment  


