import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BookmarkProvider, useBookmarks } from "./context/BookmarkContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import HomePage from "./pages/HomePage.jsx";
import QuestionDetailsPage from "./pages/QuestionDetailsPage.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import "./App.css";

function AppShell() {
  const [forceMock, setForceMock] = useState(false);
  const { toast, dismissToast } = useBookmarks();

  return (
    <div className="app-layout-wrapper">
      <Navbar forceMock={forceMock} setForceMock={setForceMock} />

      <Toast toast={toast} onDismiss={dismissToast} />

      <main className="main-content-area">
        <Routes>
          <Route path="/" element={<HomePage forceMock={forceMock} />} />
          <Route path="/questions/:questionId" element={<QuestionDetailsPage forceMock={forceMock} />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BookmarkProvider>
      <AppShell />
    </BookmarkProvider>
  );
}

export default App;
