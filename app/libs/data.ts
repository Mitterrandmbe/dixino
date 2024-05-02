import { 
    MdHealthAndSafety, 
    MdOutlineDashboard,
    MdCarpenter,
    MdOutlineDesignServices,
    MdContentCut,
    MdOutlinePhoneIphone
} from "react-icons/md";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiTap } from "react-icons/gi";

import { IoIosList } from "react-icons/io";
import { LuMapPin, LuCalendarOff, LuUsers2, LuArchive, LuBaby, LuLanguages } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { 
    FaParachuteBox, 
    FaPeopleCarryBox, 
    FaPeoplePulling, 
    FaPeopleRoof,
    FaPaintRoller
} from "react-icons/fa6";
import { TbIroning2,  } from "react-icons/tb";
import { GiGardeningShears, GiCook } from "react-icons/gi";
import { BsPlug } from "react-icons/bs";
import { IoSchoolOutline, IoWalletOutline } from "react-icons/io5";
import { BiFridge, BiSolidDrink } from "react-icons/bi";
import { GrUserWorker } from "react-icons/gr";





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
        icon: FaPeopleCarryBox,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Frigoriste",
        icon: BiFridge,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Traducteur de text",
        icon: LuLanguages,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Hommes de chantier",
        icon: GrUserWorker,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Peintre",
        icon: FaPaintRoller,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Menuiserie",
        icon: MdCarpenter,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Décoration",
        icon: MdOutlineDesignServices,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Serveur / Hôtesse",
        icon: BiSolidDrink,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Coiffure",
        icon: MdContentCut,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Comptable",
        icon: IoWalletOutline,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Aide cuisinier(ère)",
        icon: GiCook,
        description: "Un infirmier(e) dévoué pour vos soins à domicile",
        color: "#FFCEFE"
    },
    {
        label: "Réparateur de GSM & ordinateur",
        icon: MdOutlinePhoneIphone,
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
