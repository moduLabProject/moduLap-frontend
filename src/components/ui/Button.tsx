export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  backgroundColor,
  label,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses =
    '  font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 border focus:ring-offset-2';

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gray-900 text-white rounded-lg',
    secondary: 'bg-gray-900 text-white rounded-none',
    outline: 'border-gray-900 text-gray-900 rounded-lg',
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
