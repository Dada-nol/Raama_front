import { useState } from "react";
import SouvenirSettingModale from "../SouvenirSettingModale";
import EntryFeed from "./EntryFeed";
import ProfileSelector from "./ProfileSelector";

function EntryContainer({ entries, members, id, refreshEntries }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelect = (id) => {
    setSelectedUserId(id === selectedUserId ? null : id);
  };

  const filteredEntries = selectedUserId
    ? entries.filter((entry) => entry.user_id === selectedUserId)
    : entries;

  return (
    <div className="flex flex-col overflow-auto md:w-[60vw] w-full max-w-4xl m-auto rounded-md my-6 border border-primary bg-secondary">
      {members?.length > 2 ? (
        <div className="sticky top-0 left-0 right-0 w-full border-b border-primary flex flex-wrap gap-2 mb-4 z-10 bg-secondary px-2 py-1">
          <div
            className="flex items-center cursor-pointer select-none transition-transform duration-200 ease-in-out hover:scale-105"
            onClick={() => handleSelect(null)}
          >
            <button className="souvenir-nav-items p-[5px] ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
            </button>
            <p
              className={`border-primary px-4 border-r last:border-r-0 ${
                null === selectedUserId ? "text-gradient" : ""
              }`}
            >
              Voir tout
            </p>
          </div>

          {members?.map((member, i) => (
            <div
              key={member.id}
              className="flex items-center cursor-pointer select-none transition-transform duration-200 ease-in-out hover:scale-105"
              onClick={() => handleSelect(member.id)}
            >
              <ProfileSelector />
              <p
                className={`border-primary px-4 border-r last:border-r-0 ${
                  member.id === selectedUserId ? "text-gradient" : ""
                }`}
              >
                {member.firstname}
              </p>
            </div>
          ))}
          <SouvenirSettingModale />
        </div>
      ) : (
        <div className="relative mb-4">
          <SouvenirSettingModale />
        </div>
      )}

      <div className="h-[90vh]">
        <EntryFeed
          entries={entries}
          members={members}
          selectedUserId={selectedUserId}
          id={id}
          filteredEntries={filteredEntries}
          refreshEntries={refreshEntries}
        />
      </div>
    </div>
  );
}

export default EntryContainer;
