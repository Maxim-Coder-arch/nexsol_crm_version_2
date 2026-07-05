import React from "react";

const TemplateContent = ({ children }: { children: React.ReactNode } ) => {
    return (
        <div className="full-size">
            <div className="root-content">
                {children}
            </div>
        </div>
    )
}

export default TemplateContent;