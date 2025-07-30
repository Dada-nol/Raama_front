import { useState } from "react";
import EntryFeed from "./EntryFeed";
import ProfileSlector from "./ProfileSlector";

function EntryFilterByUser({ entries, members, id }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelect = (id) => {
    setSelectedUserId(id === selectedUserId ? null : id);
  };

  const filteredEntries = selectedUserId
    ? entries.filter((entry) => entry.user_id === selectedUserId)
    : entries;

  return (
    <div className="flex items-start my-16">
      <EntryFeed
        entries={entries}
        members={members}
        id={id}
        filteredEntries={filteredEntries}
      />
      <div className="pr-12">
        <div className="flex flex-col gap-6 mb-4">
          {members?.map((member) => (
            <ProfileSlector
              key={member.id}
              isSelected={member.id === selectedUserId}
              ctaOnClick={() => handleSelect(member.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EntryFilterByUser;
