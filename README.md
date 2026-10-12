# Stack Overflow Question Explorer — Formative Assessment 2 (FA2)

> **MCA Semester III — Advanced Web Technologies Mini Project (Phase II)**  
> **Pimpri Chinchwad College of Engineering (PCCOE), Pune**  
> **Academic Year:** 2026–2027  
> **Repository:** [https://github.com/AmitChame/STACK-OVERFLOW-QUESTION-EXPLORER](https://github.com/AmitChame/STACK-OVERFLOW-QUESTION-EXPLORER)  
> **Live Web Application (GitHub Pages):** [https://amitchame.github.io/STACK-OVERFLOW-QUESTION-EXPLORER/](https://amitchame.github.io/STACK-OVERFLOW-QUESTION-EXPLORER/)  

---

## 1. Student and Academic Information

- **Student Name:** Amit Sanjay Chame
- **Permanent Registration Number (PRN):** 125M1H020
- **Department:** Department of Computer Applications (MCA)
- **Class & Semester:** SYMCA, Semester III
- **Course Title:** Advanced Web Technologies
- **Faculty Project Guide:** Prof. Dr. Avinash Chormale
- **Assessment Type:** Formative Assessment 2 (FA2)
- **Project Title:** Stack Overflow Question Explorer
- **GitHub Repository:** [https://github.com/AmitChame/STACK-OVERFLOW-QUESTION-EXPLORER](https://github.com/AmitChame/STACK-OVERFLOW-QUESTION-EXPLORER)
- **Live Deployment URL:** [https://amitchame.github.io/STACK-OVERFLOW-QUESTION-EXPLORER/](https://amitchame.github.io/STACK-OVERFLOW-QUESTION-EXPLORER/)

---

## 2. Project Overview

The **Stack Overflow Question Explorer** is an interactive, responsive React single-page application (SPA) developed to streamline the discovery, analysis, and preservation of programming solutions. Building directly upon the foundational prototype created in FA1, this Formative Assessment 2 (FA2) version implements:

1. **Real REST API Integration:** Direct communication with the public **Stack Exchange REST API v2.3** (`https://api.stackexchange.com/2.3`) to retrieve live Stack Overflow questions, metadata, and community answers.
2. **Client-Side Routing:** Declarative navigation powered by **React Router DOM v7** (`HashRouter`) across Home Explorer (`/`), Dynamic Question Details (`/questions/:questionId`), Bookmarks CRUD Manager (`/bookmarks`), About & Candidate Credentials (`/about`), and an accessible 404 handler.
3. **Persistent CRUD Bookmark Manager:** Full Create, Read, Update (study notes & topic collections), and Delete capabilities stored locally in browser `LocalStorage`.
4. **Security Sanitization:** Client-side HTML sanitization using **DOMPurify** to eliminate Cross-Site Scripting (XSS) risks from API-rendered markup.
5. **Quality Assurance:** 14 automated unit and integration tests executed with **Vitest** and **React Testing Library**, achieving a 100% pass rate.
6. **Continuous Deployment (CI/CD):** Automated deployment via **GitHub Actions** building and publishing the application directly to **GitHub Pages**.
7. **Resilient Fallback Mode:** Automatic fallback to verified local datasets during network disconnections or Stack Exchange daily rate-limiting (300 requests/day).

---

## 3. Technology Stack

| Layer / Role | Technology | Description |
|---|---|---|
| **Core UI Framework** | React 18.2.0 | Declarative component architecture using Functional Components & Hooks |
| **Routing Library** | React Router DOM v7.18.4 | Client-side routing with `HashRouter` for GitHub Pages static hosting |
| **Build Tool & Dev Server** | Vite 5.4.21 | Rapid ES module-based development server and production bundler |
| **Styling** | Vanilla CSS3 | Custom design system using CSS variables, Flexbox, and Grid |
| **HTML Sanitization** | DOMPurify 3.4.17 | Strict allowlist HTML sanitizer preventing XSS injection |
| **Automated Testing** | Vitest 2.1.9 + RTL | Fast unit and integration test runner with `@testing-library/react` and `jsdom` |
| **Iconography** | Lucide React 1.55.0 | Clean, accessible SVG icons |
| **Data Provider** | Stack Exchange REST API v2.3 | Official public API for Stack Overflow questions and answers |
| **Persistence** | Web Storage API (LocalStorage) | Key-value client-side persistence for bookmarks and personal notes |
| **Deployment & CI/CD** | GitHub Pages & GitHub Actions | Automated build, test, and static hosting pipeline |

---

## 4. Key Features Implemented

### A. Home & Explore Page
- **Hero Section:** Academic banner with project subtitle and topic description.
- **Debounced Search Bar:** Throttles user input by 400ms via custom hook `useDebounce`, preserving API quota and validating against whitespace submissions.
- **Topic Filter Pills:** One-click topic filtering across `All`, `javascript`, `reactjs`, `python`, `html`, `css`, `node.js`, and `typescript`.
- **Sorting Controls:** Sort questions dynamically by **Highest Votes / Score**, **Recently Created**, or **Recently Active**.
- **Question Cards:** Displays vote count, answer count (with accepted highlight), view count, tags, author avatar, reputation, formatted dates, and a View Details action.
- **Pagination:** Clean Previous/Next controls with current page display.
- **Reset Action:** Restores search, topic filter, sort order, and pagination in a single click.

### B. Dynamic Question Details Page
- Dynamic parameter parsing using `useParams()` with non-numeric ID validation.
- Safe rendering of the complete question body via `DOMPurify`.
- Author profile card displaying avatar, name, and reputation points.
- Community answers list with accepted solution highlights (`✓ Accepted Solution`), vote scores, and answered dates.
- Direct external link to the original Stack Overflow discussion.
- Instant bookmark toggle button and link sharing capability.

### C. Persistent CRUD Bookmarks Manager
- **Create:** Click the bookmark icon on any question card to save it. Duplicate prevention alerts the user if already saved.
- **Read:** Dedicated Bookmarks page displaying all saved questions with timestamps and collection badges.
- **Update:** Inline note editor allowing users to attach personal study notes (up to 300 characters) and organize questions into collections (e.g. *React Prep*, *Exam Review*).
- **Delete:** Individual deletion via trash icon and bulk "Clear All" with confirmation.
- **Persistence:** Synchronized automatically to `localStorage` under `so_explorer_bookmarks_fa2`.

### D. About & Academic Credentials Page
- Candidate and academic information: Student name, PRN, course, semester, guide, and institute.
- Architecture summary, functional rubric checklist, and technology badges.
- Official API attribution statement under CC BY-SA 4.0.

---

## 5. Project Folder Structure

```
C:\MCA\Advanced Web Technology\FA2\
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Actions CI/CD deployment workflow
├── public/
│   └── 404.html                        # GitHub Pages SPA 404 fallback
├── src/
│   ├── api/
│   │   ├── mockData.js                 # Enriched fallback dataset (includes FA1 questions)
│   │   └── stackExchangeApi.js         # API client with AbortController, backoff, & fallback
│   ├── components/
│   │   ├── AnswerCard.jsx              # Answer card with accepted badge & DOMPurify sanitization
│   │   ├── BookmarkButton.jsx          # Reusable bookmark toggle button
│   │   ├── EmptyState.jsx              # Friendly empty result prompt with reset CTA
│   │   ├── ErrorMessage.jsx            # Alert banner with retry action
│   │   ├── Footer.jsx                  # Academic credentials & Stack Overflow attribution
│   │   ├── LoadingIndicator.jsx        # Animated spinner & skeleton loading cards
│   │   ├── Navbar.jsx                  # Responsive navbar with drawer, badges & demo toggle
│   │   ├── Pagination.jsx              # Accessible page navigation controls
│   │   ├── QuestionCard.jsx            # Card showing score, answers, tags, author, and actions
│   │   ├── QuestionList.jsx            # Manages loading, error, empty, and card states
│   │   ├── SearchBar.jsx               # Controlled search input with validation & clear button
│   │   ├── SortControls.jsx            # Sort select, min answers filter, reset, & quota badge
│   │   ├── TagFilter.jsx               # Topic pill filter buttons
│   │   └── Toast.jsx                   # Action feedback toast notification
│   ├── context/
│   │   └── BookmarkContext.jsx         # Context & useBookmarks hook for LocalStorage CRUD
│   ├── hooks/
│   │   ├── useDebounce.js              # Custom hook throttling search input by 400ms
│   │   └── useQuestions.js             # Custom hook managing API query state & abort signals
│   ├── pages/
│   │   ├── AboutPage.jsx               # Candidate credentials, architecture & rubric scope
│   │   ├── BookmarksPage.jsx           # CRUD bookmark management with editable notes
│   │   ├── HomePage.jsx                # Main search, tag filter, and question list page
│   │   ├── NotFoundPage.jsx            # 404 error page with return link
│   │   └── QuestionDetailsPage.jsx     # Routed details page with full body & answers
│   ├── test/
│   │   ├── App.test.jsx                # 14 automated unit and integration tests (Vitest)
│   │   └── setup.js                    # Vitest setup configuring @testing-library/jest-dom
│   ├── App.css                         # Comprehensive responsive CSS styling
│   ├── App.jsx                         # Root application shell with route table
│   ├── index.css                       # Modern CSS tokens, typography, and resets
│   └── main.jsx                        # Entry point mounting HashRouter
├── .gitignore                          # Standard development ignore file
├── index.html                          # HTML entry point with viewport and SEO meta
├── netlify.toml                        # Client-side routing redirect config for Netlify
├── package.json                        # Dependencies, scripts, and project metadata
├── package-lock.json                   # Deterministic dependency tree lockfile
├── vercel.json                         # Client-side routing rewrite config for Vercel
└── vite.config.js                      # Vite & Vitest configuration with base path
```

---

## 6. Installation & Execution Guide

### Prerequisites
- **Node.js:** v18.0.0 or later (verified on Node v24.18.0)
- **npm:** v9.0.0 or later (verified on npm v11.16.0)

### Steps to Run Locally

1. **Clone the Repository:**
   ```powershell
   git clone https://github.com/AmitChame/STACK-OVERFLOW-QUESTION-EXPLORER.git
   cd STACK-OVERFLOW-QUESTION-EXPLORER
   ```

2. **Install Dependencies:**
   ```powershell
   npm install
   ```

3. **Start the Development Server:**
   ```powershell
   npm run dev
   ```
   Open your browser at: **`http://127.0.0.1:5173`** (or `http://localhost:5173`)

4. **Run the Automated Test Suite:**
   ```powershell
   npm run test
   ```
   Executes all 14 integration and unit test cases using Vitest.

5. **Build for Production:**
   ```powershell
   npm run build
   ```
   Generates the minified, production-optimized bundle inside the `dist/` directory.

6. **Preview Production Build:**
   ```powershell
   npm run preview
   ```

---

## 7. Automated Test Verification Summary

The automated test suite in `src/test/App.test.jsx` verifies all 14 official evaluation criteria:

```
$ npm run test

 RUN  v2.1.9 C:/MCA/Advanced Web Technology/FA2

 ✓ src/test/App.test.jsx (14 tests) 2326ms
   ✓ 1. Application renders successfully with header, title, and explore view
   ✓ 2. Navigation routes work across Explore, Bookmarks, and About pages
   ✓ 3. Search input updates correctly as user types
   ✓ 4. Tag filtering works when clicking topic pills
   ✓ 5. Sorting select changes value and triggers order adjustment
   ✓ 6. Question cards display expected information (title, votes, answers, tags)
   ✓ 7. Loading and empty states render correctly with informative prompts
   ✓ 8. API errors display an appropriate message with retry button
   ✓ 9. Question detail routing handles invalid IDs gracefully with error banner
   ✓ 10. Bookmarks can be added successfully via BookmarkButton
   ✓ 11. Bookmarks persist across reloads from LocalStorage
   ✓ 12. Bookmarks can be removed cleanly via CRUD delete action
   ✓ 13. Invalid form input displays inline validation message
   ✓ 14. Reset functionality clears filters and restores initial defaults

 Test Files  1 passed (1)
      Tests  14 passed (14)
   Duration  7.78s
```

---

## 8. Deployment to GitHub Pages

The repository utilizes **GitHub Actions** for zero-configuration continuous deployment.

### Automated Workflow (`.github/workflows/deploy.yml`)
1. Triggers automatically on push to the `main` branch.
2. Checks out code and installs dependencies using `npm ci`.
3. Runs all 14 automated tests (`npm run test`).
4. Builds the production bundle with the repository base path (`/STACK-OVERFLOW-QUESTION-EXPLORER/`).
5. Uploads the `dist/` directory and deploys it to GitHub Pages.

### One-Time GitHub Settings Check
In the repository **Settings → Pages**:
- Set **Source** to **GitHub Actions** (if not already selected).
- The deployment URL is published at:
  **`https://amitchame.github.io/STACK-OVERFLOW-QUESTION-EXPLORER/`**

---

## 9. API Attribution & Legal Notice

- Stack Overflow and Stack Exchange are registered trademarks of Stack Exchange Inc.
- Content accessed via the public Stack Exchange REST API v2.3 is distributed under the **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** license.
- This application complies with Stack Exchange API Terms of Use, respects daily request quotas, and implements backoff throttling.

---

## 10. Academic Declaration

I hereby declare that this Formative Assessment 2 (FA2) mini project titled **"Stack Overflow Question Explorer"** is my original work carried out under the supervision of **Prof. Dr. Avinash Chormale** for the course **Advanced Web Technologies** (MCA Semester III, AY 2026–2027) at **Pimpri Chinchwad College of Engineering (PCCOE), Pune**.

**Amit Sanjay Chame**  
PRN: 125M1H020  
SYMCA, Semester III  
Pimpri Chinchwad College of Engineering (PCCOE), Pune  
