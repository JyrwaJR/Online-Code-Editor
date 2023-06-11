/** @format */

import { async } from "@firebase/util";
import {
	Button,
	CssBaseline,
	Grid,
	Paper,
	TextField,
	Typography,
	Link,
	Alert,
	Box,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";

function Signin() {
	//
	const [isEmail, setIsEmail] = useState("");
	const [error, setError] = useState("");
	const { forgetpassword, googleSignIn } = useUserAuth();
	const navigate = useNavigate();
	const [isEmailError, setIsEmailError] = useState(false);
	const [isSuccess, setIsSuccess] = useState("");
	const [isLoading, setIsLoading] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsEmailError(false);
		setIsSuccess("");

		if (isEmail === "") {
			return setIsEmailError(true);
		} else {
			try {
				setError("");
				setIsLoading(true);
				await forgetpassword(isEmail);
				setIsSuccess("Email was sent to your Email");
			} catch (err) {
				setError(err.message);
			}
		}
		setIsLoading(false);
	};
	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		try {
			await googleSignIn();
			setIsSuccess("Successfully Logged In");
			navigate("/Dashboard");
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(true);
	};

	//
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
					justifyContent="end"
					alignContent={"center"}
					sx={{
						height: "100%",
					}}>
					<Grid
						sm="5"
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Box
							sx={{
								width: "auto",
							}}>
							<Typography
								variant="h3"
								fontWeight={"bold"}
								textAlign={"center"}
								textTransform={"uppercase"}>
								Reset Password
							</Typography>
							<TextField
								label="Email"
								required
								error={isEmailError}
								fullWidth
								type={"email"}
								variant="outlined"
								margin="normal"
								onChange={(e) =>
									setIsEmail(e.target.value) || setIsEmailError(false)
								}
								helperText={isEmailError ? "Email is Required" : ""}
							/>
							{isSuccess && isSuccess ? (
								<Alert
									severity="success"
									sx={{
										marginTop: "10px",
									}}>
									{isSuccess}
								</Alert>
							) : (
								<Alert
									severity="error"
									sx={{
										marginTop: "10px",
									}}>
									{error}
								</Alert>
							)}

							<Box
								sx={{
									justifyContent: "center",
									display: "flex",
								}}>
								<Box>
									<Button
										onClick={handleSubmit}
										variant="outlined"
										sx={{
											marginLeft: "1rem",
											fontWaight: "bold",
										}}
										size="large">
										Sent Email
									</Button>
								</Box>
								<Box component={"div"}>
									<Button color="primary" href="/signin">
										Already have account?
									</Button>
								</Box>
							</Box>
						</Box>
					</Grid>
					<Grid
						xs="2"
						sx={{
							height: "100%",
						}}>
						<Box
							sx={{
								height: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
								or
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs="5"
						sx={{
							height: "100%",
						}}>
						<Box
							sx={{
								height: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Grid xs="auto">
								<Box component={"div"}>
									<GoogleButton onClick={handleGoogleSignIn} />
								</Box>
								<Box marginY={2}>
									<Typography align="center" gutterBottom variant="h6">
										Don't have an account?{" "}
										<Link href="/signup">Click Here</Link>
									</Typography>
								</Box>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default Signin;
