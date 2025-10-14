export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses = primary
    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500';

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses}`}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};
