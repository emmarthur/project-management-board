import "./Header.css";

function Header() {
  return (
    <div className="Header-wrapper">
      <span className="Header-icon" aria-hidden="true">
        📋
      </span>
      <h1>Project Management Board</h1>
      <p className="Header-tagline">
        Drag tasks between lanes — backlog to done
      </p>
    </div>
  );
}

export default Header;
