'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from "./index.module.scss";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
                setLoading(false);
                return;
            }

            router.push('/');
            window.location.reload();
        } catch (error) {
            console.error('Login error:', error);
            setError('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className={styles["login"]}>
            <div className={styles["login__greeting"]}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={styles["login__greeting__text"]}
                >
                    <h1>Добро пожаловать в <span>Solid Nexus Core</span>!</h1>
                    <p>Система для эффективного управления бизнесом</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className={styles["login__greeting__sentence"]}
                >
                    <h2>Ты студент? Нет коммерческого опыта? Хочешь попробовать себя в новом?</h2>
                    <h3>Мы — digital-агентство. Продвигаем малые бизнесы: разрабатываем сайты, настраиваем рекламу, ведём SMM.</h3>
                    <p>Ищешь работу? Пиши нам скорей!</p>
                    <div className={styles["login__greeting__socials"]}>
                        <a href="#" className={styles["social-btn"]}>ВКонтакте</a>
                        <a href="#" className={styles["social-btn"]}>Telegram</a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                className={styles["login__form-wrapper"]}
            >
                <div className={styles["login__card"]}>
                    <div className={styles["login__card__header"]}>
                        <h2>Вход в систему</h2>
                        <p>Введите свои данные для входа</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles["login__form"]}>
                        {error && (
                            <div className={styles["login__error"]}>
                                {error}
                            </div>
                        )}

                        <div className={styles["form-group"]}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="example@mail.ru"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label>Пароль</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading} className={styles["login__btn"]}>
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}