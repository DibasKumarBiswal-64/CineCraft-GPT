import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";


const Login = () => {

  const [isSignInForm, setIsSignForm] =useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();


  const name = useRef(null);
  const email =useRef(null);
  const password =useRef(null);

  const handleButttonClick = () => {
   

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignInForm) {
      // sign up logic
     createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL:USER_AVATAR
    }).then(() => {
      const {uid, email, displayName,photoURL} = auth.currentUser;
      dispatch(
        addUser({
          uid:uid,
           email: email,
           displayName:displayName,
           photoURL:photoURL
          })
          );
      
    }).catch((error) => {
      setErrorMessage(error.message);
    });
    

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });
    }else {
      // sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });
    }

  };

  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  };
  return (
    <div>
        <Header />
        <div className="absolute">
        <img src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg"
       alt="logo"
      />
        </div>
        <form 
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
          { !isSignInForm && <input 
              ref={name}
              type="text" 
              placeholder="Full Name" 
              className="p-2 my-2 w-full bg-gray-700 " 
          />}
          <input 
              ref={email}
              type="text" 
              placeholder="Email Address" 
              className="p-2 my-2 w-full bg-gray-700 "
          />
          <input 
              ref={password}
              type="password" 
              placeholder="Password" 
              className="p-2 my-2 w-full bg-gray-700 " 
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button className="p-2 my-4 bg-red-700 w-full rounded-lg" onClick={handleButttonClick}>
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm 
            ? "New to CineCraft? sign Up Now" 
            : "Already registered? Sign In Now."}
            </p>
        </form>
    </div>
  );
};

export default Login;

