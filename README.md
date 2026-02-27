<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Analytics%20Dashboard&fontSize=50&animation=fadeIn&fontAlignY=38&desc=React%20%2B%20Recharts%20Real-Time%20Data%20Viz&descAlignY=51&descAlign=62" />
</div>

<h1 align="center">React Analytics Dashboard</h1>

<div align="center">
  <p><strong>A real-time analytics dashboard with interactive charts, KPI cards, and responsive data tables. Built with React, TypeScript, and Recharts.</strong></p>
  
  <p>
    <a href="https://tapiwamakandigona.github.io/react-analytics-dashboard/"><img src="https://img.shields.io/badge/Live_Demo-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
    <img src="https://img.shields.io/github/languages/top/tapiwamakandigona/react-analytics-dashboard?style=for-the-badge&color=blue" alt="Top Language" />
    <img src="https://img.shields.io/github/last-commit/tapiwamakandigona/react-analytics-dashboard?style=for-the-badge&color=green" alt="Last Commit" />
  </p>
</div>

---

## ⚡ What This Demonstrates

This project showcases **complex data visualization** in React — the kind of work that enterprise SaaS dashboards require. It implements composable chart components, responsive grid layouts, and real-time KPI state management without external state libraries.

<br/>

## 📊 Dashboard Components

| Widget | Implementation | Data Source |
|--------|---------------|-------------|
| **Line Charts** | `Recharts` `<LineChart>` with custom tooltips | Time-series revenue data |
| **Bar Charts** | Stacked/grouped comparison views | Category breakdown |
| **KPI Cards** | Animated number counters with trend arrows | Aggregated metrics |
| **Data Tables** | Sortable, filterable with pagination | Raw transaction logs |
| **Date Picker** | Custom range selector for filtering | User interaction |

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript
- **Charts:** Recharts (composable D3-based)
- **Styling:** CSS Modules
- **Build:** Vite
- **CI/CD:** GitHub Actions → GitHub Pages

---

## 🏗️ Architecture

```mermaid
graph TD;
    App[Dashboard App] --> KPI[KPI Card Grid];
    App --> Charts[Chart Container];
    App --> Table[Data Table];
    Charts --> Line[Line Chart];
    Charts --> Bar[Bar Chart];
    KPI --> Calc[Metrics Calculator];
    Table --> Sort[Sort/Filter Engine];
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/tapiwamakandigona/react-analytics-dashboard.git
cd react-analytics-dashboard
npm install
npm run dev
```

---

<div align="center">
  <b>Built by <a href="https://github.com/tapiwamakandigona">Tapiwa Makandigona</a></b>
  <br/>
  <i>⭐ Star if you need a Recharts dashboard reference!</i>
</div>
