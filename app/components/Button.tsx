'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    small?: boolean;
    actionLevel: string;
    icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    small,
    actionLevel,
    icon: Icon,


}) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onClick(e)
    }
  return (
    <button
        onClick={handleClick}
        disabled={disabled}
        className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded
            hover-opacity-80
            transition
            w-full
            ${actionLevel === "primary" && "bg-primary"}
            ${actionLevel === "primary" && "text-white"}
            ${actionLevel === "primary" && "border-primary"}
            ${actionLevel === "secondary" && "bg-secondary"}
            ${actionLevel === "secondary" && "text-white"}
            ${actionLevel === "secondary" && "border-secondary"}
            ${actionLevel === "outline" && "bg-white"}
            ${actionLevel === "outline" && "text-black"}
            ${actionLevel === "outline" && "border-black"}
            ${small ? "p-2" : "py-3"}
            ${small ? "border-[1px]" : "border-2"}
            ${small ? "font-light" : "font-semibold"}
            ${small ? "text-sm" : "text-md"}
        `}
    >
        {Icon && (
           <Icon 
            size={24}
            className="
                absolute
                left-4
                top-3
            "
           /> 
        )}
        {label}
    </button>
  )
}

export default Button