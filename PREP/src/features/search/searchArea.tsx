import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrganizations } from "../services/organization";
import type { Organization } from "../types/organization";

interface SearchAreaProps {
  onClose: () => void;
}

export function SearchArea({ onClose }: SearchAreaProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrganizations();
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const filteredOrganizations = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return organizations.slice(0, 6);

    return organizations
      .filter((organization) =>
        organization.name.toLowerCase().includes(value),
      )
      .slice(0, 6);
  }, [organizations, query]);

  function handleOrganizationClick(organizationId: string) {
    onClose();
    navigate(`/organizations/${organizationId}`);
  }

  return (
    <div className="fixed inset-0 z-50 light:bg-black/20 backdrop-blur-sm dark:bg-black/40">
      <div
        ref={searchRef}
        className="absolute left-1/2 top-24 w-[min(700px,calc(100%-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border light:border-neutral-200 light:bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <svg
            className="h-5 w-5 shrink-0 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search organizations..."
            className="w-full bg-transparent text-sm light:text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white"
          />

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-xs text-neutral-500 light:hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {isLoading ? (
            <p className="px-3 py-6 text-center text-sm light:text-neutral-500 dark:text-neutral-400">
              Loading organizations...
            </p>
          ) : filteredOrganizations.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm light:text-neutral-500 dark:text-neutral-400">
              No organizations found.
            </p>
          ) : (
            filteredOrganizations.map((organization) => (
              <button
                key={organization.id}
                type="button"
                onClick={() => handleOrganizationClick(organization.id)}
                className="w-full rounded-xl px-3 py-3 text-left light:hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <p className="text-sm font-medium light:text-neutral-900 dark:text-white">
                  {organization.name}
                </p>

                <p className="mt-1 text-xs light:text-neutral-500 dark:text-neutral-400">
                  {organization.type}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}