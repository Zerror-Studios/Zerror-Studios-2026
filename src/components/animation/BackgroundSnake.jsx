"use client";
import React, { useEffect, useRef } from 'react';

const BackgroundSnake = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const boxSize = 30;
        const color = "#002bba";
        const numSnakes = 6;
        const dirs = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ];

        let snakes = [];
        let cols = 0;
        let rows = 0;

        const initSnakes = () => {
            snakes = [];
            for (let i = 0; i < numSnakes; i++) {
                const head = {
                    x: Math.floor(Math.random() * cols),
                    y: Math.floor(Math.random() * rows)
                };
                const dirIdx = Math.floor(Math.random() * dirs.length);
                snakes.push({
                    body: [head],
                    dirIdx: dirIdx,
                    length: Math.floor(Math.random() * 2) + 3,
                    alpha: 1,
                    targetAlpha: 1
                });
            }
        };

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            cols = Math.ceil(rect.width / boxSize);
            rows = Math.ceil(rect.height / boxSize);

            if (snakes.length === 0) {
                initSnakes();
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        let lastTime = 0;
        const interval = 300;

        const handleContainerClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const gridX = Math.floor(x / boxSize);
            const gridY = Math.floor(y / boxSize);

            const dirIdx = Math.floor(Math.random() * dirs.length);
            const newSnake = {
                body: [{ x: gridX, y: gridY }],
                dirIdx: dirIdx,
                length: Math.floor(Math.random() * 2) + 3,
                alpha: 0,
                targetAlpha: 1
            };
            snakes.push(newSnake);

            const activeSnakes = snakes.filter(s => s.targetAlpha === 1 && s !== newSnake);
            if (activeSnakes.length > 0) {
                const snakeToFade = activeSnakes[Math.floor(Math.random() * activeSnakes.length)];
                snakeToFade.targetAlpha = 0;
            }
        };

        const parent = canvas.parentElement;
        if (parent) {
            parent.addEventListener('click', handleContainerClick);
        }

        const render = (time) => {
            if (time - lastTime > interval) {
                lastTime = time;

                snakes.forEach(snake => {
                    if (Math.random() < 0.3) {
                        const change = Math.random() < 0.5 ? 1 : -1;
                        snake.dirIdx = (snake.dirIdx + change + dirs.length) % dirs.length;
                    }

                    const head = snake.body[0];
                    const dir = dirs[snake.dirIdx];
                    let newX = head.x + dir.x;
                    let newY = head.y + dir.y;

                    if (newX < 0) newX = cols - 1;
                    if (newX >= cols) newX = 0;
                    if (newY < 0) newY = rows - 1;
                    if (newY >= rows) newY = 0;

                    snake.body.unshift({ x: newX, y: newY });
                    if (snake.body.length > snake.length) {
                        snake.body.pop();
                    }
                });
            }

            const rect = canvas.parentElement.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            snakes = snakes.filter(snake => !(snake.targetAlpha === 0 && snake.alpha < 0.01));

            snakes.forEach(snake => {
                snake.alpha += (snake.targetAlpha - snake.alpha) * 0.1;
                ctx.globalAlpha = snake.alpha;
                ctx.fillStyle = color;

                snake.body.forEach((segment) => {
                    ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize - 1, boxSize - 1);
                });
            });

            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            if (parent) {
                parent.removeEventListener('click', handleContainerClick);
            }
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 z-0"
        />

    )
}

export default BackgroundSnake