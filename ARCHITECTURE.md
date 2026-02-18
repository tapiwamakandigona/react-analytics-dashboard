# Architecture

## Overview

React SPA with custom hooks for data and custom SVG charts.

## Components

```
App
├── Sidebar       # Navigation with collapse
├── Header        # Date range selector
├── KPICards      # 4 metric cards with trends
├── RevenueChart  # Bar chart (custom CSS)
├── UsersChart    # Line chart (SVG polyline)
└── DataTable     # Transaction table with badges
```

## Data Flow

`useAnalyticsData(range)` hook generates deterministic mock data based on the selected date range. Uses seeded random for consistent visualization across renders.

## Charts

All charts are custom-built:
- Revenue: CSS flexbox bars with percentage height
- Users: SVG polyline with calculated viewBox
- No external chart library dependency
