import { User, Listing, Service, Reservation } from "@prisma/client";


export type SafeService = Omit<
    Service,
    "createdAt"
> & {
    createdAt: string;    
};

export type SafeApplicant = Omit<
    User,
    "createdAt"
> & {
    createdAt: string;
    
};

export type SafeEmployer = Omit<
    User,
    "createdAt"
> & {
    createdAt: string;
    
};

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "listing"
> & {
    createdAt: string;
    listing: SafeListing;
    
    
};


export type SafeListing = Omit<
    Listing,
    "createdAt" | "serviceDate"
> & {
    createdAt: string | Date;
    serviceDate: Date
};


export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};
