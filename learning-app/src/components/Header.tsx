export default function Header({
  mainMenu,
  setMainMenu,
  searchText,
  setSearchText,
}) {
  return (
    <div className="header">
      <button
        className="main-menu-button"
        onClick={() => setMainMenu(!mainMenu)}
      >
        <span className="material-icons">menu</span>
      </button>
      <h1 className="app-title">TaskJeet</h1>

      {/* <div className="search-container">
        <input
          className="search-field"
          placeholder="Search task..."
          value={searchText}
          onChange={(e: any) => {
            setSearchText(e.value.target);
          }}
        />

        <button className="search-button">Search</button>
      </div> */}
    </div>
  );
}
