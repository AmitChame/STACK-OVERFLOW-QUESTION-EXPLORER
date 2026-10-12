import { Link } from "react-router-dom";
import { GraduationCap, Code2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content-inner">
        <div className="footer-section brand-col">
          <div className="footer-brand-title">
            <Code2 size={20} className="footer-logo-icon" />
            <span>Stack Overflow Question Explorer</span>
          </div>
          <p className="footer-desc">
            A comprehensive MCA Semester III Formative Assessment (FA2) mini-project
            demonstrating advanced React hooks, routing, real API integration, LocalStorage CRUD,
            and responsive UI design.
          </p>
          <p className="footer-attribution">
            Question data powered by the public{" "}
            <a
              href="https://api.stackexchange.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline"
            >
              Stack Exchange API <ExternalLink size={11} />
            </a>{" "}
            under CC BY-SA 4.0.
          </p>
        </div>

        <div className="footer-section links-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Explore Questions</Link></li>
            <li><Link to="/bookmarks">Saved Bookmarks</Link></li>
            <li><Link to="/about">About & Architecture</Link></li>
          </ul>
        </div>

        <div className="footer-section academic-col">
          <h4 className="footer-heading">Academic Information</h4>
          <div className="academic-badge">
            <GraduationCap size={16} className="grad-icon" />
            <div>
              <p><strong>Student:</strong> Amit Sanjay Chame</p>
              <p><strong>PRN:</strong> 125M1H020</p>
              <p><strong>Class:</strong> SYMCA Sem III (2026–2027)</p>
              <p><strong>Guide:</strong> Prof. Dr. Avinash Chormale</p>
              <p><strong>Institute:</strong> PCCOE, Pune</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© 2026 Amit Sanjay Chame — Pimpri Chinchwad College of Engineering (PCCOE), Pune</p>
      </div>
    </footer>
  );
}

export default Footer;
