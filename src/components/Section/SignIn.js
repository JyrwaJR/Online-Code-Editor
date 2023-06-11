/** @format */

import { Login } from "@mui/icons-material";
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
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";

function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { SignIn, googleSignIn, user } = useUserAuth();
	const navigate = useNavigate();
	const [isEmailError, setIsEmailError] = useState(false);
	const [isPasswordError, setIsPasswordError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsEmailError(false);
		setIsPasswordError(false);

		if (email === "" && password === "") {
			setIsEmailError(true);
			setIsPasswordError(true);
			return;
		}
		if (email === "") {
			setIsEmailError(true);
			return;
		}

		if (password.length < 8) {
			setIsPasswordError(true);
			return;
		}

		try {
			setError("");
			setIsPasswordError(false);
			setIsEmailError(false);
			setIsLoading(true);
			await SignIn(email, password);
			navigate("/profile");
		} catch (err) {
			setError("Failed to Login");
			setIsLoading(false);
		}
	};
	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate("/profile");
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(true);
	};

	if (user) {
		navigate("/dashboard");
	}
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
							<form noValidate onSubmit={handleSubmit}>
								<Typography
									variant="h3"
									fontWeight={"bold"}
									textAlign={"center"}
									textTransform={"uppercase"}>
									Sign In
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
										setEmail(e.target.value) || setIsEmailError(false)
									}
									helperText={isEmailError ? "Email is Required" : ""}
								/>
								<TextField
									label="Password"
									required
									error={isPasswordError}
									fullWidth
									variant="outlined"
									margin="normal"
									type={isShowPassword ? "text" : "password"}
									helperText={isPasswordError ? "Password is Required" : ""}
									onChange={(e) =>
										setPassword(e.target.value) || setIsPasswordError(false)
									}
								/>
								<FormGroup>
									<FormControlLabel
										control={<Checkbox />}
										label="Show Password"
										onChange={(e) => {
											if (!isShowPassword) {
												setIsShowPassword(true);
											} else {
												setIsShowPassword(false);
											}
										}}
									/>
								</FormGroup>
								<Box
									sx={{
										justifyContent: "center",
										display: "flex",
									}}>
									<Box>
										<Button
											type="submit"
											variant="contained"
											disabled={isLoading || email === "" || password === ""}
											sx={{
												marginLeft: "1rem",
												fontWaight: "bold",
											}}
											size="large">
											Login
										</Button>
									</Box>
									<Box component={"div"}>
										<Button
											href="/resetpassword"
											disabled={isLoading}
											sx={{
												marginLeft: "1rem",
												fontWaight: "bold",
											}}>
											Forget Password?
										</Button>
									</Box>
								</Box>
							</form>
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
