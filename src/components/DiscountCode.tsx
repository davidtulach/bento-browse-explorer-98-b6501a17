
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DiscountCodeProps {
  code: string;
  description: string;
}

const DiscountCode = ({ code, description }: DiscountCodeProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg p-4 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
          <div className="flex items-center justify-between">
            <div className="font-mono text-base font-medium tracking-wider bg-gray-50 dark:bg-muted py-2 px-4 rounded border border-gray-100 dark:border-muted text-gray-800 dark:text-gray-200">
              {code}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy}
              className={cn(
                "transition-all duration-200",
                copied 
                  ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/40"
                  : "dark:bg-muted dark:text-gray-200 dark:border-muted"
              )}
            >
              {copied ? (
                <>
                  <Check size={16} className="mr-1" /> Copied
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-1" /> Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
        Hey, who knows what surprises might be here the next time you scroll all the way down 😉
      </p>
    </div>
  );
};

export default DiscountCode;
