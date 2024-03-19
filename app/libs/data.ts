import { MdHealthAndSafety, MdOutlineDashboard } from "react-icons/md";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiTap } from "react-icons/gi";

import { IoIosList } from "react-icons/io";
import { LuMapPin, LuCalendarOff, LuUsers2, LuArchive } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaParachuteBox, FaPeopleCarryBox } from "react-icons/fa6";


export const faqListing = [
    {
        question: "Comment réserver un service ?",
        answer: 'Voici la réponse Comment réserser un service...".'
    },
    {
        question: "Comment se passe le paiement des prestation ?",
        answer: "Plus d'informations sur les paiements...."
    },
    {
        question: "Quels services propose Dixino ?",
        answer: "Réponse à la question sur les services proposés par Dixino."
    },
] as const;

export const categories = [
    {
        label: "Nettoyage",
        icon: GiVacuumCleaner,
        description: "Gardez vos bureaux ou votre lieu de vie sans tâche",
        color: "#BEADFA"
    },
    {
        label: "Plomberie",
        icon: GiTap,
        description: "Trouvez un plombier sérieux pour vos réparations",
        color: "#FFF3DA"
    },
    {
        label: "Soins",
        icon: MdHealthAndSafety,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Jardinier",
        icon: MdHealthAndSafety,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Electricien",
        icon: MdHealthAndSafety,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    
] as const;

export const listingTabs = [
    {
        label: "Description",
        icon: IoIosList,
    },
    {
        label: "Candidats",
        icon: LuUsers2,
    },
    // {
    //     label: "Messages",
    //     icon: HiOutlineEnvelope,
    // },
] as const;

export const adminTabs = [
    {
        label: "Tableau de bord",
        icon: MdOutlineDashboard,
        index: 0
    },
    {
        label: "Employeurs",
        icon: FaParachuteBox,
        index: 1
    },
    {
        label: "Jobbistes",
        icon: FaPeopleCarryBox,
        index: 2
    },
] as const;

export const accountTabs = [
    {
        label: "Profil",
    },
    {
        label: "Prestations"
    },
    {
        label: "Identité"
    }
] as const
