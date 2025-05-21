'use client';

import * as React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { 
  Edit, 
  FileText, 
  MessageSquare, 
  Clock, 
  Upload,
  Smile
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function CommandPalette() {
  const [open, setOpen] = useState(false); // Start with the dialog closed
  const [selectedIndex, setSelectedIndex] = useState<number | null>(3); // Default select 'Create a back-office ticket'
  const commands = [
    {
      id: 'write-note',
      name: 'Write a note',
      icon: Edit,
      shortcut: 'N',
      action: () => {/* Action */}
    },
    {
      id: 'use-macro',
      name: 'Use macro',
      icon: FileText,
      shortcut: '\\',
      action: () => {/* Action */}
    },
    {
      id: 'summarize',
      name: 'Summarize conversation',
      icon: MessageSquare,
      action: () => {/* Action */}
    },
    {
      id: 'back-office',
      name: 'Create a back-office ticket',
      icon: FileText,
      shortcut: '⌘ ⌥ Y',
      action: () => {/* Action */},
      selected: true // This item is selected by default
    },
    {
      id: 'snooze',
      name: 'Snooze',
      icon: Clock,
      shortcut: 'Z',
      action: () => {/* Action */}
    },
    {
      id: 'upload',
      name: 'Upload attachment',
      icon: Upload,
      shortcut: '⌘ ⌥ A',
      action: () => {/* Action */}
    },
    {
      id: 'gif',
      name: 'Insert gif',
      icon: Smile,
      shortcut: '⌘ ⌥ G',
      action: () => {/* Action */}
    },
  ];
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev === null || prev >= commands.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev === null || prev <= 0 ? commands.length - 1 : prev - 1
        );
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'Enter' && selectedIndex !== null) {
        commands[selectedIndex].action();
        setOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, commands]);
  
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
  // No pointer positioning needed

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25" onClick={() => setOpen(false)}>
          <div 
            className="bg-white rounded-2xl shadow-lg w-[360px] mx-auto overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <div className="px-4 pt-4 pb-2">
              <input 
                className="w-full text-base outline-none border-0 focus:border-0 focus:ring-0 p-0"
                placeholder="Search actions"
                autoFocus
              />
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              {commands.map((command, index) => (
                <div                key={command.id}
                  className={`flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer relative ${index === selectedIndex ? 'bg-gray-100' : ''}`}
                  onClick={() => {
                    command.action();
                    setOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center">
                    {command.icon && (
                      <command.icon className="mr-3 h-5 w-5 text-gray-600" />
                    )}
                    <span className="text-sm">{command.name}</span>
                  </div>
                  {command.shortcut && (
                    <div className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded">
                      {command.shortcut}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
              <span className="flex items-center">
                <span className="inline-block mx-1">↑</span>
                <span className="inline-block mx-1">↓</span> 
                to navigate
              </span>
              <span className="flex items-center">
                <span className="inline-block mx-1">↩</span> 
                to select
              </span>
              <span className="flex items-center">
                <span className="inline-block mx-1">Esc</span> 
                to close
              </span>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
