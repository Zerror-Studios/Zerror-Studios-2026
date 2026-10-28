import React from 'react'
import Marquee from 'react-fast-marquee'
import ClientLogo from '../common/ClientLogo'

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

]

const ClientsMarquee = () => {
    return (
        <>
            <div className="  flex items-center">
                <Marquee gradientWidth={40}>
                    {clientsData.map((item, i) => (
                        <div key={i} className="md:mx-8">
                            <ClientLogo src={item.icon} title={item.title} className="w-80  md:w-52 text-[#002bba]" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </>
    )
}

export default ClientsMarquee