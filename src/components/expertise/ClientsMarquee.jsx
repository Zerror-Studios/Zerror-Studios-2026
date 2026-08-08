import React from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'

 export const clientsData = [
    {
        id: 1,
        title: "Ananta",
        icon: "/images/homePage/clients/ananta.svg"
    },
    {
        id: 2,
        title: "Bro's Moving",
        icon: "/images/homePage/clients/bro'sMoving.svg"
    },
    {
        id: 3,
        title: "Casa Carigar",
        icon: "/images/homePage/clients/casacarigar.svg"
    },
    {
        id: 4,
        title: "Disrptve",
        icon: "/images/homePage/clients/disrptve.svg"
    },
    {
        id: 5,
        title: "Deveshe Dreams",
        icon: "/images/homePage/clients/deveshe.svg"
    },
    {
        id: 6,
        title: "Esquire India",
        icon: "/images/homePage/clients/esquire.svg"
    },
    {
        id: 7,
        title: "Just Nosh",
        icon: "/images/homePage/clients/justnosh.svg"
    },
    {
        id: 8,
        title: "Mad Earth",
        icon: "/images/homePage/clients/madearth.svg"
    },
    {
        id: 9,
        title: "RAS",
        icon: "/images/homePage/clients/ras.svg"
    },
    {
        id: 10,
        title: "Manifest",
        icon: "/images/homePage/clients/manifest.svg"
    },
    {
        id: 11,
        title: "RPSG Media",
        icon: "/images/homePage/clients/rpsgmedia.svg"
    },
    {
        id: 12,
        title: "SDAF",
        icon: "/images/homePage/clients/sdaf.svg"
    },
    {
        id: 13,
        title: "SKF",
        icon: "/images/homePage/clients/skf.svg"
    },
    {
        id: 14,
        title: "RPSG",
        icon: "/images/homePage/clients/rpsg.svg"
    },
    {
        id: 15,
        title: "Studio Akto",
        icon: "/images/homePage/clients/studioakto.svg"
    },
    {
        id: 16,
        title: "THR India",
        icon: "/images/homePage/clients/thr.svg"
    },
    {
        id: 17,
        title: "Winee Media",
        icon: "/images/homePage/clients/winemedia.svg"
    },
    {
        id: 18,
        title: "Elue Archive",
        icon: "/images/homePage/clients/elue.svg"
    },
    {
        id: 19,
        title: "Nobo",
        icon: "/images/homePage/clients/nobo.svg"
    },
    {
        id: 20,
        title: "Kaai",
        icon: "/images/homePage/clients/kaai.svg"
    }
]

const ClientsMarquee = () => {
    return (
        <>
            <div className=" pt-5 ">
                <Marquee gradient>
                    {clientsData.map((item, i) => (
                        <div key={i} className="w-26 mx-18">
                            <Image src={item.icon} width={128} height={128} className="w-full h-auto object-contain" style={{filter: "brightness(0) saturate(100%) invert(11%) sepia(96%) saturate(5885%) hue-rotate(228deg) brightness(80%)"}} alt={item.title} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </>
    )
}

export default ClientsMarquee