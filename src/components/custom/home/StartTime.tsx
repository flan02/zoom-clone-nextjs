'use client'

import { useState } from "react";


interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function StartTimeInput({ value, onChange }: StartTimeInputProps) {
  const [active, setActive] = useState(false);

  const dateTimeLocalNow =
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000) // Adjust for timezone
      .toISOString() // 2021-10-10T12:00:00.000Z
      .slice(0, 16); // 2021-10-10T12:00

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting start:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Start meeting immediately
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
            onChange(dateTimeLocalNow);
          }}
        />
        Start meeting at date/time
      </label>

      {
        active && (
          <label className="block space-y-1">
            <span className="font-medium">Start time</span>
            <input
              type="datetime-local"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              min={dateTimeLocalNow}
              className="w-full rounded-md border border-crybaby bg-night text-slate-200 p-2"
            />
          </label>
        )
      }
    </div>
  );
}
