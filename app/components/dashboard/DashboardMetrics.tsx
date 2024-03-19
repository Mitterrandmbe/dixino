import { SafeListing, SafeService, SafeUser, SafeReservation, SafeApplicant } from "@/app/types";

interface DashboardMetricsProps {
    listings: SafeListing[];
    currentUser: SafeUser | null;
    services: SafeService[];
    reservations: SafeReservation[];
    applicants: SafeApplicant[];
    allListings: SafeListing[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
    listings,
    currentUser,
    services,
    reservations,
    applicants,
    allListings
}) => {

    if (!currentUser) {
      return null;
    };

    const totalEarn = reservations.reduce((total, reservation) => total + reservation.totalPrice, 0);

    
    const matchingApplications = allListings.filter((listings) => listings.applicantIds.includes(currentUser.id));

    const numberOfApplications = matchingApplications.length

    const applications = listings.map((listings) => listings.applicantIds)
    const numberOfApplicants = applications.length

    
    
  
    return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
      "
    >
      <div className="bg-primary text-3xl lg:text-4xl font-semibold text-white py-16 px-8 rounded-md shadow-md border-2 border-primary">
        <div>{totalEarn}€</div>
        <div className="mt-4 flex flex-row justify-between font-normal items-center text-sm">
          <div className="text-md font-semibold">Total généré</div>
          <div className="text-md cursor-pointer border-solid border-2 border-primary p-2 transition-all">
            {/* Tout voir */}
          </div>
        </div>
      </div>


      <div className="bg-white text-3xl lg:text-4xl font-semibold text-primary py-16 px-8 rounded-md shadow-md border-2 border-neutral-100">
        <div>{numberOfApplications}</div>
        <div className="mt-4 flex flex-row justify-between font-normal items-center text-sm">
          <div className="text-md font-semibold">Candidatures</div>
          <div className="text-md cursor-pointer p-2 transition-all">
            {/* Tout voir */}
          </div>
        </div>
      </div>

      
      <div className="bg-white text-3xl lg:text-4xl font-semibold text-black py-16 px-8 rounded-md shadow-md border-2 border-neutral-100">
        <div>{reservations.length}</div>
        <div className="mt-4 flex flex-row justify-between font-normal items-center text-sm">
          <div className="text-md font-semibold">Prestations</div>
          <div className="text-md cursor-pointer hover:bg-primary hover:text-black p-2 transition-all">
          </div>
        </div>
      </div>


      <div className="bg-white text-3xl lg:text-4xl font-semibold text-black py-16 px-8 rounded-md shadow-md border-2 border-neutral-100">
        <div>{listings.length}</div>
        <div className="mt-4 flex flex-row justify-between font-normal items-center text-sm">
          <div className="text-md font-semibold">offres postées</div>
          <div className="text-md cursor-pointer hover:bg-primary hover:text-white p-2 transition-all">
            
          </div>
        </div>
      </div>

      

    </div>
  );
};

export default DashboardMetrics;
