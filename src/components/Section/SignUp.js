/** @format */

import { CheckCircleOutline } from "@mui/icons-material";
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
import { useUserAuth } from "../../Context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Signin() {
	//
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { signUp } = useUserAuth();
	const [isSuccess, setIsSuccess] = useState("");
	const [isEmailError, setIsEmailError] = useState("");
	const [isPasswordError, setIsPasswordError] = useState("");
	const [name, setName] = useState("");
	const [isNameError, setIsNameError] = useState("");
	const [isShowPassword, setIsShowPassword] = useState(false);

	const navigate = useNavigate();
	const onKeyPressInput = (e) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsSuccess("");
		setIsEmailError("");
		setIsPasswordError("");
		if (email === "") {
			setIsEmailError("Email is required");
			return;
		}
		if (name === "") {
			setIsNameError("Name is required");
			return;
		}
		if (password === "" || confirmPassword === "") {
			setIsEmailError("Email is required");
			setIsPasswordError("Password is required");
			return;
		}
		if (password === "") {
			setIsPasswordError("Password is required");
			return;
		}
		if (password.length < 8) {
			setIsPasswordError("Password must be more than 8 charecter");
			return;
		}
		if (password !== confirmPassword) {
			setIsPasswordError("Passwords don't match");
			return;
		}
		try {
			setError("");
			setIsSuccess("");
			setIsPasswordError("");
			setIsEmailError("");
			setLoading(true);
			await signUp(email, password, name);
			navigate("/dashboard");
		} catch (err) {
			setError("Failed to create an account");
		}
		setLoading(false);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				maxWidth="xl"
				element="main"
				disableGutters
				sx={{
					height: "100vh",
				}}>
				<Grid
					zeroMinWidth
					container
					disableGutters
					direction="row"
					justifyContent="center"
					alignItems="center"
					sx={{
						height: "100%",
					}}>
					<Grid item paddingY={12} xs={12} sm={12} md={6} lg={6} xl={6}>
						<Paper elevation={16}>
							<Box padding="12px">
								<Box gutterBottom marginTop={2} paddingY="12px">
									<Typography
										align="center"
										gutterBottom
										variant="h3"
										sx={{
											textTransform: "uppercase",
											fontWeight: "bold",
											color: "black",
											fontSize: { xs: "1.5rem", md: "2rem" },
										}}>
										Register
									</Typography>
									<Typography
										align="center"
										gutterBottom
										variant="h6"
										sx={{
											fontWeight: "thin",
											color: "black",
										}}>
										Please Enter Your Email and Password
									</Typography>
									<Box marginX={3}>
										{error && (
											<Alert severity="error" sx={{ marginTop: "1rem" }}>
												{error}
											</Alert>
										)}
									</Box>
									<Box marginX={3}>
										{isSuccess && (
											<Alert
												icon={<CheckCircleOutline fontSize="inherit" />}
												severity="success">
												{isSuccess}
											</Alert>
										)}
									</Box>
								</Box>
								<Box>
									<form
										onSubmit={handleSubmit}
										noValidate
										onKeyPressInput={onKeyPressInput}>
										<Box
											sx={{
												margin: "1.5rem",
											}}>
											<Box>
												<TextField
													label="Email"
													required
													error={isEmailError}
													fullWidth
													variant="outlined"
													color="secondary"
													margin="normal"
													onChange={(e) => setEmail(e.target.value)}
													helperText={isEmailError ? "Email is Required" : ""}
												/>
											</Box>
											<Box
												sx={{
													marginRight: "2px",
													width: "100%",
												}}>
												<TextField
													fullWidth
													label="Full Name "
													required
													error={isNameError}
													variant="outlined"
													color="secondary"
													margin="normal"
													helperText={isNameError}
													onChange={(e) => setName(e.target.value)}
												/>
											</Box>
											<Box display={"flex"}>
												<Box
													sx={{
														marginRight: "2px",
														width: "100%",
													}}>
													<TextField
														fullWidth
														label="Password"
														required
														type={isShowPassword ? "text" : "password"}
														error={isPasswordError}
														variant="outlined"
														color="secondary"
														margin="normal"
														helperText={isPasswordError}
														onChange={(e) => setPassword(e.target.value)}
													/>
												</Box>

												<Box
													sx={{
														marginLeft: "2px",
														width: "100%",
													}}>
													<TextField
														fullWidth
														type={isShowPassword ? "text" : "password"}
														label="Confirm Password"
														required
														error={isPasswordError}
														variant="outlined"
														color="secondary"
														margin="normal"
														helperText={isPasswordError}
														onChange={(e) => setConfirmPassword(e.target.value)}
													/>
												</Box>
											</Box>
										</Box>

										<Box
											sx={{
												marginX: "1.5rem",
											}}>
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
										</Box>
										<Box
											sx={{
												justifyContent: "center",
												display: "flex",
												margin: "1.5rem",
											}}>
											<Box>
												<Button
													type="submit"
													variant="contained"
													disabled={isLoading}
													sx={{
														paddingX: "3rem",
														marginLeft: "1rem",
														fontWeight: "bolder",
													}}
													size="large">
													Submit
												</Button>
											</Box>
										</Box>
									</form>
								</Box>
								<Box marginY={2}>
									<Typography align="center" gutterBottom variant="h6">
										Already have an account?{" "}
										<Link href="/signin">Click Here</Link>
									</Typography>
								</Box>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default Signin;
