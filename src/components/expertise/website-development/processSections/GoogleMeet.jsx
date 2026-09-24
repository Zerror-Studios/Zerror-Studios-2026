"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getCalApi } from "@calcom/embed-react";
import {
    RiMicFill, RiMicOffFill,
    RiVideoChatFill, RiVideoOffFill,
    RiEmotionLine,
    RiMessage3Fill, RiPhoneFill,
    RiCloseLine, RiSendPlane2Fill,
    RiCalendarEventLine, RiRefreshLine
} from '@remixicon/react';
import { useProjectForm } from "@/context/ProjectFormContext";

const clients = [
    {
        id: 1,
        name: 'Rahul Sharma (Client)',
        role: 'Client',
        initial: 'R',
        initialBg: 'bg-[#E65100]',
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
    { sender: 'Rahul Sharma (Client)', text: `Tested! This exceeds all expectations. Outstanding work team! 🎉`, time: '10:12 AM' },
];

const EMOJIS = ['💖', '👍', '🎉', '👏', '😂'];

const GoogleMeet = () => {
    let projectFormContext = null;
    try {
        projectFormContext = useProjectForm();
    } catch (e) {
        // Safe fallback if rendered outside provider
    }

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMicMuted, setIsMicMuted] = useState(true);
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [showEndCallModal, setShowEndCallModal] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [resetCountdown, setResetCountdown] = useState(5);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [floatingEmojis, setFloatingEmojis] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState(0);

    const chatContainerRef = useRef(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const initialScrollYRef = useRef(0);
    const isCalOpeningRef = useRef(false);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
        setIsVideoOff(true);
    };

    const toggleCamera = async () => {
        if (isCameraActive) {
            stopCamera();
        } else {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                    streamRef.current = stream;
                    setIsCameraActive(true);
                    setIsVideoOff(false);
                    initialScrollYRef.current = window.scrollY;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play().catch(console.error);
                    }
                }
            } catch (err) {
                console.error("Camera access error:", err);
                stopCamera();
            }
        }
    };

    const resetCallSession = () => {
        stopCamera();
        setIsCallEnded(false);
        setShowEndCallModal(false);
        setIsChatOpen(false);
        setIsMicMuted(true);
        setIsVideoOff(true);
        setShowEmojiPicker(false);
        setFloatingEmojis([]);
    };

    useEffect(() => {
        (async function () {
            try {
                const cal = await getCalApi({ namespace: "45min" });
                cal("ui", {
                    cssVarsPerTheme: {
                        light: { "cal-brand": "#002bba" },
                        dark: { "cal-brand": "#ffffff" },
                    },
                    hideEventTypeDetails: false,
                    layout: "month_view",
                });
            } catch (err) {
                console.error("Cal.com init error:", err);
            }
        })();
    }, []);

    const handleScheduleCall = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (isCalOpeningRef.current) return;
        isCalOpeningRef.current = true;
        setTimeout(() => {
            isCalOpeningRef.current = false;
        }, 1500);

        setShowEndCallModal(false);
        try {
            const cal = await getCalApi({ namespace: "45min" });
            cal("modal", {
                calLink: "zerror-studios-0hosjx/schedule-a-call",
                config: { layout: "month_view" }
            });
        } catch (err) {
            console.error("Cal.com modal error:", err);
        }
    };

    useEffect(() => {
        let timer;
        let interval;
        if (isCallEnded) {
            setResetCountdown(5);
            interval = setInterval(() => {
                setResetCountdown((prev) => (prev > 1 ? prev - 1 : 0));
            }, 1000);

            timer = setTimeout(() => {
                resetCallSession();
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [isCallEnded]);

    useEffect(() => {
        if (isCameraActive && streamRef.current && videoRef.current) {
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play().catch(console.error);
        }
    }, [isCameraActive]);

    useEffect(() => {
        if (!isCameraActive) return;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (Math.abs(currentScroll - initialScrollYRef.current) >= 25) {
                stopCamera();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isCameraActive]);

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

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
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleUp {
                from { opacity: 0; transform: scale(0.92); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out forwards;
            }
            .animate-scaleUp {
                animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
        `}</style>
            <section className="w-full h-full flex flex-col overflow-hidden">
                <div className="w-full h-full p-4 md:p-6 text-black flex flex-col font-sans overflow-hidden relative border border-black/10">

                    {isCallEnded ? (
                        /* Meeting Has Ended View */
                        <div className="w-full h-full bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center text-black relative overflow-hidden animate-fadeIn">
                            <div className="w-20 h-20 rounded-full bg-[#002bba]/10 flex items-center justify-center mb-5 shadow-sm">
                                <img className="w-10 h-10 object-contain" src="/logo_white.svg" alt="Zerror" style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(3780%) hue-rotate(227deg) brightness(88%) contrast(106%)' }} />
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                                You left the call
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
                                Thank you for exploring Zerror Studios' interactive website development workflow demo.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <button
                                    onClick={resetCallSession}
                                    className="w-full sm:w-auto bg-[#002bba] hover:bg-[#00208a] text-white px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <RiRefreshLine size={18} />
                                    Rejoin Call Now
                                </button>
                                <button
                                    onClick={handleScheduleCall}
                                    className="w-full sm:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <RiCalendarEventLine size={18} className="text-[#002bba]" />
                                    Schedule a Call
                                </button>
                            </div>

                        </div>
                    ) : (
                        <>
                            {/* End Call Confirmation Modal */}
                            {showEndCallModal && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-gray-100 flex flex-col items-center gap-3 relative animate-scaleUp">
                                        <button
                                            onClick={() => setShowEndCallModal(false)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            <RiCloseLine size={20} />
                                        </button>

                                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-[#EA4335] mb-1">
                                            <RiPhoneFill size={28} className="rotate-[135deg]" />
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                            Leave the Meeting?
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
                                            Would you like to schedule a dedicated project call with Zerror Studios or end this meeting now?
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                                            <button
                                                onClick={handleScheduleCall}
                                                className="flex-1 bg-[#002bba] hover:bg-[#00208a] text-white px-4 py-3 rounded-full font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <RiCalendarEventLine size={18} />
                                                Schedule a Call
                                            </button>
                                            <button
                                                onClick={() => {
                                                    stopCamera();
                                                    setShowEndCallModal(false);
                                                    setIsCallEnded(true);
                                                }}
                                                className="flex-1 bg-[#EA4335] hover:bg-[#D93025] text-white px-4 py-3 rounded-full font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                            >
                                                <RiPhoneFill size={16} className="rotate-[135deg]" />
                                                End Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Floating Emojis Overlay */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden z-90">
                                {floatingEmojis.map(item => (
                                    <div key={item.id} className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-floatUp">
                                        <div className="animate-wave text-5xl drop-shadow-md">
                                            {item.emoji}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Main Content Area */}
                            <div className={`flex-1 flex overflow-hidden ${isChatOpen ? "gap-2" : "gap-0"} transition-all duration-300 pointer-events-none`}>

                                {/* Video Grid */}
                                <div className="h-full w-full gap-2.5 grid grid-cols-2 md:grid-cols-3">
                                    {clients.map((client) => (
                                        <div
                                            key={client.id}
                                            className={`relative rounded-lg w-full h-full overflow-hidden group transition-all duration-300 ${client.bgColor} ${client.isZerror ? 'col-span-2 md:col-span-2' : 'col-span-1'
                                                }`}
                                        >
                                            {client.isZerror ? (
                                                // Zerror Brand Box / Camera Feed
                                                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
                                                    {/* Live Camera Feed */}
                                                    <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isCameraActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
                                                        <video
                                                            ref={videoRef}
                                                            autoPlay
                                                            playsInline
                                                            muted
                                                            className="w-full h-full object-cover scale-x-[-1]"
                                                        />
                                                    </div>

                                                    {/* Zerror Logo Default Content */}
                                                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isCameraActive ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}>
                                                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden center bg_blue shadow-md">
                                                            <img className='w-[70%]' src="/logo_white.svg" alt="Zerror" />
                                                        </div>

                                                        <div className="absolute bottom-6 flex gap-1.5">
                                                            <div className="w-2 h-2 rounded-full bg_blue animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                            <div className="w-2 h-2 rounded-full bg_blue animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                            <div className="w-2 h-2 rounded-full bg_blue animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                        </div>
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
                                            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-20">
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
                                    <div className={`flex flex-col h-full w-full min-w-[20rem] transition-opacity duration-300 ${isChatOpen ? 'opacity-100 delay-[300ms]' : 'opacity-0 delay-[300ms]'}`}>
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
                            <div className="w-full bg-white flex items-center justify-center gap-3 border-t border-gray-100 pt-3 mt-3 relative shrink-0">

                                {/* Mic */}
                                <button
                                    onClick={() => setIsMicMuted(!isMicMuted)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1 ${isMicMuted ? 'bg-[#EA4335] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                >
                                    {isMicMuted ? <RiMicOffFill size={22} /> : <RiMicFill size={22} />}
                                </button>

                                {/* Video */}
                                <button
                                    onClick={toggleCamera}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1 ${isVideoOff ? 'bg-[#EA4335] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                >
                                    {isVideoOff ? <RiVideoOffFill size={22} /> : <RiVideoChatFill size={22} />}
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
                                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`w-12 h-12 rounded-full hover:-translate-y-1 flex items-center justify-center transition-all duration-200 ${showEmojiPicker ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                                        <RiEmotionLine size={22} />
                                    </button>
                                </div>

                                {/* Chat Toggle */}
                                <button
                                    onClick={() => setIsChatOpen(!isChatOpen)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1 relative ${isChatOpen ? 'bg-blue-100 text-[#002bba]' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                >
                                    <RiMessage3Fill size={22} />
                                    {!isChatOpen && (
                                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                                    )}
                                </button>

                                {/* End Call */}
                                <button
                                    onClick={() => setShowEndCallModal(true)}
                                    className="w-20 h-12 rounded-full bg-[#EA4335] hover:bg-[#D93025] hover:-translate-y-1 text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                                >
                                    <RiPhoneFill size={24} className="rotate-[135deg]" />
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </section>
        </>
    );
};

export default GoogleMeet;