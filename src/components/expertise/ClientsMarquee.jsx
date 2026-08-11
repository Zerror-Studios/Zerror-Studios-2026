import React from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'

export const clientsData = [
    {
        id: 1,
        title: "THR India",
        icon: "/images/homePage/clients/thr.svg"
    },
    {
        id: 2,
        title: "Esquire India",
        icon: "/images/homePage/clients/esquire.svg"
    },
    {
        id: 3,
        title: "Manifest",
        icon: "/images/homePage/clients/manifest.svg"
    },
    {
        id: 4,
        title: "Robb Report",
        icon: "/images/homePage/clients/robbreport.svg"
    },
    {
        id: 5,
        title: "SKF",
        icon: "/images/homePage/clients/skf.svg"
    },
     {
        id: 6,
        title: "Point Of",
        icon: "/images/homePage/clients/po.svg"
    },
    {
        id: 7,
        title: "Disrptve",
        icon: "/images/homePage/clients/disrptve.svg"
    },
    {
        id: 8,
        title: "Just Nosh",
        icon: "/images/homePage/clients/justnosh.svg"
    },
    {
        id: 9,
        title: "RPSG",
        icon: "/images/homePage/clients/rpsg.svg"
    },
    {
        id: 10,
        title: "Mad Earth",
        icon: "/images/homePage/clients/madearth.svg"
    },
    {
        id: 11,
        title: "RPSG Media",
        icon: "/images/homePage/clients/rpsgmedia.svg"
    },
    {
        id: 12,
        title: "Studio Akto",
        icon: "/images/homePage/clients/akto.svg"
    },
    {
        id: 13,
        title: "Heft art",
        icon: "/images/homePage/clients/heftyart.svg"
    },
    {
        id: 14,
        title: "Nahara",
        icon: "/images/homePage/clients/nahara.svg"
    },
    {
        id: 15,
        title: "SDAF",
        icon: "/images/homePage/clients/sdaf.svg"
    },
    // {
    //     id: 16,
    //     title: "Reside in Being",
    //     icon: "/images/homePage/clients/resideinbeing.svg"
    // },

]

const ClientsMarquee = () => {
    return (
        <>
            <div className=" h-32 md:h-44  flex items-center">
                <Marquee gradientWidth={40}>
                    {clientsData.map((item, i) => (
                        <div key={i} className=" w-40 md:w-52 md:mx-8">
                            <Image src={item.icon} width={128} height={128} className="w-full h-auto object-contain" style={{ filter: "brightness(0) saturate(100%) invert(11%) sepia(96%) saturate(5885%) hue-rotate(228deg) brightness(80%)" }} alt={item.title} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </>
    )
}

export default ClientsMarquee