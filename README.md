# FEAssessment (Getting Started )
## Tech Stack

Angular (standalone components, esbuild-based builder)
Prime ng (Aura theme) — data table, cell editing, column resizing, progress spinner, rating
Tailwind CSS v3 — layout and spacing utilities
rxJS— handling HTTP calls in the SWAPI service
karma + jasmine — unit testing

## Getting Started
-- npm install
-- ng serve

-- Open http://localhost:4200 
-- Run Tests
-- ng test

## Data Source

[SWAPI](https://swapi.dev) `starships` endpoint 
— real paginated data (10/page)
- good fit for testing pagination and infinite scroll.
- read only data source

## Features

-- Infinite Scroll with page caching
-- CLient-side name search
-- Empty Search State
-- Editable Name
-- Column Resizing 
-- Loading Indicators 
-- Responsive data grid
-- Error-Handling th page level retry

## Tests

1. `swapi.service.spec.ts` — page fetch + cache hit behavior
2. `starship-grid.component.spec.ts` — component creation + search filtering

## Notes

-- Cell edits are stored in memory only
-- SWAPI is read-only,  changes are not presisted
-- Search is Client-side ( doesnot provide search parameter)

