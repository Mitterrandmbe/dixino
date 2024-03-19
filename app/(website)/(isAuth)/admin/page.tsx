import Container from '@/app/components/Container';
import AdminManager from './AdminManager';

import getCurrentUser from '@/app/actions/getCurrentUser';
import { getAllUsers } from '@/app/actions/getAllUsers';
import { getAllListings } from '@/app/actions/getAllListings';
import getApplicantById from '@/app/actions/getApplicantById';
import getReservations from '@/app/actions/getReservations';
import { getEmployers } from '@/app/actions/getEmployers';
import { getApplicants } from '@/app/actions/getApplicants';


const AdminDashboardPage = async () => {
    
    const currentUser = await getCurrentUser();

    const allUsers = await getAllUsers();
    const allListings = await getAllListings();
    const reservations = await getReservations({});
    const { employers } = await getEmployers({});
    const { applicants, services } = await getApplicants({})

    const userId = await getApplicantById({applicantId: ""})

    
  
    return (
    <Container>
        <div
            className='flex flex-col gap-8 mt-12'
        >
            <AdminManager 
                currentUser={currentUser}
                allUsers={allUsers}
                allListings={allListings}
                reservations={reservations}
                employers={employers}
                applicants={applicants}
                services={services}
                
            />

        </div>
        
    </Container>
  )
}

export default AdminDashboardPage