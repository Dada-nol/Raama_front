import EntryUpload from "./BtnUpload";

function EntryList({
  members,
  entries,
  id,
  date,
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
                  date={date}
                  refreshEntries={refreshEntries}
                />
              )
            ) : (
              userEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="image-upload-button hover:scale-105"
                  style={{
                    backgroundImage: `url(http://localhost:8000/storage/${entry.image_path})`,
                  }}
                />
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

export default EntryList;
