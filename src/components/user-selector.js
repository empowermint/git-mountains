"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserSelector({ user }) {
  const router = useRouter();
  const [userEntry, setUserEntry] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/${userEntry}`);
  };

  return (
    <form>
      <label className="me-2 text-xl">
        GitHub Username:
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
