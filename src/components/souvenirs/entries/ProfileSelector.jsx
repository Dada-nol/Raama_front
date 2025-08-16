/**
 * Composant représentant un bouton pour sélectionner un profil utilisateur
 * dans la navigation des entries d'un souvenir.
 *
 * Affiche une icône SVG représentant un utilisateur.
 * Utilisé dans `EntryContainer` pour filtrer les entries par utilisateur.
 *
 * @component
 *
 * @example
 * <ProfileSelector />
 */
function ProfileSelector() {
  return (
    <button className={`souvenir-nav-items p-[5px] ml-4 `}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="size-6 text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </button>
  );
}

export default ProfileSelector;
