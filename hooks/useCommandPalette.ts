'use client';

import { useEffect, useState } from 'react';

export type Command = {
  id: string;
  name: string;
  shortcut?: string;
  icon?: React.ComponentType<{ className?: string }>;
  keywords?: string;
  action: () => void;
  section?: string;
};

export function useCommandPalette(commands: Command[]) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredCommands, setFilteredCommands] = useState<Command[]>(commands);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredCommands(commands);
      return;
    }

    const filtered = commands.filter((command) => {
      const searchLower = search.toLowerCase();
      return (
        command.name.toLowerCase().includes(searchLower) ||
        command.keywords?.toLowerCase().includes(searchLower) ||
        command.section?.toLowerCase().includes(searchLower)
      );
    });

    setFilteredCommands(filtered);
  }, [search, commands]);

  return {
    open,
    setOpen,
    search,
    setSearch,
    filteredCommands,
    executeCommand: (id: string) => {
      const command = commands.find((c) => c.id === id);
      if (command) {
        command.action();
        setOpen(false);
      }
    },
  };
}
