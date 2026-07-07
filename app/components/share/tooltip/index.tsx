'use client';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

interface TooltipProps {
    children: ReactNode;
    content?: string;
    delay?: number;
    followCursor?: boolean;
    offset?: number;
}

const Tooltip = ({
    children,
    content = "Недостаточно прав",
    delay = 300,
    followCursor = true,
    offset = 12,
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const childRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (followCursor) {
            setPosition({ x: e.clientX, y: e.clientY });
        }
        const timeout = setTimeout(() => setIsVisible(true), delay);
        setTimer(timeout);
    };

    const handleMouseLeave = () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setIsVisible(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (followCursor && isVisible) {
            setPosition({ x: e.clientX, y: e.clientY });
        }
    };

    if (!isMounted) {
        return <div ref={childRef}>{children}</div>;
    }

    const tooltipContent = isVisible && (
        <div
            className={styles['tooltip']}
            style={{
                position: 'fixed',
                left: followCursor ? position.x + offset : '50%',
                top: followCursor ? position.y + offset : '50%',
                transform: followCursor
                    ? 'translate(0, 0)'
                    : 'translate(-50%, -50%)',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        >
            {content}
            <div className={styles['tooltip__arrow']} />
        </div>
    );

    return (
        <div
            ref={childRef}
            className={styles['tooltip-wrapper']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {children}
            {createPortal(tooltipContent, document.body)}
        </div>
    );
};

export default Tooltip;