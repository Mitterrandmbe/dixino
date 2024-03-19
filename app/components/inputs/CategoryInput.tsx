'use client';
import { IconType } from "react-icons";

interface CategoryInputProps {
    label: string;
    icon: IconType;
    selected?: boolean;
    onClick: (value: string) => void;
    description: string;
    color?: string,
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    label,
    icon: Icon,
    selected,
    onClick,
    description,
    color
}) => {
  return (
    
    <div
        onClick={() => onClick(label)}
        className={`
            rounded-md
            border-2
            p-4
            flex
            flex-row
            items-center
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? "border-primaryDark" : "border-neutral-200"}
            ${selected ? "bg-primaryLight opacity-95" : "bg-white"}
            
        `}
    >
        <Icon size={30}/>
        <div className="font-semibold">
            {label}
        </div>
    </div>

  )
}

export default CategoryInput