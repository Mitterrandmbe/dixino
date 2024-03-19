import { SafeUser, SafeListing, SafeService, SafeReservation, SafeEmployer, SafeApplicant } from "@/app/types";
import AdminDashboardMetrics from "./AdminDashboardMetrics";
import ReservationsClients from "@/app/(website)/(isAuth)/dashboard/ReservationsClients";

interface AdminDashboardProps {
    currentUser: SafeUser | null;
    // listings: SafeListing[];
    services: SafeService[];
    reservations: SafeReservation[];
    employers: SafeEmployer[];
    applicants: SafeApplicant[];
    allListings: SafeListing[];
    
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
    currentUser,
    // listings,
    services,
    reservations,
    employers,
    applicants,
    allListings
}) => {

    if (!currentUser) {
        return null;
    }
  return (
    <div
        className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            h-full
        "
    >
        {/* LEFT */}
        <div className="flex flex-col gap-8 ">
            <div className="flex flex-col lg:col-span-1 gap-4 bg-primaryLight p-8 rounded-md">
                <div className="text-2xl font-semibold">👋 Bonjour {currentUser?.firstName}</div>
                <div className="text-neutral-600">{"Ici, tu peux avoir une vue rapide sur tes prestations et tes prochains rdv."}</div>

            </div>
            
            {/* <AdminDashboardMetrics 
                listings={allListings}
                allListings={allListings}
                currentUser={currentUser}
                reservations={reservations}
                applicants={applicants}
                services={services}
            /> */}

            <AdminDashboardMetrics 
                allListings={allListings}
                currentUser={currentUser}
                reservations={reservations}
                applicants={applicants}
                services={services}
            />
            
        </div>

        {/* RIGHT */}
        <div
            className="flex flex-col h-full bg-primaryLight rounded-md p-8 overflow-y-scroll"
        >
            <div className="font-semibold">Prestations à venir</div>
            <ReservationsClients 
                currentUser={currentUser}
                reservations={reservations}
                employers={employers}
            />

        </div>




    </div>
  )
}

export default AdminDashboard