
import { Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  inHeader?: boolean;
}

const SearchBar = ({ inHeader = false }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn(
      "w-full",
      inHeader ? "py-0" : "px-4 py-3"
    )}>
      <div 
        className={cn(
          "relative w-full h-9 px-4 bg-gray-100 rounded-full flex items-center",
          "transition-all duration-300 ease-in-out",
          isFocused && "bg-white shadow ring-1 ring-gray-200"
        )}
      >
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for groceries..."
          className="flex-1 bg-transparent border-none outline-none text-sm"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
