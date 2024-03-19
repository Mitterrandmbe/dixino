import ReservationCard from "@/app/components/listings/ReservationCard";
import EmptyState from "@/app/components/states/EmptyState";
import { SafeUser, SafeReservation, SafeEmployer } from "@/app/types"

interface ReservationsClientsProps {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
  employers: SafeEmployer[]
}

const ReservationsClients: React.FC<ReservationsClientsProps> = ({
  currentUser,
  reservations,
  employers
}) => {

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="🫙 Aucune prestation"
        subtitle="Vous n'avez aucune prestation à venir"
      />
    )
  }

  return (
    <div className="h-full">
      {reservations.map((reservation: any) => (
        <ReservationCard
          key={reservation.id}
          data={reservation.listing}
          employers={employers}
        />
      ))}
    </div>
  )
}

export default ReservationsClients