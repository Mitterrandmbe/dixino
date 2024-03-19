'use client';

import { IconType } from "react-icons";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    icon?: IconType
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label,
    icon: Icon
}) => {
  return (
    <div
        onClick={onClick}
        className="
            px-4
            py-3
            hover:bg-neutral-100
            transition
            flex
            items-center
        "
    >
        {Icon && (
            <Icon 
                size={16}
                className="mr-[4px]"
            />
        )}
        {label}
    </div>
  )
}

export default MenuItem