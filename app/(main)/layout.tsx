"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";

const MainLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    if (isLoading) {
        return(
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        );
    }
    return (
        <div> 
            {children}
        </div>
    );
}
 
export default MainLayout;