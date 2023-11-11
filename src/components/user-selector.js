"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserSelector({ user }) {
  const [selectionMode, setSelectionMode] = useState(false);
  const toggleSelectionMode = () => {
    setSelectionMode((selectionMode) => !selectionMode);
  };

  return (
    <div className="flex space-x-2">
      {selectionMode && (
        <UserSelectionDisplay
          user={user}
          toggleSelectionMode={toggleSelectionMode}
        />
      )}
      {!selectionMode && (
        <UserSelectionForm
          user={user}
          toggleSelectionMode={toggleSelectionMode}
        />
      )}
    </div>
  );
}

function UserSelectionDisplay({ user, toggleSelectionMode }) {
  return (
    <>
      <span className="text-xl font-bold">{user}</span>
      <button
        className="text-s tracking-widest px-2 py-0 rounded-lg border-x-2 border-violet-400 hover:shadow-md hover:bg-violet-300"
        onClick={toggleSelectionMode}
      >
        Switch
      </button>
    </>
  );
}

function UserSelectionForm({ user, toggleSelectionMode }) {
  const router = useRouter();
  const [userEntry, setUserEntry] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleSelectionMode();

    const params = new URLSearchParams();
    params.set("user", userEntry);
    router.push("?" + params.toString());
  };

  return (
    <form>
      <label className="me-2 text-xl">
        Username:
        <input
          name="user"
          className="ms-2 bg-transparent rounded-lg border-b-2 border-violet-400 text-center font-bold"
          type="text"
          value={userEntry}
          onChange={(e) => setUserEntry(e.target.value)}
        />
      </label>
      <input
        type="submit"
        className="text-s tracking-widest px-2 py-0 rounded-lg border-x-2 border-violet-400 hover:shadow-md hover:bg-violet-300"
        onClick={handleSubmit}
        value="Go"
      />
    </form>
  );
}
