# Explore San Andreas 🧭

A GTA-inspired Flask blog where users can share stories, media, and discoveries across the fictional world of San Andreas. Includes image/video uploads, dark mode, filters, and a retro-styled UI.

## 🚀 Features

- 📝 User registration & authentication
- 📸 Create posts with image or video uploads
- 🔍 Filter posts by author
- ⏳ Sort posts by date
- 🌓 Toggle dark mode
- ⚡ Live AJAX filtering without reloads
- 🎨 Responsive & nostalgic UI styling

## 📁 Project Structure

Explore-SanAndreas/
├── app.py # Flask app & routes
├── schema.sql # Database schema
├── static/
│ ├── style.css # Custom CSS
│ └── uploads/ # Media storage
├── templates/
│ ├── base.html # Shared layout
│ ├── index.html # Homepage with filters
│ ├── auth/ # Register & login
│ └── blog/ # Create/edit posts
├── utils/
│ └── filters.js # Client-side AJAX filtering
└── README.md