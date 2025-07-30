import EntryUpload from "./BtnUpload";

function EntryList({
  members,
  entries,
  id,
  date,
  readonly = false,
  selectedUserId,
}) {
  return (
    <div className="flex justify-center items-center gap-10">
      {members?.map((user) => {
        const userEntries = entries.filter(
          (entry) => entry.user_id === user.id
        );

        return (
          <div key={user.id}>
            {userEntries.length === 0 ? (
              selectedUserId ? null : readonly ? (
                <div className="image-upload-button">No entry</div>
              ) : (
                <EntryUpload entryUser={user} id={id} date={date} />
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
