'use client';
import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealEls = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-fade'
    );

    if (prefersReduced) {
      revealEls.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function useCounter() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    if (prefersReduced) {
      statNumbers.forEach(el => {
        el.textContent = Number(el.dataset.target).toLocaleString() + (el.dataset.suffix || '');
      });
      return;
    }

    const animateCounter = (el, target, suffix) => {
      const duration = 2000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
        el.textContent = Math.floor(progress * target).toLocaleString() + suffix;
        if (frame >= totalFrames) {
          clearInterval(counter);
          el.textContent = target.toLocaleString() + suffix;
          el.classList.add('counting');
        }
      }, frameRate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el, parseInt(el.dataset.target, 10), el.dataset.suffix || '');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function useStagger() {
  useEffect(() => {
    document.querySelectorAll('.stagger-children').forEach(grid => {
      [...grid.children].forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.08}s`;
      });
    });
  }, []);
}
