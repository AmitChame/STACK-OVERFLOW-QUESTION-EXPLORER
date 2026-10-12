import {
  GraduationCap,
  Layers,
  Code2,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  BookOpen
} from "lucide-react";

export function AboutPage() {
  return (
    <div className="about-page-container" data-testid="about-page">
      {/* Header */}
      <header className="about-hero-section">
        <h1 className="about-title">About the Project & Architecture</h1>
        <p className="about-subtitle">
          Formative Assessment 2 (FA2) Individual Mini Project for Advanced Web Technologies (MCA Semester III).
        </p>
      </header>

      {/* Student & Academic Credentials Card */}
      <section className="academic-credentials-card">
        <div className="credentials-header">
          <GraduationCap size={24} className="cred-icon" />
          <h2>Academic & Candidate Details</h2>
        </div>
        <div className="credentials-grid">
          <div className="cred-item">
            <span className="cred-label">Student Name:</span>
            <span className="cred-value">Amit Sanjay Chame</span>
          </div>
          <div className="cred-item">
            <span className="cred-label">PRN:</span>
            <span className="cred-value">125M1H020</span>
          </div>
          <div className="cred-item">
            <span className="cred-label">Department & Degree:</span>
            <span className="cred-value">Master of Computer Applications (MCA)</span>
          </div>
          <div className="cred-item">
            <span className="cred-label">Class & Semester:</span>
            <span className="cred-value">SYMCA, Semester III</span>
          </div>
          <div className="cred-item">
            <span className="cred-label">Academic Year:</span>
            <span className="cred-value">2026–2027</span>
          </div>
          <div className="cred-item">
            <span className="cred-label">Course Title:</span>
            <span className="cred-value">Advanced Web Technologies</span>
          </div>
          <div className="cred-item">
            <span className="cred-label">Faculty Guide:</span>
            <span className="cred-value">Prof. Dr. Avinash Chormale</span>
          </div>
          <div className="cred-item">
            <span className="cred-label">Institute:</span>
            <span className="cred-value">Pimpri Chinchwad College of Engineering (PCCOE), Pune</span>
          </div>
        </div>
      </section>

      {/* FA2 Objectives & Scope */}
      <section className="about-card">
        <div className="card-heading-row">
          <Layers size={22} className="section-svg-icon" />
          <h2>Project Objectives & FA2 Scope</h2>
        </div>
        <p>
          The <strong>Stack Overflow Question Explorer</strong> is designed to facilitate effortless
          exploration of real-world software engineering queries, answers, and discussions. Building
          upon the foundational phase (FA1), FA2 scales the application with real REST API integration,
          client-side routing, LocalStorage CRUD persistence, and rigorous test coverage.
        </p>
        <div className="feature-checklist-grid">
          <div className="check-feature-item">
            <CheckCircle size={18} className="feature-check-icon" />
            <div>
              <strong>Real API Integration:</strong> Direct consumption of public Stack Exchange API v2.3 with rate-limit and backoff handling.
            </div>
          </div>
          <div className="check-feature-item">
            <CheckCircle size={18} className="feature-check-icon" />
            <div>
              <strong>React Router v7:</strong> Multi-page routed flow for Explorer, Dynamic Question Details, CRUD Bookmarks, and 404 handler.
            </div>
          </div>
          <div className="check-feature-item">
            <CheckCircle size={18} className="feature-check-icon" />
            <div>
              <strong>CRUD Bookmarks:</strong> Create, Read, Update personal notes/collections, and Delete bookmarks stored safely in LocalStorage.
            </div>
          </div>
          <div className="check-feature-item">
            <CheckCircle size={18} className="feature-check-icon" />
            <div>
              <strong>HTML Sanitization:</strong> DOMPurify sanitization preventing Cross-Site Scripting (XSS) from API-provided HTML.
            </div>
          </div>
          <div className="check-feature-item">
            <CheckCircle size={18} className="feature-check-icon" />
            <div>
              <strong>Advanced React Hooks:</strong> Demonstrates useState, useEffect, useMemo, useCallback, and Custom Hooks (useDebounce, useQuestions).
            </div>
          </div>
          <div className="check-feature-item">
            <CheckCircle size={18} className="feature-check-icon" />
            <div>
              <strong>Testing & Performance:</strong> Automated unit/integration tests with Vitest and React Testing Library plus debounced queries.
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="about-card">
        <div className="card-heading-row">
          <Code2 size={22} className="section-svg-icon" />
          <h2>Technology Stack</h2>
        </div>
        <div className="tech-stack-badges">
          <div className="tech-badge">
            <span className="tech-badge-title">Frontend Framework</span>
            <span className="tech-badge-name">React 18.2 (Functional Components & Hooks)</span>
          </div>
          <div className="tech-badge">
            <span className="tech-badge-title">Routing</span>
            <span className="tech-badge-name">React Router DOM v7</span>
          </div>
          <div className="tech-badge">
            <span className="tech-badge-title">Build Tool</span>
            <span className="tech-badge-name">Vite 5</span>
          </div>
          <div className="tech-badge">
            <span className="tech-badge-title">Styling</span>
            <span className="tech-badge-name">Vanilla CSS3 (Responsive Design System)</span>
          </div>
          <div className="tech-badge">
            <span className="tech-badge-title">Sanitization</span>
            <span className="tech-badge-name">DOMPurify (XSS Protection)</span>
          </div>
          <div className="tech-badge">
            <span className="tech-badge-title">Icons</span>
            <span className="tech-badge-name">Lucide React</span>
          </div>
          <div className="tech-badge">
            <span className="tech-badge-title">Testing</span>
            <span className="tech-badge-name">Vitest + React Testing Library + JSDOM</span>
          </div>
          <div className="tech-badge">
            <span className="tech-badge-title">Data Source</span>
            <span className="tech-badge-name">Stack Exchange REST API v2.3</span>
          </div>
        </div>
      </section>

      {/* Architecture & API Attribution */}
      <section className="about-card">
        <div className="card-heading-row">
          <Database size={22} className="section-svg-icon" />
          <h2>System Architecture & API Usage</h2>
        </div>
        <p>
          The application follows a clean modular client-side architecture where the UI layer communicates
          with the Stack Exchange REST API through asynchronous fetch wrappers. A custom hook
          <code>useDebounce</code> throttles user search input to prevent unnecessary requests and comply with
          the API daily quota. If network connectivity fails or API throttling occurs, the application
          seamlessly activates a verified fallback mock dataset with clear user notifications.
        </p>
        <div className="attribution-box">
          <ShieldCheck size={20} className="shield-icon" />
          <p>
            <strong>API Attribution:</strong> Stack Overflow and Stack Exchange are registered trademarks
            of Stack Exchange Inc. Content retrieved via the public Stack Exchange API is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) <ExternalLink size={12} />
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
