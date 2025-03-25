
import { Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="px-4 py-3">
      <div 
        className={cn(
          "relative w-full h-11 px-4 bg-secondary/50 rounded-full flex items-center",
          "transition-all duration-300 ease-in-out",
          isFocused && "bg-secondary/70 shadow ring-1 ring-border"
        )}
      >
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Search for groceries..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
