"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    RiMicFill, RiMicOffFill,
    RiVideoChatFill, RiVideoOffFill,
    RiEmotionLine, RiHand,
    RiMessage3Fill, RiPhoneFill,
    RiMore2Fill, RiCloseLine, RiSendPlane2Fill
} from '@remixicon/react';

const clients = [
    {
        id: 1,
        name: 'Rahul Sharma (Client)',
        role: 'Client',
        img: '/images/expertisePage/website-development/process_scroller/rahul_sharma.png',
        bgColor: 'bg-[#FFF3E0]'
    },
    {
        id: 2,
        name: 'Sunny (Developer)',
        role: 'Developer',
        initial: 'S',
        initialBg: 'bg-[#1A73E8]',
        bgColor: 'bg-[#E3F2FD]'
    },
    {
        id: 3,
        name: 'Mehak (Manager)',
        role: 'Design Head',
        initial: 'M',
        initialBg: 'bg-[#D81B60]',
        bgColor: 'bg-[#FCE4EC]'
    },
    {
        id: 4,
        name: 'Lingkan (Designer)',
        role: 'Designer',
        initial: 'L',
        initialBg: 'bg-[#00897B]',
        bgColor: 'bg-[#E0F2F1]'
    },
    {
        id: 5,
        name: 'Zerror',
        isZerror: true,
        bgColor: "bg-[#002bba50]"
    },
];

const dummyChat = [
    { sender: 'Rahul Sharma (Client)', text: 'Hey team! The interactive process layout looks fantastic.', time: '10:02 AM' },
    { sender: 'Sunny (Developer)', text: 'Thanks Rahul! The GSAP scroll animations are optimized and running smoothly.', time: '10:03 AM' },
    { sender: 'Mehak (Design Head)', text: 'We aligned every pixel with our design system tokens.', time: '10:04 AM' },
    { sender: 'Lingkan (Designer)', text: 'Updated all component variants and responsive layouts as well.', time: '10:05 AM' },
    { sender: 'Zerror', text: 'We also boosted performance scores to 95+ on PageSpeed.', time: '10:06 AM' },
    { sender: 'Rahul Sharma (Client)', text: 'Awesome! Can we push this build to the staging server?', time: '10:07 AM' },
    { sender: 'Sunny (Developer)', text: 'Deploying to staging right now. Build pipeline initiated!', time: '10:08 AM' },
    { sender: 'Lingkan (Designer)', text: 'Mobile viewport testing is complete and verified.', time: '10:09 AM' },
    { sender: 'Zerror', text: 'Staging is live! Check it out here: https://www.zerrorstudios.com', time: '10:10 AM' },
    { sender: 'Mehak (Design Head)', text: 'Dark mode contrast ratios are fully optimized as well.', time: '10:11 AM' },
    { sender: 'Rahul Sharma (Client)', text: 'Tested! This exceeds all expectations. Outstanding work team! 🎉', time: '10:12 AM' },
];

const EMOJIS = ['💖', '👍', '🎉', '👏', '😂'];

