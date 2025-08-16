import EntryModale from "./EntryModale";
import EntryUpload from "./EntryUpload";

/**
 * Composant qui affiche la liste des entries (photos/mémoires) pour chaque utilisateur.
 *
 * Fonctionnalités :
 * - Filtrage des entries par utilisateur.
 * - Affichage conditionnel :
 *   - Si aucune entry, affiche un bouton d’upload (sauf en lecture seule ou si un utilisateur est sélectionné).
 *   - Sinon, affiche les entries via le composant `EntryModale`.
 * - Intègre le composant `EntryUpload` pour permettre l’ajout de nouvelles entries.
 *
 * @component
 *
 * @param {Object[]} members - Liste des utilisateurs membres du souvenir.
 * @param {Object[]} entries - Liste des entries à afficher.
 * @param {number|string} id - Identifiant du souvenir.
 * @param {boolean} [readonly=false] - Indique si les entries sont en lecture seule.
 * @param {number|string|null} selectedUserId - ID de l'utilisateur sélectionné pour filtrer les entries.
 * @param {Function} refreshEntries - Fonction permettant de recharger la liste des entries après modification.
 *
 * @example
 * <EntryList
 *   members={members}
 *   entries={entries}
 *   id={souvenirId}
 *   readonly={false}
 *   selectedUserId={selectedUserId}
 *   refreshEntries={fetchEntries}
 * />
 */
function EntryList({
  members,
  entries,
  id,
  readonly = false,
  selectedUserId,
  refreshEntries,
}) {
  return (
    <div
      className={`${
        selectedUserId ? "text-center" : "flex justify-center items-center"
      } `}
    >
      {members?.map((user) => {
        const userEntries = entries.filter(
          (entry) => entry.user_id === user.id
        );

        return (
          <div className="px-4" key={user.id}>
            {userEntries.length === 0 ? (
              selectedUserId ? null : readonly ? (
                <div className="image-upload-button">No entry</div>
              ) : (
                <EntryUpload
                  entryUser={user}
                  id={id}
                  refreshEntries={refreshEntries}
                />
              )
            ) : (
              userEntries.map((entry) => (
                <div key={entry.id}>
                  <EntryModale id={id} entry={entry}></EntryModale>
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

export default EntryList;
