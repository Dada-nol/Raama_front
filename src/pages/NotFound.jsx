/**
 * Composant affiché lorsqu'une page n'existe pas (erreur 404).
 *
 * @module NotFound
 * @returns {JSX.Element} Une page 404 avec un message centré
 */
const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "5rem",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>404</h1>
      <p>Oups… cette page n'existe pas.</p>
    </div>
  );
};

export default NotFound;
