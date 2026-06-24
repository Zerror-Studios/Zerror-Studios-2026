import React from 'react'
import Marquee from 'react-fast-marquee'

const clientsData = [
    {
        id: 1,
        title: "Vishwa Samudra",
        icon: "/images/homePage/clients/1_Vishwa_Samudra.png"
    },
    {
        id: 2,
        title: "Rupay",
        icon: "/images/homePage/clients/2_Rupay.png"
    },
    {
        id: 3,
        title: "Devgn",
        icon: "/images/homePage/clients/3_Devgn.png"
    },
    {
        id: 4,
        title: "Flipkart",
        icon: "/images/homePage/clients/4_Flipkart.png"
    },
    {
        id: 6,
        title: "Imagine",
        icon: "/images/homePage/clients/6_Imagine.png"
    },
    {
        id: 7,
        title: "Kuwait Airways",
        icon: "/images/homePage/clients/7_Kuwait.png"
    },
    {
        id: 8,
        title: "TATA Motors",
        icon: "/images/homePage/clients/8_TATA.png"
    },
    {
        id: 9,
        title: "Piramal",
        icon: "/images/homePage/clients/9_Piramal.png"
    },
    {
        id: 10,
        title: "Prominance",
        icon: "/images/homePage/clients/10_Prominance.png"
    },
    {
        id: 13,
        title: "Flaunt Your Ink",
        icon: "/images/homePage/clients/13_Flaunt Your Ink.png"
    },
    {
        id: 14,
        title: "Shivdutt Das Art Foundation",
        icon: "/images/homePage/clients/14_SDAF.png"
    },
    {
        id: 15,
        title: "Superyou",
        icon: "/images/homePage/clients/15_Superyou.png"
    },
    {
        id: 16,
        title: "The Laundry House",
        icon: "/images/homePage/clients/16_TLH.png"
    },
    {
        id: 17,
        title: "Candor Foods",
        icon: "/images/homePage/clients/17_Candor_Foods.png"
    },
    {
        id: 19,
        title: "Ellementry",
        icon: "/images/homePage/clients/19_Ellementry.png"
    },
    {
        id: 20,
        title: "Dalhousie Public school",
        icon: "/images/homePage/clients/20_Dalhousie.png"
    },
]

const ClientsMarquee = () => {
    return (
        <>
            <div className=" pt-5 ">
                <Marquee gradient>
                    {clientsData.map((item, i) => (
                        <div key={i} className="w-44 mx-10">
                            <img src={item.icon} style={{filter: "brightness(0) saturate(100%) invert(11%) sepia(96%) saturate(5885%) hue-rotate(228deg) brightness(80%)"}} alt={item.title} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </>
    )
}

export default ClientsMarquee