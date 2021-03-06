import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as UserSignOut,
  getAuth,
} from "firebase/auth";
import {
  signInWithGooglePopup,
  createUserProfileDocument,
  getCurrentUser,
  auth,
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  const userSnapshot = yield call(
    createUserProfileDocument,
    userAuth,
    additionalData
  );
  yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithGooglePopup();
    yield getSnapshotFromUserAuth({ userAuth: user });
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const newAuth = getAuth();
    const { user } = yield signInWithEmailAndPassword(newAuth, email, password);
    yield getSnapshotFromUserAuth({ userAuth: user });
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth({ userAuth });
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield UserSignOut(auth);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield put(
      signUpSuccess({
        userAuth: { ...user, displayName: displayName },
      })
    );
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: user, additionalData }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
