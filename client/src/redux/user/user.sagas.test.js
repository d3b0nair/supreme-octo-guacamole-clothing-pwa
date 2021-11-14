import { takeLatest, put, call } from "redux-saga/effects";

import { signOutSuccess, signOutFailure, signInFailure } from "./user.actions";

import {
  getCurrentUser,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";

import {
  getSnapshotFromUserAuth,
  signInWithGoogle,
  signInWithEmail,
  isUserAuthenticated,
  signOut,
  signUp,
  signInAfterSignUp,
  onGoogleSignInStart,
  onEmailSignInStart,
  onCheckUserSession,
  onSignOutStart,
  onSignUpStart,
  onSignUpSuccess,
} from "./user.sagas";

import UserActionTypes from "./user.types";

const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignOut = jest.fn();
jest.mock("firebase/auth", () => {
  const originalModule = jest.requireActual("firebase/auth");
  return {
    __esModule: true,
    ...originalModule,
    createUserWithEmailAndPassword: () => mockCreateUserWithEmailAndPassword(),
    signOut: () => mockSignOut(),
  };
});
describe("on signup success saga", () => {
  it("should trigger on SIGN_UP_SUCCESS", () => {
    const generator = onSignUpSuccess();
    const expected = generator.next().value;
    const recieved = takeLatest(
      UserActionTypes.SIGN_UP_SUCCESS,
      signInAfterSignUp
    );
    expect(expected).toEqual(recieved);
  });
});

describe("on signup start saga", () => {
  it("should trigger on SIGN_UP_START", () => {
    const generator = onSignUpStart();
    const expected = generator.next().value;
    const recieved = takeLatest(UserActionTypes.SIGN_UP_START, signUp);
    expect(expected).toEqual(recieved);
  });
});

describe("on signout start saga", () => {
  it("should trigger on SIGN_UP_START", () => {
    const generator = onSignOutStart();
    const expected = generator.next().value;
    const recieved = takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
    expect(expected).toEqual(recieved);
  });
});

describe("on check user session saga", () => {
  it("should trigger on CHECK_USER_SESSION", () => {
    const generator = onCheckUserSession();
    const expected = generator.next().value;
    const recieved = takeLatest(
      UserActionTypes.CHECK_USER_SESSION,
      isUserAuthenticated
    );
    expect(expected).toEqual(recieved);
  });
});

describe("on email sign in start saga", () => {
  it("should trigger on EMAIL_SIGN_IN_START", () => {
    const generator = onEmailSignInStart();
    const expected = generator.next().value;
    const recieved = takeLatest(
      UserActionTypes.EMAIL_SIGN_IN_START,
      signInWithEmail
    );
    expect(expected).toEqual(recieved);
  });
});

describe("on google sign in start saga", () => {
  it("should trigger on GOOGLE_SIGN_IN_START", () => {
    const generator = onGoogleSignInStart();
    const expected = generator.next().value;
    const recieved = takeLatest(
      UserActionTypes.GOOGLE_SIGN_IN_START,
      signInWithGoogle
    );
    expect(expected).toEqual(recieved);
  });
});

describe("on sign in after sign up saga", () => {
  it("should fire getSnapshotFromUserAuth", () => {
    const mockUser = {};
    const mockAdditionalData = {};
    const mockAction = {
      payload: {
        user: mockUser,
        additionalData: mockAdditionalData,
      },
    };

    const generator = signInAfterSignUp(mockAction);
    const expected = generator.next(mockAction).value;
    const received = getSnapshotFromUserAuth(mockUser, mockAdditionalData);
    expect(JSON.stringify(expected)).toEqual(JSON.stringify(received));
  });
});

describe("on sign up saga", () => {
  const mockEmail = "cindy@gmail.com";
  const mockPassword = "test123";
  const mockDisplayName = "cindy";

  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName,
    },
  };

  const generator = signUp(mockAction);

  it("should call createUserWithEmailAndPassword", () => {
    generator.next();
    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe("on sign out saga", () => {
  const generator = signOut();

  it("should call auth.signOut", () => {
    generator.next();
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("should call signOutSuccess", () => {
    const expected = generator.next().value;
    const recieved = put(signOutSuccess());
    expect(expected).toEqual(recieved);
  });

  it("should call signOutFailure on error", () => {
    const newGenerator = signOut();
    newGenerator.next();
    const expected = newGenerator.throw("error").value;
    const recieved = put(signOutFailure("error"));
    expect(expected).toEqual(recieved);
  });
});

describe("isUserAuthenticated saga", () => {
  const generator = isUserAuthenticated();

  it("should call getCurrentUser", () => {
    const expected = JSON.stringify(generator.next().value);
    const recieved = JSON.stringify(getCurrentUser());
    expect(expected).toEqual(recieved);
  });

  it("should call getSnapshotFromUserAuth if userAuth exists", () => {
    const mockUserAuth = { id: "123da" };
    const expected = JSON.stringify(generator.next(mockUserAuth).value);
    const recieved = JSON.stringify(getSnapshotFromUserAuth(mockUserAuth));
    expect(expected).toEqual(recieved);
  });

  it("should call signInFailure on error", () => {
    const newGenerator = isUserAuthenticated();
    newGenerator.next();
    const expected = newGenerator.throw("error").value;
    const recieved = put(signInFailure("error"));
    expect(expected).toEqual(recieved);
  });
});

describe("get snapshot from userAuth", () => {
  const mockUserAuth = {};
  const mockAdditionalData = {};
  const generator = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);
  const expected = JSON.stringify(generator.next().value);
  const recieved = JSON.stringify(
    call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
  );
  expect(expected).toEqual(recieved);
});
