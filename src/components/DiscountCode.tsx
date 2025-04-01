
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
      <div className="max-w-md mx-auto material-elevated p-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-material-onSurfaceVariant">{description}</p>
          <div className="flex items-center justify-between">
            <div className="font-mono text-base font-medium tracking-wider bg-material-surfaceVariant py-2 px-4 rounded-lg text-material-onSurfaceVariant">
              {code}
            </div>
            <Button 
              onClick={handleCopy}
              className={cn(
                "transition-all duration-200 rounded-full",
                copied 
                  ? "bg-material-tertiaryContainer text-material-onTertiaryContainer"
                  : "bg-material-secondaryContainer text-material-onSecondaryContainer"
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
      <p className="text-center text-sm text-material-onSurfaceVariant mt-3 italic">
        Hey, who knows what surprises might be here the next time you scroll all the way down 😉
      </p>
    </div>
  );
};

export default DiscountCode;
