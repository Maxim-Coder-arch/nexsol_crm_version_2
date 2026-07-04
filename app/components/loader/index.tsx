'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.scss';

const LoaderComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
  }, [pathname]);

  useEffect(() => {
    if (!isLoading) return;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [isLoading, pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div 
        className={styles["loader"]}>
            <div className={styles["loader__points"]}>
                {Array.from({length: 3}).map((_, index) => {
                    return (
                        <motion.div 
                        initial={{ y: 0 }}
                        animate={{ 
                            y: [-10, 0, -10],
                        }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className={styles["loader__points__point"]} key={index}>
                            
                        </motion.div>
                    )
                })}
            </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoaderComponent;