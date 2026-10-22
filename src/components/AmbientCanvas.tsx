/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface AmbientCanvasProps {
  reducedMotion?: boolean;
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Organic floating energy nodes (representing 8 octopus data nodes)
    const nodes = Array.from({ length: 16 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.9,
      radius: Math.random() * 2.5 + 1.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      hue: i % 2 === 0 ? 168 : 155, // Emerald to Bright Teal
      alpha: Math.random() * 0.35 + 0.15,
      pulse: Math.random() * Math.PI,
    }));

    // Soft floating wave parameters
    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting strands between nearby nodes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.12;
            ctx.strokeStyle = `rgba(25, 185, 154, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            // Gentle bezier curve to give organic tentacle feeling
            const cx = (nodes[i].x + nodes[j].x) / 2 + Math.sin(time + i) * 15;
            const cy = (nodes[i].y + nodes[j].y) / 2 + Math.cos(time + j) * 15;
            ctx.quadraticCurveTo(cx, cy, nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        // Wrap around boundaries smoothly
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height * 0.9;
        if (n.y > height * 0.9) n.y = 0;

        const currentRadius = n.radius + Math.sin(n.pulse) * 0.8;
        const currentAlpha = n.alpha + Math.sin(n.pulse) * 0.08;

        // Outer aura
        const gradient = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          currentRadius * 5
        );
        gradient.addColorStop(0, `hsla(${n.hue}, 80%, 45%, ${currentAlpha * 0.8})`);
        gradient.addColorStop(1, `hsla(${n.hue}, 80%, 45%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(${n.hue}, 90%, 55%, ${currentAlpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
