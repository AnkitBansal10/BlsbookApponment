
import { GoogleAuthProvider, getAuth, signInWithCredential, FacebookAuthProvider, } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { storeTokens, storeUser, verifyFirebaseToken } from './authService';



GoogleSignin.configure({
  forceCodeForRefreshToken: true,
  webClientId: '765256533393-0af07neh5vmp4tmq4kftpkoup3vsm2gf.apps.googleusercontent.com',
});

export async function onGoogleButtonPress(navigation) {
   navigation.navigate('BottomTab');
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  await GoogleSignin.signOut(); // to always show account chooser
  const signInResult = await GoogleSignin.signIn();
  console.log(signInResult)
  const idToken = signInResult.idToken || signInResult.data?.idToken;
  if (!idToken) throw new Error('No ID token found');
  console.log(idToken)
  const googleCredential = GoogleAuthProvider.credential(idToken);
  const firebaseUserCredential = await signInWithCredential(getAuth(), googleCredential);

  // ✅ Store token and user
  await storeTokens(idToken);
  await storeUser(firebaseUserCredential.user);
  return firebaseUserCredential;
}

export async function onFacebookButtonPress(navigation) {
     navigation.navigate('BottomTab');

  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  if (result.isCancelled) throw 'User cancelled the login process';
  console.log(result)
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) throw 'Something went wrong obtaining access token';
console.log(data)
  const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
  const firebaseUserCredential = await signInWithCredential(getAuth(), facebookCredential);
  // ✅ Store token and user
  await storeTokens(data.accessToken);
  await storeUser(firebaseUserCredential.user);
  return firebaseUserCredential;
}