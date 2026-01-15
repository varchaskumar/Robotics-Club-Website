# 🤖 Robotics Club NIT Patna - Official Website

> **"Code for Future Robotics"** - Web Development Challenge 2025-2026 Submission

## 📖 Project Overview
This repository contains the source code for the official website of the **Robotics Club, NIT Patna**. The project was built as part of the Web Development Challenge to create a responsive, futuristic, and user-friendly platform that showcases the club's projects, events, and achievements.

The design follows a **"Cyber-Robotics" aesthetic**, utilizing Glassmorphism, Neon Glow effects, and a 3D particle background to reflect the innovative nature of the club.

**🔗 Live Demo:**  https://varchaskumar.github.io/Robotics-Club-Website/

---

## 🛠️ Technology Stack
I have chosen a **Vanilla Tech Stack** (HTML5, CSS3, JavaScript) for this project

### [cite_start]Why this choice?
1.  **Performance:** By avoiding heavy frameworks, the website loads instantly with zero bundle overhead.
2.  **Customization:** Writing raw CSS allowed for precise control over the complex "Glassmorphism" and "Neon" visual effects without fighting framework defaults.
3.  **Foundation:** This approach ensures a solid understanding of DOM manipulation and CSS Grid/Flexbox layouts.
4.  **Dependencies:** Minimal external dependencies (only Three.js and FontAwesome) ensure the site is robust and easy to maintain.

---

## 🌟 Key Features
* **8 Complete Pages:** Home, About, Projects, Events, Team, News, Achievements, Contact
* **3D Interactive Background:** Implemented using **Three.js** for an immersive user experience.
* **Fully Responsive:** optimized for Mobile, Tablet, and Desktop screens
* **Dynamic Filtering:** JavaScript-based filtering for Projects (Drone, AI, IoT) and News categories
* **Interactive Elements:**
    * Neon Hover Effects
    * Mobile Hamburger Menu
    * Live Statistics Counter
    * Sortable Event Lists

---

## 📂 File Structure
The project follows a modular structure to ensure future scalability:

```text
/robotics-website
│
├── index.html          # Home Page
├── about.html          # About Us & History
├── projects.html       # Project Showcase with Filters
├── events.html         # Events Calendar
├── team.html           # Core Team & Faculty
├── news.html           # Tech Chronicles
├── achievements.html   # Hall of Fame
├── contact.html        # Contact Form & Map
│
├── css/
│   └── main.css        # Unified Stylesheet (Global + Page Specific)
│
├── js/
   └── main.js         # Global Scripts (Nav, 3D Bg, Interactions)
                       # Asset Directory
