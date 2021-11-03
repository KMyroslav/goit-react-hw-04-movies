export default function SearchBar({ setSearchQuery, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-bar"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search Movies"
        className="search-bar"
        onInput={(e) => setSearchQuery(e.currentTarget.value)}
      />
    </form>
  );
}
