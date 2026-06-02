import { Navigate, } from "react-router-dom";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

interface ProtectedRouteProps {
  user: User | null;        
  role: string | null;      
  requiredRole?: string;    
  children: ReactNode;      
}


const ProtectedRoute = ({ user, role, requiredRole, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login"/>;
  }
  if (role !== requiredRole) {
    return <Navigate to="/"/>; 
  }
  return children;
};

export default ProtectedRoute;
