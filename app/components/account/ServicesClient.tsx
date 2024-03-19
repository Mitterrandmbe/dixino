"use client";

import { SafeService, SafeUser } from "@/app/types"
import Button from "../Button";

import { FiPlus } from "react-icons/fi";
import { categories } from "@/app/libs/data";
import Avatar from "../Avatar";
import { useMemo } from "react";
import { IconType } from "react-icons";
import React from "react";
import EmptyState from "../states/EmptyState";


interface ServicesClientProps {
    currentUser: SafeUser | null;
    services: SafeService[]
}

const ServicesClient: React.FC<ServicesClientProps> = ({
    currentUser,
    services
}) => {
  
   const servicesCategories = services.map((service) => service.category);

   const allCategories = categories.map((category) => category.label);
   const allCategoriesIcon = categories.map((category) => category.icon)

  //  Use Filter and Includes method
   const filteredCategories = useMemo(() => {
    return allCategories.filter(category => servicesCategories.includes(category))
   }, [allCategories, servicesCategories]);

   const getCategoryIcon = (label: string) => {
    const category = categories.find(cat => cat.label === label);
    return category ? category.icon : null;
   }

   const filteredCategoriesIcon = useMemo(() => {
    return filteredCategories.map(categoryLabel => getCategoryIcon(categoryLabel))
   }, [filteredCategories]);

   const iconName = useMemo(() => {
    return filteredCategoriesIcon.map(icon => icon?.name)
   }, [filteredCategoriesIcon]);


  if(filteredCategories.length === 0) {
    return (
      <EmptyState 
        title="Vous n'avez pas encore de tarifs"
        subtitle="Pour postuler à une offre, vous devez avoir créer un tarif de la même catégorie de service."
      />
    )
  };

  console.log("Tarifs: ", filteredCategories);
  
  
  return (
    <div 
      className="
        grid
        grid-cols
        md:grid-cols-2
        lg:grid-cols-4
        xl:grid-cols-6
        2xl:grid-cols-8
        gap-8
      "
    >
        
        {filteredCategories.map((category, index) => (
          <div
            key={category}
            className="
              flex
              flex-row
              justify-between
              border-2
              border-neutral-200
              rounded-md
              col-span-1
              md:col-span-1
              lg:col-span-2
              p-8
              cursor-pointer
              hover:shadow-lg
            "
          >
            {/* <div className="flex flex-col gap-4 w-36 h-36">
              {currentUser?.image && (
                <Avatar imageSrc={currentUser.image} />
              )}
            </div> */}
            <div className="flex flex-col gap-4">
              <div>
                {filteredCategoriesIcon[index] && React.createElement(filteredCategoriesIcon[index] as IconType, {size: 32})}
              </div>
              <div>
                {category}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* Categories an price  */}
              {services
                .filter((service) => service.category === category)
                .map((service) => (
                  <div
                    key={service.id}
                    className="font-semibold text-secondary text-2xl flex flex-row justify-end"
                  >
                    {service.price} <span className="text-sm">€/h</span> 
                  </div>
                ))
              }

              <div 
                className="p-2 border border-neutral-200 rounded-md hover:bg-secondary hover:text-white transition-all"
              >
                Supprimer
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ServicesClient