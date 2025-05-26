import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(!src);

  const handleImageError = () => {
    setImageError(true);
  };

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const getFallbackInitials = () => {
    if (fallback) return fallback.charAt(0).toUpperCase();
    if (alt) return alt.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <div className={`relative inline-block rounded-full overflow-hidden bg-gray-200 ${sizeStyles[size]} ${className}`}>
      {!imageError && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-red-600 text-white font-medium">
          {getFallbackInitials()}
        </div>
      )}
    </div>
  );
};

export default Avatar;