

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Link = {
  name: string;
  path: string;
  icon?: LucideIcon;
};

type Props = {
  title: string;
  links: Link[];
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  borderTopColor?: string;
  disabled?: boolean;
};

const Tile: React.FC<Props> = ({
  title,
  links,
  icon: Icon,
  iconBgColor = "bg-[#0b1f4c]",
  iconColor = "text-white",
  borderTopColor = "border-t-[#001740]",
  disabled = false
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (disabled) return;
    navigate(path);
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 border-t-[4px] ${borderTopColor}
        rounded-2xl py-5 px-5 sm:px-6 w-full
        shadow-md hover:shadow-xl transition-all duration-300
        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      `}
      style={{
        minHeight: "260px",
        boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
      }}
    >
      {/* Header with icon and title inline */}
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className={`flex-shrink-0 w-11 h-11 ${iconBgColor} rounded-lg flex items-center justify-center shadow-md`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}
        <div>
          <h2 className="text-[#0b1f4c] text-lg sm:text-xl font-bold">
            {title}
          </h2>
          <div className="w-12 h-1 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
        </div>
      </div>

      {/* Links grid */}
      <div className={`grid grid-cols-2 gap-2 sm:gap-3 ${disabled ? 'pointer-events-none' : ''}`}>
        {links.map((link, index) => (
          link.name && (
            <div
              key={index}
              className={`
                group flex flex-col items-center text-center p-2 sm:p-3 rounded-lg
                transition-all duration-200
                ${disabled ? '' : 'hover:bg-gray-100 cursor-pointer active:scale-95'}
              `}
              onClick={() => !disabled && handleNavigation(link.path)}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={e => {
                if (!disabled && (e.key === 'Enter' || e.key === ' ')) handleNavigation(link.path);
              }}
              aria-disabled={disabled}
            >
              {link.icon && (
                <div className={`
                  w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-full flex items-center justify-center
                  mb-2 transition-colors duration-200
                  ${disabled ? '' : 'group-hover:bg-blue-100'}
                `}>
                  <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
              )}
              <span className={`
                text-xs sm:text-sm font-medium line-clamp-2
                ${disabled ? 'text-gray-400' : 'text-gray-700 group-hover:text-[#0b1f4c]'}
              `}>
                {link.name}
              </span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Tile;