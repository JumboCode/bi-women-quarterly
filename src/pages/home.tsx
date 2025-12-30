import AdminHomePage from "@/components/AdminHomePage";
import HomePage from "@/components/HomePage";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const TEMP_FORMS_REDIRECT = "https://tinyurl.com/BWQ-Submissions";

  useEffect(() => {
    window.location.replace(TEMP_FORMS_REDIRECT);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center gradient-background">
      <div className="text-lg text-primary-blue">
        Redirecting you to the submission form...
      </div>
    </div>
  );
}

// export default function Home() {
//     const { user } = useUser();
//     const isAdmin =
//         user?.organizationMemberships && user?.organizationMemberships.length > 0;

//     return (
//         <div className="h-screen w-screen">
//             {isAdmin 
//                 ? <AdminHomePage></AdminHomePage>
//                 : <HomePage></HomePage>
//             }
//         </div>
//     );
// }