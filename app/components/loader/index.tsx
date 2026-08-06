'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import IncludesLoaderComponent from './ui/includes';

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

  return <IncludesLoaderComponent isLoading={isLoading} />
};

export default LoaderComponent;