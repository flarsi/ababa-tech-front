import { useRef } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Auth.module.css";
import { logInAsync, SignUpAsync } from "./authSlice";
import { LogIn } from "./components/form/LogIn";
import { SignUp } from "./components/form/SignUp";
import TabBar from "./components/TabBar";
import { logInPayload, signUpPayload } from "./types";

type AuthProps = {
  onClose: () => void;
};

function Auth({ onClose }: AuthProps): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user)
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  useEffect(() => {
    if(user)
    onClose()
  }, [user, onClose])

  const handleLogIn = (user: logInPayload) => {
    dispatch(logInAsync(user));
  };

  const handleSignUp = (user: signUpPayload) => {
    dispatch(
      SignUpAsync(user)
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={ref}>
        <TabBar
          tabs={[
            { content: <LogIn onSubmit={handleLogIn} />, label: "Log In" },
            { content: <SignUp onSubmit={handleSignUp} />, label: "Sign Up" },
          ]}
        />
        <div className={styles.closeBtn} onClick={onClose}>
          close
        </div>
      </div>
    </div>
  );
}

export default Auth;
