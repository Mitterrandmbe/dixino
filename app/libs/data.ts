import { MdHealthAndSafety, MdOutlineDashboard } from "react-icons/md";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiTap } from "react-icons/gi";

import { IoIosList } from "react-icons/io";
import { LuMapPin, LuCalendarOff, LuUsers2, LuArchive, LuBaby } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaParachuteBox, FaPeopleCarryBox, FaPeoplePulling, FaPeopleRoof } from "react-icons/fa6";
import { TbIroning2,  } from "react-icons/tb";
import { GiGardeningShears } from "react-icons/gi";
import { BsPlug } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";




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
        label: "Repassage",
        icon: TbIroning2,
        description: "Gardez vos vêtement propres et repassés",
        color: "#BEADFA"
    },
    {
        label: "Plomberie",
        icon: GiTap,
        description: "Trouvez un plombier sérieux pour vos réparations",
        color: "#FFF3DA"
    },
    {
        label: "Soins - Aide-soignant(e)",
        icon: MdHealthAndSafety,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Jardinier",
        icon: GiGardeningShears,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Electricien",
        icon: BsPlug,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Babysitting",
        icon: LuBaby,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Aide familiale",
        icon: FaPeopleRoof,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Aide aux personnes âgées",
        icon: FaPeoplePulling,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Soutien scolaire",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Déménagement",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Frigoriste",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Traducteur de text",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Hommes de chantier",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Peintre",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Menuiserie",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Décoration",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Serveur / Hôtesse",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Coiffure",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Comptable",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Aide cuisinier(ère)",
        icon: IoSchoolOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Réparateur de GSM & ordinateur",
        icon: IoSchoolOutline,
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
