import React from 'react';

// Utility function to mimic clsx or cn for conditional class joining
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface BadgeProps {
    children: React.ReactNode;
    // Shadcn-like variants for styling
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'hot' | 'urgent';
    // Size property, if needed
    size?: 'default' | 'large';
}

// Define classes for different variants and sizes
const badgeVariants = {
    base: 'inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    
    // Classes based on size
    size: {
        default: 'text-xs px-2.5 py-0.5 rounded-full', // Standard size, rounded pill shape
        large: 'text-sm px-3 py-1 rounded-lg',        // Larger size, slightly less rounded
    },

    // Classes based on variant (color/style)
    variant: {
        default: 'bg-indigo-100 text-indigo-700 border border-indigo-200 hover:bg-indigo-200/80',
        secondary: 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200',
        destructive: 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200/80',
        outline: 'text-gray-700 border border-gray-300 bg-white hover:bg-gray-50', // High contrast outline
        
        // Custom variants with emojis and strong colors
        hot: 'bg-red-50 text-red-600 border border-red-200/70',
        urgent: 'bg-amber-50 text-amber-700 border border-amber-200/70', // Changed yellow to amber for better contrast
    }
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'default' }) => {
    
    // Determine the final class string using the utility function
    const finalClass = cn(
        badgeVariants.base,
        badgeVariants.size[size],
        badgeVariants.variant[variant]
    );

    let prefix = null;
    if (variant === 'hot') {
        prefix = <span className="mr-1">🔥</span>;
    } else if (variant === 'urgent') {
        prefix = <span className="mr-1">🚨</span>; // Changed star to siren for more urgency
    }

    return (
        <span className={finalClass}>
            {prefix}
            {children}
        </span>
    );
};