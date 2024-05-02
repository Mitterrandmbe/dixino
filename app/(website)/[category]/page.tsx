import { getListingByCategory } from "@/app/actions/getListingByCategory";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/states/EmptyState";
import Link from "next/link";


const CategoryPage = async ({ params }: { params : { category: string }} ) => {

    const listings = await getListingByCategory(params);

    if (!listings || listings.length === 0) {
        return (
            <EmptyState 
                title="Offre introuvable"
                subtitle="Aucune offre ne correspond à votre recherche"
            />
        )
    }

  return (
    <div className="bg-neutral-100 h-screen">
        <Container>
        <div 
            className="
                grid
                grid-cols-1
                sm:grid-cols-1
                md:grid-cols-2
                lg:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-3
                gap-8
                pt-12
            "
        >
                {listings.map((listing: any) => {
                    return (
                            
                            <ListingCard 
                                key={listing.id}
                                data={listing}
                            />
                    )
                })}
        </div>
        </Container>
        </div>
  )
}

export default CategoryPage