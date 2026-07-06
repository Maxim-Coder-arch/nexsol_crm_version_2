'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hideToast } from '@/store/slices/uiSlice';
import styles from './index.module.scss';
import CloseIcon from '@/public/global/close';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import SuccessIcon from '@/public/global/success';
import ErrorIcon from '@/public/global/error';
import WarningIcon from '@/public/global/warning';
import InfoIcon from '@/public/global/info';

const Toast = () => {
    const dispatch = useAppDispatch();
    const { isOpen, type, title, message, actions, duration } = useAppSelector(
        (state) => state.ui.toast
    );

    useEffect(() => {
        if (isOpen && duration && duration > 0) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, dispatch]);

    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return <SuccessIcon />;
            case 'error': return <ErrorIcon />;
            case 'warning': return <WarningIcon />;
            default: return <InfoIcon />;
        }
    };

    const getTypeClass = () => {
        switch (type) {
            case 'success': return styles['toast--success'];
            case 'error': return styles['toast--error'];
            case 'warning': return styles['toast--warning'];
            default: return styles['toast--info'];
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles['toast-wrapper']}
            >
                <motion.div
                    initial={{ x: 100, opacity: 0, scale: 0.95 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 100, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`${styles['toast']} ${getTypeClass()}`}
                >
                    <div className={styles['toast__icon']}>
                        {getIcon()}
                    </div>

                    <div className={styles['toast__content']}>
                        {title && <h4 className={styles['toast__title']}>{title}</h4>}
                        <p className={styles['toast__message']}>{message}</p>
                    </div>

                    {actions && actions.length > 0 && (
                        <div className={styles['toast__actions']}>
                            {actions.map((action, index) => (
                                <button
                                    key={index}
                                    className={`${styles['toast__action']} ${action.variant ? styles[`toast__action--${action.variant}`] : ''}`}
                                    onClick={() => {
                                        action.onClick();
                                        dispatch(hideToast());
                                    }}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        className={styles['toast__close']}
                        onClick={() => dispatch(hideToast())}
                        aria-label="Закрыть"
                    >
                        <CloseIcon />
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast;