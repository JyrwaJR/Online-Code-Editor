/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	deleteUser,
} from "firebase/auth";
import { auth, db } from "../FireBase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function SignIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password).then(
			(userCredential) => {
				if (userCredential.user) {
					const { uid, email, displayName, photoURL } = userCredential.user;
					const userRef = doc(db, "users", uid);
					const projectRef = doc(db, "Project File", uid);
					getDoc(userRef).then((doc) => {
						if (doc.exists()) {
							updateDoc(userRef, {
								LastLogin: new Date().toLocaleString(),
							});
							updateDoc(projectRef, {
								LastLogin: new Date().toLocaleString(),
							});
						} else {
							setDoc(userRef, {
								uid,
								email,
								displayName,
								photoURL,
								LastLogin: new Date().toLocaleString(),
								createdAt: new Date().toLocaleDateString(),
							});
							setDoc(projectRef, {
								AutoSave: null,
								LastLogin: new Date().toLocaleString(),
								createdAt: new Date().toLocaleDateString(),
							});
						}
					});
				}
			}
		);
	}

	function uploadCode(ProjectData, ProjectName) {
		const docRef = doc(db, "Project File", user.uid, "Projects", ProjectName);
		try {
			setDoc(docRef, {
				...ProjectData,
			});
			console.log("Document written");
		} catch (error) {
			console.log(error);
		}
	}
	function AutoUpdate(data) {
		return updateDoc(doc(db, "Project File", user.uid), {
			AutoSave: data,
		});
	}

	function deleteuser(uid) {
		deleteDoc(doc(db, "users", uid));
		deleteDoc(doc(db, "Project File", uid));
		return deleteUser(auth.currentUser);
	}
	function signUp(email, password, name) {
		return createUserWithEmailAndPassword(auth, email, password).then(
			(userCredential) => {
				if (userCredential.user) {
					const { uid, email } = userCredential.user;
					const userRef = doc(db, "users", uid);
					const projectRef = doc(db, "Project File", uid);
					try {
						setDoc(userRef, {
							uid,
							email,
							displayName: name,
							photoURL: "",
							LastLogin: new Date().toLocaleString(),
							createdAt: new Date().toLocaleDateString(),
						});
						setDoc(projectRef, {
							AutoSave: null,
							LastLogin: new Date().toLocaleString(),
							createdAt: new Date().toLocaleDateString(),
						});
					} catch (error) {
						console.log(error.message);
					}
				}
			}
		);
	}
	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider).then((userCredential) => {
			if (userCredential.user) {
				const { uid, email, displayName, photoURL } = userCredential.user;
				const userRef = doc(db, "users", uid);
				const projectRef = doc(db, "Project File", uid);
				getDoc(userRef).then((doc) => {
					if (doc.exists()) {
						updateDoc(userRef, {
							LastLogin: new Date().toLocaleString(),
						});
						updateDoc(projectRef, {
							LastLogin: new Date().toLocaleString(),
						});
					} else {
						setDoc(userRef, {
							uid,
							email,
							displayName,
							photoURL,
							LastLogin: new Date().toLocaleString(),
							createdAt: new Date().toLocaleDateString(),
						});
						setDoc(projectRef, {
							AutoSave: null,
							LastLogin: new Date().toLocaleString(),
							createdAt: new Date().toLocaleDateString(),
						});
					}
				});
			}
		});
	}

	// 			GETALLUSER();
	// 			// if (!isGetDBUser) {
	// 			// 	setDoc(doc(db, "users", userCredential.user.uid), {
	// 			// 		uid: userCredential.user.uid,
	// 			// 		email: userCredential.user.email,
	// 			// 		photoURL: userCredential.user.photoURL,
	// 			// 		displayName: userCredential.user.displayName,
	// 			// 		test: "test",
	// 			// 		LastLogin: new Date(),
	// 			// 	});
	// 			// 	setDoc(doc(db, "Project File", userCredential.user.uid), {
	// 			// 		AutoSave: null,
	// 			// 		LastLogin: new Date(),
	// 			// 	});
	// 			// 	console.log("new user created");
	// 			// } else {
	// 			// 	updateDoc(doc(db, "users", userCredential.user.uid), {
	// 			// 		LastLogin: new Date(),
	// 			// 	});
	// 			// }
	// 		}
	// 	});
	// }

	function logOut() {
		return auth.signOut(auth);
	}
	function forgetpassword(email) {
		console.log(email);
		return sendPasswordResetEmail(auth, email);
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider
			value={{
				user,
				SignIn,
				signUp,
				googleSignIn,
				logOut,
				forgetpassword,
				deleteuser,
				uploadCode,
				AutoUpdate,
			}}>
			{children}
		</userAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
