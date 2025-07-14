import { useAuth } from "../context/AuthContext";

function Profil() {
  const { user } = useAuth();

  const createdAtDate = new Date(user.created_at);
  const formattedDate = createdAtDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="main-content">
      <div className="profile">
        <div className="svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>Membre depuis le {formattedDate}</p>
          {/*           Nombre total de souvenirs partagés Albums créés Groupes rejoints
          Souvenirs préférés ou mis en avant Déconnexion Thème */}
        </div>
      </div>
    </main>
  );
}

export default Profil;
