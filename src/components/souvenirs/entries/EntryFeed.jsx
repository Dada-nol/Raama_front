import EntryList from "./EntryList";

const EntryFeed = ({
  entries,
  members,
  id,
  filteredEntries,
  selectedUserId,
  refreshEntries,
}) => {
  if (!entries || !Array.isArray(entries)) {
    return <div>Chargement des souvenirs...</div>;
  }

  // Regrouper les entries par date
  const sourceEntries = filteredEntries || entries;

  const groupedByDate = sourceEntries.reduce((acc, entry) => {
    const date = entry.created_at.split("T")[0]; // format YYYY-MM-DD
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  // Récupérer les dates triées du plus ancien au plus récent
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  // Créer la date d’aujourd’hui, hier et demain
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  return (
    <div
      className={`${
        members?.length < 2 || selectedUserId
          ? "flex-row-reverse flex-wrap-reverse justify-end items-end"
          : "flex-col-reverse flex-wrap items-center"
      } flex`}
    >
      {/* DEMAIN – Upload seulement */}
      {(groupedByDate[tomorrowStr]?.length > 0 || !selectedUserId) && (
        <section className={`${members?.length >= 3 ? "py-4" : "px-4"} `}>
          <h2 className="text-center text-sm text-gray-400">Demain</h2>
          <EntryList
            members={members}
            entries={groupedByDate[tomorrowStr] || []}
            id={id}
            readonly={true}
            selectedUserId={selectedUserId}
          />
        </section>
      )}

      {/* AUJOURD’HUI – Upload + Photos */}
      {(groupedByDate[todayStr]?.length > 0 || !selectedUserId) && (
        <section className={`${members?.length >= 3 ? "py-4" : "px-4"} `}>
          <h2 className="text-center text-sm text-gray-400">Aujourd'hui</h2>
          <EntryList
            members={members}
            entries={groupedByDate[todayStr] || []}
            id={id}
            selectedUserId={selectedUserId}
            refreshEntries={refreshEntries}
          />
        </section>
      )}

      {/* HIER – Photos seulement */}
      {(groupedByDate[yesterdayStr]?.length > 0 || !selectedUserId) && (
        <section className={`${members?.length >= 3 ? "py-4" : "px-4"} `}>
          <h2 className="text-center text-sm text-gray-400">Hier</h2>
          <EntryList
            members={members}
            entries={groupedByDate[yesterdayStr] || []}
            id={id}
            readonly={true}
            selectedUserId={selectedUserId}
          />
        </section>
      )}

      {/* ANCIEN – Scroll vers le haut */}
      {sortedDates
        .filter(
          (date) =>
            date !== todayStr && date !== yesterdayStr && date !== tomorrowStr
        )
        .map((date) => (
          <section
            key={date}
            className={`${members?.length >= 3 ? "py-4" : "px-4"} `}
          >
            <h2 className={"text-center text-sm text-gray-500"}>
              {new Date(date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <EntryList
              members={members}
              entries={groupedByDate[date]}
              id={id}
              readonly={true}
              selectedUserId={selectedUserId}
            />
          </section>
        ))}
    </div>
  );
};

export default EntryFeed;
