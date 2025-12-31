import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../fireBase/FireBaseConfig";
import { toast } from "react-toastify";

export const authContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // update local user state immediately so consumers see the new user
        setUser(userCredential.user);
        toast.success("Registration successful");
        return userCredential;
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };
  const updateUserProfile = (name, imgUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgUrl,
    });
  };

  const handelLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login Successful");
      })
      .catch((error) => {
        toast.error("Invalid email or password");
        throw error;
      });
  };
  const handleLogout = () => {
    return signOut(auth)
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handelLoginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Login With Google Successful");
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };
  const authInfo = {
    handleRegister,
    handelLogin,
    handleLogout,
    handelLoginWithGoogle,
    updateUserProfile,
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <authContext.Provider value={authInfo}>{children}</authContext.Provider>
    </div>
  );
};
export default AuthProvider;
