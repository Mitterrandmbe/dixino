import { SafeListing, SafeService, SafeUser, SafeReservation, SafeApplicant } from "@/app/types";

interface AdminDashboardMetricsProps {
    currentUser: SafeUser | null;
    services: SafeService[];
    reservations: SafeReservation[];
    applicants: SafeApplicant[];
    allListings: SafeListing[];
}

const AdminDashboardMetrics: React.FC<AdminDashboardMetricsProps> = ({  
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

    const numberOfApplications = allListings.reduce((total, listing) => total + listing.applicantIds.length, 0)

    // const applications = listings.map((listings) => listings.applicantIds)
    // const numberOfApplicants = applications.length

    
    
  
    return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        
      "
    >
      <div className="bg-primary text-3xl lg:text-4xl font-semibold text-white py-16 px-8 rounded-md border-2 border-neutral-400 shadow-lg">
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
        <div>{400}</div>
        <div className="mt-4 flex flex-row justify-between font-normal items-center text-sm">
          <div className="text-md font-semibold">offres postées</div>
          <div className="text-md cursor-pointer hover:bg-primary hover:text-white p-2 transition-all">
            
          </div>
        </div>
      </div>

      

    </div>
  );
};

export default AdminDashboardMetrics;
