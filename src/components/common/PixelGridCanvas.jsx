"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PixelGridCanvas = ({
    isActive = false,
    boxSize = 30,
    color = "#002bba",
    duration = 1.5,
    className = "absolute inset-0 w-full h-full pointer-events-none z-0"
}) => {
    const canvasRef = useRef(null);
    const animRef = useRef({ progress: isActive ? 1 : 0 });
    const tweenRef = useRef(null);
    const squaresRef = useRef([]);

    const initGrid = (width, height) => {
        const cellSize = boxSize;
        const cols = Math.ceil(width / cellSize);
        const rows = Math.ceil(height / cellSize);

        const squares = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                squares.push({
                    x: c * cellSize,
                    y: r * cellSize,
                    size: cellSize,
                    threshold: Math.random() * 0.75,
                });
            }
        }
        squaresRef.current = squares;
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const targetWidth = Math.floor(rect.width * dpr);
        const targetHeight = Math.floor(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            initGrid(rect.width, rect.height);
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, rect.width, rect.height);

        const progress = animRef.current.progress;

        ctx.fillStyle = color;
        squaresRef.current.forEach((sq) => {
            if (progress > sq.threshold) {
                ctx.fillRect(sq.x, sq.y, sq.size + 0.5, sq.size + 0.5);
            }
        });

        ctx.restore();
    };

    useEffect(() => {
        const targetProgress = isActive ? 1 : 0;

        tweenRef.current?.kill();
        tweenRef.current = gsap.to(animRef.current, {
            progress: targetProgress,
            duration: duration,
            ease: "power2.out",
            onUpdate: draw,
        });
    }, [isActive, duration]);

    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                initGrid(rect.width, rect.height);
                draw();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            tweenRef.current?.kill();
        };
    }, [boxSize]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
        />
    );
};

export default PixelGridCanvas;
