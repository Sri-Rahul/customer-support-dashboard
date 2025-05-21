# Command Palette Usage

The Command Palette is a powerful feature that allows users to quickly access different parts of the application using keyboard shortcuts.

## Default Shortcut

- Windows/Linux: Press `Ctrl + K` to open the command palette
- macOS: Press `⌘ + K` to open the command palette

## Available Commands

The Command Palette includes commands for:

- Navigation between different app sections
- Quick access to settings and user profile
- Opening tools and utilities
- Performing searches

## Customizing Commands

To add new commands to the palette, modify the `commands` array in the `CommandPalette.tsx` file:

```tsx
const commands: CommandType[] = [
  {
    id: 'unique-id',         // Unique identifier for the command
    name: 'Command Name',    // Display name
    icon: IconComponent,     // Lucide icon component
    shortcut: '⌘S',          // Optional keyboard shortcut
    action: () => {},        // Function to execute when selected
    section: 'Section Name', // For grouping in the UI
    keywords: 'search terms' // Optional additional search terms
  },
  // Add more commands...
];
```

## Keyboard Navigation

- Use arrow keys to navigate through commands
- Press Enter to execute the selected command
- Press Escape to close the palette

## Filtering

Type in the search box to filter commands by name, keywords or section.
