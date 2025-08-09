import { useState } from "react";
import EntryFeed from "./EntryFeed";
import ProfileSelector from "./ProfileSelector";
import SouvenirSettingModale from "./SouvenirSettingModale";

function EntryFilterByUser({ entries, members, id, refreshEntries }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelect = (id) => {
    setSelectedUserId(id === selectedUserId ? null : id);
  };

  const filteredEntries = selectedUserId
    ? entries.filter((entry) => entry.user_id === selectedUserId)
    : entries;

  return (
    <div className="relative flex flex-col overflow-y-scroll h-[90vh] border border-primary md:w-[60vw] m-auto rounded-md bg-secondary my-6">
      {members?.length > 2 ? (
        <div className="sticky top-0 w-full border-b border-primary flex flex-row mb-4 z-10 bg-secondary">
          <div
            className="flex  items-center hover:scale-105 cursor-pointer"
            onClick={() => handleSelect(null)}
          >
            <button className={`souvenir-nav-items p-[5px] ml-4 `}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-primary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
            </button>
            <p
              className={`border-primary px-4 border-r ${
                null === selectedUserId && "text-gradient"
              }`}
            >
              Voir tout
            </p>
          </div>

          {members?.map((member) => (
            <div
              className="w-fit flex  items-center hover:scale-105 cursor-pointer"
              onClick={() => handleSelect(member.id)}
            >
              <ProfileSelector key={member.id} />
              <p
                className={`border-primary px-4 border-r ${
                  member.id === selectedUserId && "text-gradient"
                }`}
              >
                {member.firstname}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <EntryFeed
        entries={entries}
        members={members}
        selectedUserId={selectedUserId}
        id={id}
        filteredEntries={filteredEntries}
        refreshEntries={refreshEntries}
      />

      <SouvenirSettingModale></SouvenirSettingModale>
    </div>
  );
}

export default EntryFilterByUser;
