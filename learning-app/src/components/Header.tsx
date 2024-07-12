export default function Header({ mainMenu, setMainMenu }) {
  return (
    <div className="header">
      <button
        className="main-menu-button"
        onClick={() => setMainMenu(!mainMenu)}
      >
        <span className="material-icons">menu</span>
      </button>
      <h1 className="app-title">TaskJeet</h1>
    </div>
  );
}
