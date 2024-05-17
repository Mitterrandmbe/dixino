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
        question: "Comment réserver un service?",
        answer: 'Pour réserver un service, il suffit de poster une offre sur la plateforme. Vous recevrez à ce moment des candidatures de plusieurs de nos professionnels. il vous suffit de retenir le ou la candidat(e) qui vous convient le mieux et de procéder au paiement.  Voilà, votre réservation est faite.'
    },
    {
        question: "Comment se passe le paiement des prestations?",
        answer: "Le paiement ne se fait uniquement lorsque que vous sélectionné le professionnel qui vous convient le mieux. Cependant, le professionnel n'est payé qu'une fois la prestation effectuée."
    },
    {
        question: "Quels services propose Dixino?",
        answer: "Nous proposons des services très variés. Cela va du nettoyage à la plomberie en passant par la coiffure. Nous vous invitons à consoulter la liste de nous services. Vous y trouverez sûrement votre bonheur."
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
        description: "Gardez vos vêtements propres et repassés",
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
        description: "L'herbe ne sera tojours verte chez vous",
        color: "#FFCEFE"
    },
    {
        label: "Electricien",
        icon: BsPlug,
        description: "Réglez vos pannes électriques tout en respectant les normes",
        color: "#FFCEFE"
    },
    {
        label: "Babysitting",
        icon: LuBaby,
        description: "Une personne de confiance pour amuser vos enfants et prendre soin d'eux",
        color: "#FFCEFE"
    },
    {
        label: "Aide familiale",
        icon: FaPeopleRoof,
        description: "L'aide familiale assiste votre famille pour une condition de vie agréable",
        color: "#FFCEFE"
    },
    {
        label: "Aide aux personnes âgées",
        icon: FaPeoplePulling,
        description: "Une personne responsable qui vous accompagne et soulage vos quotidiens",
        color: "#FFCEFE"
    },
    {
        label: "Soutien scolaire",
        icon: IoSchoolOutline,
        description: "Un professeur qui soutien vous et ou vos enfants durant son année scolaire",
        color: "#FFCEFE"
    },
    {
        label: "Déménagement",
        icon: FaPeopleCarryBox,
        description: "Des mains solides et délicates à la fois pour assurer vos déménagements sans endomager vos objects les plus précieux",
        color: "#FFCEFE"
    },
    {
        label: "Frigoriste",
        icon: BiFridge,
        description: "Un expert pour installer et réparer votre frigo et ou votre congélateur",
        color: "#FFCEFE"
    },
    {
        label: "Traducteur de text",
        icon: LuLanguages,
        description: "Traduisez des textes dans toutes les langues de votre choix",
        color: "#FFCEFE"
    },
    {
        label: "Hommes de chantier",
        icon: GrUserWorker,
        description: "Une personne pour s'assurer du bon déroulement d'un chantier",
        color: "#FFCEFE"
    },
    {
        label: "Peintre",
        icon: FaPaintRoller,
        description: "Choisissez la ou les couleur(s) et le peintre fera le reste",
        color: "#FFCEFE"
    },
    {
        label: "Menuiserie",
        icon: MdCarpenter,
        description: "Armoire, kicket, parket ou esclaier? C'est vous qui choisissez",
        color: "#FFCEFE"
    },
    {
        label: "Décoration",
        icon: MdOutlineDesignServices,
        description: "Un(e) professionnel(le) pour vous aider à décorer vos logements et selon vos goûts",
        color: "#FFCEFE"
    },
    {
        label: "Serveur / Hôtesse",
        icon: BiSolidDrink,
        description: "Une personne présentable et rigoureuse pour un service impeccable",
        color: "#FFCEFE"
    },
    {
        label: "Coiffure",
        icon: MdContentCut,
        description: "Avec ou sans idée de coiffure, vous serez satisfait(e) de votre coiffeur ou coiffeuse ",
        color: "#FFCEFE"
    },
    {
        label: "Comptable",
        icon: IoWalletOutline,
        description: "Confiez la gestion de vos comptes à un expert et concentrez vous sur votre activité",
        color: "#FFCEFE"
    },
    {
        label: "Aide cuisinier(ère)",
        icon: GiCook,
        description: "Profitez pendant que votre cuisinier ou cuisinière vous préparer un délicieux repas que vous aurez choisi",
        color: "#FFCEFE"
    },
    {
        label: "Réparateur de GSM & ordinateur",
        icon: MdOutlinePhoneIphone,
        description: "Votre écran de téléphone cassé ou un ordinateur endomagé sera une histoire ancienne",
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


export const accountType = [
    {
        label: "Professionnel",
        enum: "PRO",
    },
    {
        label: "Etudiant",
        enum: "STUDENT",
    },
    {
        label: "Autre",
        enum: "OTHER"
    }
] as const