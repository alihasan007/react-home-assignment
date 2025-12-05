# React PI Drift Assignment

## Assignment Overview

Your task is to build a React-based Single Page Application (SPA) that visualizes planned versus actual progress for Epics and Iterations. This assignment is a simplified version of a PI Drift Tracker dashboard.

## Submission Instructions

To complete this assignment, please fork this repository and provide a public URL to your GitHub repository.

## Goals

This assignment aims to assess your real-world frontend engineering capabilities, specifically evaluating:

-   **Architecture and Component Design:** How you structure your application and design reusable components.
-   **API Handling:** Your approach to integrating with backend services.
-   **React Performance & Rendering Patterns:** Your understanding and application of performance optimization techniques in React.
-   **Testing Discipline:** Your ability to write effective unit and integration tests.
-   **UI Problem-Solving Ability:** Your approach to solving user interface challenges.

## Requirements

### 1. Project Setup

You are required to set up the project with the following:

-   **React + Vite** (preferred) or Create React App (CRA).
-   **TypeScript** is mandatory.
-   **ESLint + Prettier** for code quality and formatting.
-   A well-thought-out **folder structure** based on best practices.
-   **Absolute imports** (e.g., `@/components/Chart`).
-   `.env` file for API configurations.

### 2. API Integration

You will integrate with the following mock endpoints:

-   `GET /api/iterations`
-   `GET /api/epics`
-   `GET /api/epics/:id`

It is recommended to use **Mock Service Worker (MSW)** for API mocking.

**Dataset Example:**

-   **Iterations:** Include `Iteration-1`, `Iteration-2`, `Iteration-3`.
-   **Each Epic:** Contains `plannedPoints`, `completedPoints`, `owner`, `riskLevel` (low, medium, high), and `teamName`.

### 3. Dashboard UI Requirements

The dashboard must include the following UI components:

#### A. Epic Summary Table

Columns required:

-   Epic Name
-   Planned Points
-   Completed Points
-   Drift %
-   Owner
-   Risk Indicator

#### B. Iteration-wise Bar Chart

-   **X-axis:** Iterations
-   **Y-axis:** Completed Points
-   Display one bar per Epic.
-   You may use charting libraries like `recharts` or `nivo`.

#### C. Epic Detail Panel

-   When a row in the Epic Summary Table is clicked, an expanded view (e.g., a drawer or modal) should appear.
-   This panel should include the epic's description, risk factors, and team information.

### 4. State Management

You must choose one of the following state management libraries/patterns and justify your choice in the `README.md`:

-   Redux Toolkit
-   Zustand
-   React Query + Context

### 5. Required Features

Implement the following features:

-   Global loading and error handling.
-   Reusable `Table`, `Card`, and `ChartWrapper` components.
-   An API wrapper with interceptors.
-   A responsive layout.
-   Debounced search functionality for epics.
-   A dropdown to filter epics by team.

### 6. Performance Optimization

Address performance considerations by:

-   Avoiding unnecessary re-renders.
-   Using `React.memo` where applicable.
-   Properly utilizing `useCallback` and `useMemo`.
-   Implementing a virtualized table (e.g., `react-virtual`) if the number of epics exceeds 200.
-   Lazy-loading the epic detail drawer.

### 7. Custom Hooks

Create the following custom hooks:

-   `useEpics()`
-   `useIterations()`
-   `useEpicFilters()`
-   `useApi()`

These hooks must handle:

-   Caching
-   Invalidation
-   Pagination (even if the backend is mocked)

### 8. Error Boundary

Implement an Error Boundary to provide a user-friendly fallback screen for rendering errors.

### 9. Routing

Use `react-router` for the following routes:

-   `/dashboard`
-   `/epic/:id`

### 10. UI Theme + Reusable Components

-   Choose either **TailwindCSS** or **SCSS modules** for styling.
-   Demonstrate good component composition.
-   Create reusable components such as:
    -   Button
    -   Card
    -   Badge
    -   Loader
    -   Panel / Drawer

### 11. Testing Requirements

At a minimum, include:

-   **Unit tests** (using Jest + React Testing Library).
-   **Hook tests** (covering mock API scenarios).
-   **Integration tests** for:
    -   API loading states.
    -   Table row click leading to detail modal opening.

**Bonus points** will be awarded for:

-   End-to-End (E2E) tests using Cypress.
