import { EmailAuthProvider, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, reauthenticateWithCredential, setPersistence, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { auth, db, storage } from "../Firebase/config";
import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ErrorMessages from "../Firebase/ErrorMessages";

// Create an account
export const signup = ({ name, email, password }) => {
   return async (dispatch) => {
      const requestSignup = async () => {
         dispatch(authActions.setAuthProgress(true));

         // Set Persistence
         await setPersistence(auth, browserLocalPersistence);

         // Create an account
         const response = await createUserWithEmailAndPassword(auth, email, password);

         // Store data on firestore database
         await setDoc(doc(db, 'users', response.user.uid), {
            name: name,
            email: email,
            id: response.user.uid
         });

         // Get user data from firebase
         const docRef = doc(db, 'users', response.user.uid);
         const docSnap = await getDoc(docRef);

         // Update user data on client
         dispatch(authActions.setUserData(docSnap.data()));

         dispatch(authActions.setAuthProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully logged in!' })));
      }

      try {
         await requestSignup();
      } catch (error) {
         dispatch(authActions.setAuthProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};

// Sign In User
export const login = (email, password, remembered) => {
   return async (dispatch) => {
      const requestLogin = async () => {
         dispatch(authActions.setAuthProgress(true));

         // Set Persistence
         if (remembered) {
            await setPersistence(auth, browserLocalPersistence);
         } else {
            await setPersistence(auth, browserSessionPersistence);
         }

         // Sign in
         const response = await signInWithEmailAndPassword(auth, email, password);

         // Get the user data
         await dispatch(userData(response.user.uid));

         dispatch(authActions.setAuthProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully logged in!' })));
      }

      try {
         await requestLogin();
      } catch (error) {
         dispatch(authActions.setAuthProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};

// Logout User
export const logout = () => {
   return async (dispatch) => {
      const requestLogout = async () => {
         dispatch(authActions.setAuthProgress(true));

         // Signing out the user
         await signOut(auth);

         // Set the user data to null
         dispatch(authActions.setUserData(null));

         dispatch(authActions.setAuthProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully logged out!' })));
      }

      try {
         await requestLogout();
      } catch (error) {
         dispatch(authActions.setAuthProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};

// Get User Data
export const userData = (uid) => {
   return async (dispatch) => {
      const fetchUserData = async () => {
         dispatch(authActions.setUserDataProgress(true));

         // Get a ref
         const docRef = doc(db, 'users', uid);

         // Get user data
         const docSnap = await getDoc(docRef);

         if (docSnap.data()) {
            dispatch(authActions.setUserData(docSnap.data()));
         }

         dispatch(authActions.setUserDataProgress(false));
      }

      try {
         await fetchUserData();
      } catch (error) {
         dispatch(authActions.setUserDataProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};

// Update First & Last Name
export const updateUserName = ({ name }, userID) => {
   return async (dispatch) => {
      const fetchUpdateName = async () => {
         dispatch(authActions.setUpdateProgress(true));

         // Update user data on firebase
         const docRef = doc(db, 'users', userID);
         await updateDoc(docRef, { name: name });

         // Get user data from firebase
         const docSnap = await getDoc(docRef);

         // Update user data on client
         dispatch(authActions.setUserData(docSnap.data()));

         dispatch(authActions.setUpdateProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' })));
      }

      try {
         await fetchUpdateName();
      } catch (error) {
         dispatch(authActions.setUpdateProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};

// Update email
export const updateUserEmail = ({ email, password, newEmail }, userID) => {
   return async (dispatch) => {
      const fetchUpdateEmail = async () => {
         dispatch(authActions.setUpdateProgress(true));

         // Get the current user
         const currentUser = auth.currentUser;

         // Create credential
         const credential = EmailAuthProvider.credential(email, password);

         // Re-authenticate before updating the email
         await reauthenticateWithCredential(currentUser, credential);

         // Update the email
         await updateEmail(currentUser, newEmail);

         // Update firestore data
         const docRef = doc(db, 'users', userID);
         await updateDoc(docRef, { email: newEmail });

         // Get user data from firebase
         const docSnap = await getDoc(docRef);

         // Update user data on client
         dispatch(authActions.setUserData(docSnap.data()));

         dispatch(authActions.setUpdateProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' })));
      }

      try {
         await fetchUpdateEmail();
      } catch (error) {
         dispatch(authActions.setUpdateProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};

// Update password
export const updateUserPassword = ({ email, password, newPassword }) => {
   return async (dispatch) => {
      const fetchUpdatePassword = async () => {
         dispatch(authActions.setUpdateProgress(true));

         // Create credential
         const credential = EmailAuthProvider.credential(email, password);

         // Re-authenticate before updating the password
         await reauthenticateWithCredential(auth.currentUser, credential);

         // Update the password
         await updatePassword(auth.currentUser, newPassword);

         dispatch(authActions.setUpdateProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' })));
      }

      try {
         await fetchUpdatePassword();
      } catch (error) {
         dispatch(authActions.setUpdateProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};

// Upload profile picture
export const uploadPicture = (userID, data) => {
   return async (dispatch) => {
      const fetchUploadPicture = async () => {
         dispatch(authActions.setUploadPicProgress(true));

         // Create a path
         const path = `thumbnails/${userID}/${data.image[0].name}`;

         // Get a reference
         const picRef = ref(storage, path);

         // Upload the file
         const uploadTask = await uploadBytesResumable(picRef, data.image[0]);

         // Get the url
         const url = await getDownloadURL(uploadTask.ref);

         // Update firestore data
         const docRef = doc(db, 'users', userID);
         await updateDoc(docRef, { img: url });

         // Get user data from firebase
         const docSnap = await getDoc(docRef);

         // Update user data on client
         dispatch(authActions.setUserData(docSnap.data()));

         dispatch(authActions.setUploadPicProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Uploaded!' })));
      }

      try {
         await fetchUploadPicture();
      } catch (error) {
         dispatch(authActions.setUploadPicProgress(false));

         const errorMessage = ErrorMessages.find(item => item.code === error.code);

         let message;
         if (errorMessage) {
            message = errorMessage.message;
         } else {
            message = error.message;
         }

         dispatch(uiActions.setErrorModal(true));
         dispatch(uiActions.setErrorModalText(message));
      }
   }
};