const GoogleMeet = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isHandRaised, setIsHandRaised] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [floatingEmojis, setFloatingEmojis] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState(0);
    const chatContainerRef = useRef(null);

    const handleEmojiClick = (emoji) => {
        const id = Date.now() + Math.random();
        setFloatingEmojis(prev => [...prev, { id, emoji }]);
        setShowEmojiPicker(false);
        setTimeout(() => {
            setFloatingEmojis(prev => prev.filter(e => e.id !== id));
        }, 3000);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [visibleMessages]);
    useEffect(() => {
        let timeout;
        if (isHandRaised) {
            timeout = setTimeout(() => {
                setIsHandRaised(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isHandRaised]);

    useEffect(() => {
        if (isChatOpen) {
            setVisibleMessages(0);
            const interval = setInterval(() => {
                setVisibleMessages((prev) => {
                    if (prev < dummyChat.length) {
                        return prev + 1;
                    }
                    clearInterval(interval);
                    return prev;
                });
            }, 1500);
            return () => clearInterval(interval);
        } else {
            setVisibleMessages(0);
        }
    }, [isChatOpen]);

    return (
        <>
            <style>{`
            @keyframes chatBubble {
                0% { transform: scale(0.8) translateY(10px); opacity: 0; }
                50% { transform: scale(1.05) translateY(-2px); opacity: 1; }
                100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            .animate-chatBubble {
                animation: chatBubble 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            @keyframes floatUp {
                0% { transform: translateY(0) scale(0.5); opacity: 0; }
                15% { transform: translateY(-100px) scale(1.5); opacity: 1; }
                100% { transform: translateY(-600px) scale(1); opacity: 0; }
            }
            @keyframes wave {
                0% { transform: translateX(0); }
                25% { transform: translateX(-40px); }
                50% { transform: translateX(40px); }
                75% { transform: translateX(-30px); }
                100% { transform: translateX(0); }
            }
            .animate-floatUp {
                animation: floatUp 3s ease-out forwards;
            }
            .animate-wave {
                animation: wave 3s ease-in-out forwards;
            }
        `}</style>
            <section className="w-full h-full flex flex-col overflow-hidden">
                <div className="w-full h-full bg-white p-4 md:p-6 text-black flex flex-col font-sans overflow-hidden relative border border-black/10">

                    {/* Floating Emojis Overlay */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
                        {floatingEmojis.map(item => (
                            <div key={item.id} className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-floatUp">
                                <div className="animate-wave text-5xl drop- ">
                                    {item.emoji}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className={`flex-1 flex overflow-hidden ${isChatOpen ? "gap-2" : "gap-0"} transition-all duration-300`}>

                        {/* Video Grid */}
                        <div className="h-full w-full gap-2.5 grid grid-cols-2 md:grid-cols-3">
                            {clients.map((client) => (
                                <div
                                    key={client.id}
                                    className={`relative rounded-lg w-full h-full overflow-hidden group transition-all duration-300 ${client.bgColor} ${client.isZerror ? 'col-span-2 md:col-span-2' : 'col-span-1'
                                        }`}
                                >
                                    {client.isZerror ? (
                                        // Zerror Brand Box
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden center bg_blue shadow-md">
                                                <img className='w-[70%]' src="/logo_white.svg" alt="Zerror" />
                                            </div>

                                            <div className="absolute bottom-6 flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg_blue animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 rounded-full bg_blue animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 rounded-full bg_blue animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    ) : client.initial ? (
                                        // Initial Letter Symbol Box
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-white font-bold text-3xl sm:text-4xl md:text-5xl shadow-md ${client.initialBg}`}>
                                                {client.initial}
                                            </div>
                                        </div>
                                    ) : (
                                        // Client Avatar Image Box
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/80 shadow-md">
                                                <img src={client.img} alt={client.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Overlay Info */}
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
                                        {client.isZerror && !isMicMuted ? (
                                            <div className="w-5 h-5 rounded-full bg-[#1A73E8] flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                <RiMicOffFill size={11} className="text-white" />
                                            </div>
                                        )}
                                        <span className="text-[11px] sm:text-xs font-medium bg-white/80 text-gray-900 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-xs">
                                            {client.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Panel Sidebar */}
                        <div className={`bg-white rounded-md flex flex-col overflow-hidden transition-[width,border,shadow] duration-500 ease-in-out origin-right border-gray-200 ${isChatOpen ? 'w-[35%] border ' : 'w-0 border-none'}`}>
                            <div className={`flex flex-col h-full w-full min-w-[20rem] transition-opacity duration-300 ${isChatOpen ? 'opacity-100 delay-[300ms]' : 'opacity-0 delay-[300ms'}`}>
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 text-black">
                                    <h3 className="font-semibold">In-call messages</h3>
                                    <RiCloseLine
                                        size={20}
                                        className="cursor-pointer text-gray-500 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                                        onClick={() => setIsChatOpen(false)}
                                    />
                                </div>
                                <div data-lenis-prevent ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto scroller_none bg-white flex flex-col gap-4 text-black text-sm relative scroll-smooth">
                                    <p className="text-xs text-gray-400 text-center bg-gray-50 py-2 rounded-lg shrink-0">Messages can only be seen by people in the call and are deleted when the call ends.</p>

                                    {dummyChat.slice(0, visibleMessages).map((msg, idx) => {
                                        const isZerror = msg.sender === 'Zerror';
                                        return (
                                            <div key={idx} className={`flex flex-col w-full opacity-0 animate-chatBubble ${isZerror ? 'items-end' : 'items-start'}`}>
                                                <div className={`flex items-baseline gap-2 mb-1 ${isZerror ? 'flex-row-reverse' : ''}`}>
                                                    <span className="font-semibold text-[13px]">{msg.sender}</span>
                                                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                                                </div>
                                                <div className={`text-[13px] p-2 rounded-xl max-w-[85%] ${isZerror ? 'bg-[#002bba] text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Send a message..."
                                        className="flex-1 bg-gray-100 text-black text-sm px-4 py-2 rounded-full outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1A73E8] hover:bg-blue-50 transition-colors">
                                        <RiSendPlane2Fill size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Control Bar */}
                    <div className="w-full bg-white flex items-center justify-center gap-2 border-t border-gray-100 pt-3 mt-3 relative shrink-0">

                        {/* Raise Hand CTA */}
                        <div className={`absolute left-0 flex items-center gap-2 bg-[#002bba] text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 origin-left cursor-pointer hover:bg-[#00208a]  ${isHandRaised ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                            <RiHand size={18} />
                            Raise your hand for real - book a call!
                        </div>

                        {/* Mic */}
                        <button
                            onClick={() => setIsMicMuted(!isMicMuted)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200  hover:-translate-y-1 ${isMicMuted ? 'bg-[#EA4335] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                            {isMicMuted ? <RiMicOffFill size={22} /> : <RiMicFill size={22} />}
                        </button>

                        {/* Video */}
                        <button
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200  hover:-translate-y-1 ${isVideoOff ? 'bg-[#EA4335] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                            {isVideoOff ? <RiVideoOffFill size={22} /> : <RiVideoChatFill size={22} />}
                        </button>

                        {/* Hand Raise */}
                        <button
                            onClick={() => setIsHandRaised(!isHandRaised)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200  hover:-translate-y-1 ${isHandRaised ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                            <RiHand size={22} />
                        </button>

                        {/* Emoji / React */}
                        <div className="relative flex items-center justify-center">
                            <div className={`absolute bottom-16 bg-[#202124] rounded-full px-4 py-2 flex items-center gap-4 transition-all duration-300 origin-bottom shadow-lg ${showEmojiPicker ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                {EMOJIS.map(emoji => (
                                    <button key={emoji} onClick={() => handleEmojiClick(emoji)} className="text-2xl hover:scale-125 transition-transform">
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`w-12 h-12 rounded-full  hover:-translate-y-1 flex items-center justify-center transition-all duration-200 ${showEmojiPicker ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                                <RiEmotionLine size={22} />
                            </button>
                        </div>

                        {/* More */}
                        <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200  hover:-translate-y-1 text-gray-700 flex items-center justify-center transition-all duration-200 hidden md:flex">
                            <RiMore2Fill size={22} />
                        </button>

                        {/* Chat Toggle */}
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200  hover:-translate-y-1 relative ${isChatOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                            <RiMessage3Fill size={22} />
                            {!isChatOpen && (
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                            )}
                        </button>

                        {/* End Call */}
                        <button className="w-20 h-12 rounded-full bg-[#EA4335] hover:bg-[#D93025] hover:-translate-y-1 text-white flex items-center justify-center transition-all duration-200">
                            <RiPhoneFill size={24} className="rotate-[135deg]" />
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default GoogleMeet;