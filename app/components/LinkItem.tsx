'use client';

import Link from "next/link";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";


interface LinkItemProps {
    href: string;
    label?: string;
    icon?: IconType;
}

const LinkItem: React.FC<LinkItemProps> = ({
    href,
    label,
    icon: Icon
}) => {

    
  return (
        <Link 
            href={href} 
            className={`
                flex 
                flex-row 
                items-center 
                hover:text-primary
            `}
            >
            {Icon && (
                <Icon 
                    size={16}
                    className="hidden xl:block mr-[4px]"
                />
            )}
            {label}
        </Link>
  )
}

export default LinkItem