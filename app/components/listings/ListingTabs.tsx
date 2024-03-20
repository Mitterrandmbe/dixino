'use client';

import { listingTabs } from "@/app/libs/data";
import { useMemo, useState } from "react";

interface ListingTabsProps {
  // selectedTab: (value: string) => void;
  // value: string;
}

const ListingTabs: React.FC<ListingTabsProps> = ({
  // selectedTab,
  // value
}) => {
  
  const getTab = useMemo(() => {
    return listingTabs.map((item) => item.label)
  }, [listingTabs])

  const [selected, isSelected] = useState("Description");

  const handleSelect = (value: string) => {
    isSelected(value)
  }
  
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-8 border-b">
        {listingTabs.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelect(item.label)}
            className={`
              flex
              flex-row
              gap-2
              justify-center
              items-center
              text-sm
              cursor-pointer
              hover:text-black
              h-fit
              p-4
              border-b
              ${selected === item.label ? "border-black" : "border-transparent"}
              ${selected === item.label ? "text-black" : "text-neutral-500"}
              `}
          >
            <item.icon />
            {item.label}

          </div>
        ))}
      </div>

      

    </div>
  )
}

export default ListingTabs