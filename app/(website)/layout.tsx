import '../globals.css';
import { Montserrat } from 'next/font/google';


import Navbar from '../components/navbar/Navbar';
import Modal from '../components/modals/Modal';
import RegisterModal from '../components/modals/RegisterModal';
import ToasterProvider from '../providers/ToasterProvider';

import LoginModal from '../components/modals/LoginModal';
import OfferModal from '../components/modals/OfferModal';
import getCurrentUser from '../actions/getCurrentUser';
import ServiceModal from '../components/modals/ServiceModal';
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal';

import { getListings, IListingsParams } from '../actions/getListings';
import ApplicationModal from '../components/modals/ApplicationModal';
import ArchiveListingModal from '../components/modals/ArchiveListingModal';
import { getAllListings } from '../actions/getAllListings';


export const metadata = {
  title: 'Dixino',
  description: 'Trouvez un professionnel pour des travaux ou pour faire le ménage chez vous.',
}

const font = Montserrat({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  

  const listing = await getListings({ userId : currentUser?.id })
  if (!listing) {
    return null;
  }
  const firstListing = listing[0];

  const allListings = await getAllListings();
  const firstAllListing = allListings[0]
  
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <ServiceModal />
        <OfferModal />
        <LoginModal />
        <RegisterModal />
        <ForgotPasswordModal />
        <Navbar currentUser={currentUser} listing={firstListing} allListings={firstAllListing} />
        <div className='pt-24'>
          {children}
        </div>
      </body>
    </html>
  )
}
