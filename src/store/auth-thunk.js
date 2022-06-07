import { projectAuth, projectFirestore, projectStorage } from "../Firebase/config";
import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";

// Create an account
export const signup = (data) => {
   return async (dispatch) => {
      const requestSignup = async () => {
         dispatch(authActions.setAuthProgress(true));
         const response = await projectAuth.createUserWithEmailAndPassword(data.email, data.password);
         await projectFirestore.collection('users').doc(response.user.uid).set({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
         });
         await dispatch(userData(response.user.uid));

         if (!response) {
            throw new Error('Something went wrong!');
         }

         localStorage.setItem('isLoggedIn', true);
         dispatch(authActions.setAuthUser(JSON.stringify(response.user)));
         dispatch(authActions.setIsLoggedIn(true));
         dispatch(authActions.setAuthProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully logged in!' })));
      }

      try {
         await requestSignup();
      } catch (error) {
         const errorMessage = error.message.substring(error.message.indexOf(':') + 1, error.message.indexOf('('));

         if (errorMessage) {
            dispatch(authActions.setAuthError(errorMessage));
         } else {
            dispatch(authActions.setAuthError(error));
         }

         dispatch(authActions.setAuthErrorModal(true));
         dispatch(authActions.setAuthProgress(false));
      }
   }
}

// Sign In User
export const login = (email, password) => {
   return async (dispatch) => {
      const requestLogin = async () => {
         dispatch(authActions.setAuthProgress(true));
         const response = await projectAuth.signInWithEmailAndPassword(email, password);
         await dispatch(userData(response.user.uid));

         if (!response) {
            throw new Error('Something went wrong!');
         }

         localStorage.setItem('isLoggedIn', true);
         dispatch(authActions.setAuthUser(JSON.stringify(response.user)));
         dispatch(authActions.setIsLoggedIn(true));
         dispatch(authActions.setAuthProgress(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully logged in!' })));
      }

      try {
         await requestLogin();
      } catch (error) {
         const errorMessage = error.message.substring(error.message.indexOf(':') + 1, error.message.indexOf('('));
         dispatch(authActions.setAuthError(errorMessage));
         dispatch(authActions.setAuthErrorModal(true));
         dispatch(authActions.setAuthProgress(false));
      }
   }
}

// Logout User
export const logout = () => {
   return async (dispatch) => {
      const requestLogout = async () => {
         dispatch(authActions.setAuthProgress(true));
         await projectAuth.signOut();

         localStorage.removeItem('isLoggedIn');
         dispatch(authActions.setAuthUser(null));
         dispatch(authActions.setAuthProgress(false));
         dispatch(authActions.setIsLoggedIn(false));
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully logged out!' })));
      }

      try {
         await requestLogout();
      } catch (error) {
         const errorMessage = error.message.substring(error.message.indexOf(':') + 1, error.message.indexOf('('));
         dispatch(authActions.setAuthError(errorMessage));
         dispatch(authActions.setAuthErrorModal(true));
         dispatch(authActions.setAuthProgress(false));
      }
   }
}

// Get User Data
export const userData = (uid) => {
   return async (dispatch) => {
      const fetchUserData = async () => {
         await projectFirestore.collection('users').doc(uid).onSnapshot(doc => {
            dispatch(authActions.setUserData(doc.data()));
         });
      }

      try {
         await fetchUserData();
      } catch (error) {
         dispatch(authActions.setAuthError(error));
         dispatch(authActions.setAuthErrorModal(true));
      }
   }
}

// Update First & Last Name
export const updateName = (data, uid) => {
   return async (dispatch) => {
      const fetchUpdateName = async () => {
         await projectFirestore.collection('users').doc(uid).update({
            ...data
         });
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' })));
      }

      try {
         await fetchUpdateName();
      } catch (error) {
         dispatch(authActions.setAuthError(error));
         dispatch(authActions.setAuthErrorModal(true));
      }
   }
}

// Update email
export const updateEmail = (user, data, uid) => {
   return async (dispatch) => {
      const fetchUpdateEmail = async () => {
         await user.updateEmail(data.email);
         await projectFirestore.collection('users').doc(uid).update({
            ...data
         });
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' })));
      }

      try {
         await fetchUpdateEmail();
      } catch (error) {
         dispatch(authActions.setAuthError(error));
         dispatch(authActions.setAuthErrorModal(true));
      }
   }
}

// Update password
export const updatePassword = (user, data) => {
   return async (dispatch) => {
      const fetchUpdatePassword = async () => {
         await user.updatePassword(data.password);
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' })));
      }

      try {
         await fetchUpdatePassword();
      } catch (error) {
         dispatch(authActions.setAuthError(error));
         dispatch(authActions.setAuthErrorModal(true));
      }
   }
}

// Upload profile picture
export const uploadPicture = (user, image) => {
   return async (dispatch) => {
      const fetchUploadPicture = async () => {
         const path = `thumbnails/${user.uid}/${image.name}`;
         const pic = await projectStorage.ref().child(path).put(image);
         const url = await pic.ref.getDownloadURL();
         await projectFirestore.collection('users').doc(user.uid).update({
            img: url
         });
         dispatch(dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Uploaded!' })));
      }

      try {
         await fetchUploadPicture();
      } catch (error) {
         dispatch(authActions.setAuthError(error));
         dispatch(authActions.setAuthErrorModal(true));
      }
   }
}