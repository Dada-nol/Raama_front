import EntryUpload from "./EntryUpload";

function EntryList({ souvenir, entries, id, date, readonly = false }) {
  const members = souvenir.users;

  return (
    <div className="flex justify-center items-center gap-6">
      {members?.map((user) => {
        const userEntries = entries.filter(
          (entry) => entry.user_id === user.id
        );

        return (
          <div key={user.id}>
            {userEntries.length === 0 ? (
              readonly ? (
                <div className="image-upload-button">No entry</div>
              ) : (
                <EntryUpload user={user} id={id} date={date} />
              )
            ) : (
              userEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="image-upload-button"
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
