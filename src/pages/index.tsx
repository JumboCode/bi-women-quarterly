import { useEffect } from "react";

export default function HomePage() {
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