import { async } from "@firebase/util";
import {
  signInWithGooglePopup,
  signInWithGitHub,
  signInWithFacebook,
  // createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const result = await signInWithGooglePopup();
    console.log("result:--", result);
    // const userDocRef = await createUserDocumentFromAuth(user);
  };

  const logGitHubUser = async () => {
    const result = await signInWithGitHub();
    console.log("result===", result);
  };

  const logFacebookUser = async () => {
    const result = await signInWithFacebook();
    console.log("result====", result);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={logGitHubUser}>Sign in with GitHub</button>
      <button onClick={logFacebookUser}>Sign in with Facebook</button>
    </div>
  );
};

export default SignIn;
