'use client';

import { categories } from "@/app/libs/data";

interface CategoryViewProps {
    listingCategory: string;

}


const ListingCategory: React.FC<CategoryViewProps> = ({
    listingCategory

}) => {
    
    const allCategories = categories.map((category) => category)
    return (
    <div>
            
        Category
    </div>
  )
}

export default ListingCategory