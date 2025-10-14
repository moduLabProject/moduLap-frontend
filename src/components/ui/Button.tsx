export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  backgroundColor,
  label,
  className = '',
  isActive = false,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-semibold transition-colors';

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gray-900 text-white rounded-sm',
    secondary: isActive
      ? 'bg-gray-900 text-white rounded-sm'
      : 'bg-white text-gray-900 border border-gray-900 rounded-sm',
    outline: 'border-gray-900 text-gray-900 rounded-sm',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};
