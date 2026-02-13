import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          navigate("/auth", { replace: true });
        } else {
          setAuthenticated(true);
        }
        setChecked(true);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth", { replace: true });
      } else {
        setAuthenticated(true);
      }
      setChecked(true);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!checked || !authenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
