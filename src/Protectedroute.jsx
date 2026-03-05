import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
export default function ProtectedRoute({children, allowedRoles})
{
const token=localStorage.getItem("token")
 if(!token)
 {
  return <Navigate  to ='/'/>;
 }

 const decode=jwtDecode(token)
 const role=decode.role;

 if(!allowedRoles.includes(role))
 {
  return <Navigate to='/'/>
 }
 return children;
}