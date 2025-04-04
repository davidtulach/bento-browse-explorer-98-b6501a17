
import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/context/ThemeContext';

// Footer links data
const footerLinks = [
  { id: 'general', label: 'General terms and conditions', href: '#' },
  { id: 'premium', label: 'Premium terms and conditions', href: '#' },
  { id: 'baby-club', label: 'Baby Club terms and conditions', href: '#' },
  { id: 'privacy', label: 'Privacy policy', href: '#' },
  { id: 'cookies', label: 'Cookies', href: '#' },
  { id: 'complain', label: 'Complain policy', href: '#' },
];

const Footer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <footer className={cn(
      "w-full py-8 px-4 md:px-6", 
      isDarkMode ? "bg-[#1A1F2C] text-white" : "bg-[#F1F1F1] text-[#333]"
    )}>
      <div className="max-w-7xl mx-auto">
        {/* Help section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 mb-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium mb-2">Need help:</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We are available to you every day from 7:00 to 23:00.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="#" 
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100 border border-gray-200"
              )}
            >
              <MessageCircle size={18} />
              <span>Start chat</span>
            </a>
            
            <a 
              href="tel:800730740" 
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100 border border-gray-200"
              )}
            >
              <Phone size={18} />
              <span>800 730 740</span>
            </a>
          </div>
        </div>
        
        <Separator className={isDarkMode ? "bg-gray-700" : "bg-gray-300"} />
        
        {/* Links */}
        <div className="py-6">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {footerLinks.map(link => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  className={cn(
                    "hover:underline",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Apps section */}
        <div className="text-center">
          <p className="text-sm mb-4">Apps available on :</p>
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="#" 
              className="inline-block transition-transform hover:scale-105"
              aria-label="Get on Google Play"
            >
              <img 
                src="/lovable-uploads/6093288e-8187-4f26-821c-6e36fa538724.png" 
                alt="Google Play Store" 
                className="h-12 object-contain rounded-lg"
                style={{ clipPath: 'inset(25% 6% 25% 54%)' }} 
              />
            </a>
            <a 
              href="#" 
              className="inline-block transition-transform hover:scale-105"
              aria-label="Download on the App Store"
            >
              <img 
                src="/lovable-uploads/6093288e-8187-4f26-821c-6e36fa538724.png" 
                alt="Apple App Store" 
                className="h-12 object-contain rounded-lg"
                style={{ clipPath: 'inset(25% 54% 25% 6%)' }} 
              />
            </a>
          </div>
          
          {/* Language selector */}
          <div className="flex justify-center gap-2">
            <button 
              className={cn(
                "px-4 py-2 rounded-md flex items-center gap-1 text-sm",
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100 border border-gray-200"
              )}
            >
              <span className="w-5 h-5 inline-flex items-center justify-center">
                🇨🇿
              </span>
              <span>CS</span>
            </button>
            
            <button 
              className={cn(
                "px-4 py-2 rounded-md flex items-center gap-1 text-sm",
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100 border border-gray-200"
              )}
            >
              <span className="w-5 h-5 inline-flex items-center justify-center">
                🇬🇧
              </span>
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
