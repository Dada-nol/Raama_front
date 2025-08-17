/**
 * Composant affiché lorsqu'une page n'existe pas (erreur 404).
 *
 * @module NotFound
 * @returns {JSX.Element} Une page 404 avec un message centré
 */
const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1>404</h1>
      <p>Oups… cette page n'existe pas.</p>
      <a
        className="gradient-border my-4 px-4 py-2 shadow-md hover:shadow-lg hover:scale-105 hover:text-gradient"
        href="/"
      >
        Retour sur la page d'accueil
      </a>
    </div>
  );
};

export default NotFound;
