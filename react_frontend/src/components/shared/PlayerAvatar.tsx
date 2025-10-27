import { User } from 'lucide-react';

interface PlayerAvatarProps {
    playerId: number;
    size?: 'sm' | 'md' | 'lg';
    isWinner?: boolean;
}

export function PlayerAvatar({ playerId, size = 'md', isWinner = false }: PlayerAvatarProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    // TODO: player.avatar_url
    const avatarUrl = null; 

    return (
        <div className="relative inline-block">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={`Player ${playerId}`}
                    className={`${sizeClasses[size]} rounded-full object-cover ${
                        isWinner ? 'ring-2 ring-green-500' : ''
                    }`}
                />
            ) : (
                <div
                    className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center ${
                        isWinner ? 'ring-2 ring-green-500 bg-green-50' : ''
                    }`}
                >
                    <User 
                        size={iconSizes[size]} 
                        className={isWinner ? 'text-green-600' : 'text-gray-500'} 
                    />
                </div>
            )}
        </div>
    );
}