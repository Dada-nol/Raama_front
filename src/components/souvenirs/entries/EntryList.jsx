import EntryUpload from "./EntryUpload";
import EntryModale from "./EntryModale";

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
