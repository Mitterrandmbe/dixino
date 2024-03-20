import getCurrentUser from "@/app/actions/getCurrentUser"
import getServicesClient, { IServicesParams } from "@/app/actions/getServicesClient";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import UserProfile from "@/app/components/account/UserProfile";

interface AccountProps {
    searchParams: IServicesParams
}

export default async function AccountPage(
    searchParams: IServicesParams
) {
  
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return null
    }
    const services = await getServicesClient({userId: currentUser.id});
  
    return (
    <Container>
        <div className="flex flex-col gap-8 py-8">
            <Heading 
                title="Mon compte"
                subtitle="Accédez et gérez toute les informations liées à votre compte."
            />

            <UserProfile 
                currentUser={currentUser}
                services={services}
            />
        </div>
    </Container>
  )
}

