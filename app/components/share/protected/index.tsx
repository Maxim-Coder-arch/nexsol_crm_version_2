'use client';

import usePermission from "@/app/hooks/usePermission";
import Tooltip from "../tooltip";

interface UserProtectedProps {
    children: React.ReactNode;
    roles?: string[];
}

const UserProtected = ({ children, roles = ['director'] }: UserProtectedProps) => {
    const role = usePermission();
    const hasAccess = roles.includes(role || '');

    if (hasAccess) {
        return <>{children}</>;
    }

    return (
        <Tooltip>
            <div style={{ opacity: 0.7, pointerEvents: 'none' }}>
                {children}
            </div>
        </Tooltip>
    );
};

export default UserProtected;