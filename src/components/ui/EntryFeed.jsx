import EntryList from "./EntryList";

const EntryFeed = ({ entries, members, id, filteredEntries }) => {
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
    <>
      {filteredEntries && (
        <div
          className={`${
            members.length >= 3
              ? "flex-col-reverse"
              : "flex-row-reverse flex-wrap-reverse justify-center"
          } flex items-center overflow-y-scroll h-[90vh] border border-primary md:w-[60vw] m-auto rounded-md bg-secondary`}
        >
          {/* DEMAIN – Upload seulement */}
          <section className={`${members.length >= 3 ? "py-4" : "px-4"} `}>
            <h2 className="text-center text-sm text-gray-400">Demain</h2>
            {/* <EntryUpload id={id} date={tomorrowStr} user={members} /> */}
            <EntryList
              members={members}
              entries={groupedByDate[tomorrowStr] || []}
              id={id}
              date={tomorrowStr}
              readonly={true}
            />
          </section>

          {/* AUJOURD’HUI – Upload + Photos */}
          <section className={`${members.length >= 3 ? "py-4" : "px-4"} `}>
            <h2 className="text-center text-sm text-gray-400">Aujourd'hui</h2>
            {/* <EntryUpload id={id} date={todayStr} user={members} /> */}
            <EntryList
              members={members}
              entries={groupedByDate[todayStr] || []}
              id={id}
              date={todayStr}
            />
          </section>

          {/* HIER – Photos seulement */}
          <section className={`${members.length >= 3 ? "py-4" : "px-4"} `}>
            <h2 className="text-center text-sm text-gray-400">Hier</h2>
            <EntryList
              members={members}
              entries={groupedByDate[yesterdayStr] || []}
              id={id}
              date={yesterdayStr}
              readonly={true}
            />
          </section>

          {/* ANCIEN – Scroll vers le haut */}
          {sortedDates
            .filter(
              (date) =>
                date !== todayStr &&
                date !== yesterdayStr &&
                date !== tomorrowStr
            )
            .map((date) => (
              <section
                key={date}
                className={`${members.length >= 3 ? "py-4" : "px-4"} `}
              >
                <h2 className="text-center text-xs text-gray-500">{date}</h2>
                <EntryList
                  members={members}
                  entries={groupedByDate[date]}
                  id={id}
                  date={date}
                  readonly={true}
                />
              </section>
            ))}
        </div>
      )}
    </>
  );
};

export default EntryFeed;
