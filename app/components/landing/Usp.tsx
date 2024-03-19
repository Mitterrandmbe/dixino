
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { TbShape } from "react-icons/tb";

const Usp = () => {
  return (
    <div
        className="
            w-screen
            py-8
            border-x-[1px]
            shadow-sm
        "
    >
        <div
            className="
                flex
                flex-row
                justify-between
                max-w-lg
                lg:max-w-4xl
                md:w-3/5
                lg:w-1/2
                mx-auto
                px-8
                lg:px-0
            "
        >
            <div className="flex flex-row items-center gap-2 lg:gap-4">
                <IoShieldCheckmarkOutline size={20} className="text-primary"/>
                <h3 className="font-light text-sm md:text-md">Sans engagement</h3>
            </div>
            <div className="flex flex-row items-center gap-2 lg:gap-4">
                <RiMoneyEuroCircleLine size={20} className="text-primary"/>
                <h3 className="font-light text-sm md:text-md">Tarifs attractifs</h3>
            </div>
            <div className="flex flex-row items-center gap-2 lg:gap-4">
                <TbShape size={20} className="text-primary"/>
                <h3 className="font-light text-sm md:text-md">Flexible</h3>
            </div>

        </div>

    </div>
  )
}

export default Usp