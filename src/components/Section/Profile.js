/** @format */

import { Delete, Favorite } from "@mui/icons-material";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	CssBaseline,
	Grid,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";

import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../FireBase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";

const Profile = () => {
	const { user, deleteuser } = useUserAuth();
	const [isFav, setIsFav] = useState("false");
	const [isBio, setIsBio] = useState("");
	const [newBio, setNewBio] = useState("");

	const getUserData = async () => {
		try {
			const docRef = doc(db, "users", user.uid);

			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// console.log("Document data:", docSnap.data());
				setIsBio(docSnap.data().Bio);
			} else {
				// doc.data() will be undefined in this case
				console.log(doc.data());
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getUserData();
	}, [user.uid]);

	const HandleUpdateBio = async (e) => {
		try {
			updateDoc(doc(db, "users", user.uid), {
				Bio: newBio,
			}).then(() => {
				setIsBio(newBio);
				setNewBio("");
			});
		} catch (error) {
			alert(error);
		}
	};
	const HandleDelete = async () => {
		const userRef = doc(db, "users", user.uid);
		const uid = user.uid;
		if (window.confirm("Are you sure to delete your account?")) {
			try {
				const docSnap = await getDoc(userRef);
				if (docSnap.exists()) {
					try {
						await deleteuser(uid);
						alert("Account Deleted");
					} catch (error) {
						alert(error.message);
					}
				} else {
					alert("Account not found");
				}
			} catch (error) {
				alert(error.message);
			}
		}
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				disableGutters
				maxWidth="xl"
				sx={{
					height: "100vh",
				}}>
				<Grid
					container
					direction={"row"}
					alignContent="center"
					justifyContent={"center"}
					sx={{
						height: "100%",
					}}>
					<Card
						elevation={5}
						sx={{
							maxWidth: "30%",
							padding: "1rem",
						}}>
						<CardHeader
							sx={{
								textTransform: "capitalize",
								fontWeight: "bold",
							}}
							title={user.displayName}
							subheader={"ID: " + user.uid}
						/>
						<CardMedia component="img" src={user.photoURL} alt="Profile pic" />
						<CardContent>
							{isBio?.length > 0 ? (
								<Typography variant="body1">{isBio}</Typography>
							) : (
								<>
									<Grid container direction={"column"} rowSpacing={1}>
										<Grid item>
											<TextField
												onChange={(e) => setNewBio(e.target.value)}
												label="Enter Your Bio"
												fullWidth
												required
											/>
										</Grid>
										<Grid item>
											<Button
												variant="outlined"
												onClick={HandleUpdateBio}
												size="small">
												Save
											</Button>
										</Grid>
									</Grid>
								</>
							)}
						</CardContent>
						<CardActions disableSpacing>
							<IconButton
								aria-label="add to favorites"
								onClick={() => {
									if (isFav) {
										setIsFav(false);
									} else {
										setIsFav(true);
									}
								}}>
								<Favorite color={isFav ? "error" : ""} />
							</IconButton>
							<IconButton onClick={HandleDelete} aria-label="share">
								<Delete />
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Profile;
