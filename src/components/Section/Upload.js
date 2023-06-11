/** @format */

import { Person } from "@mui/icons-material";
import {
	CssBaseline,
	Container,
	Grid,
	Paper,
	Typography,
	Divider,
	TextField,
	Box,
	Button,
} from "@mui/material";
import React from "react";

const Upload = () => {
	return (
		<React.Fragment>
			<CssBaseline>
				<Container
					maxWidth="xl"
					sx={{
						height: "91vh",
					}}>
					<Typography
						marginY={2}
						variant="h4"
						fontWeight="bold"
						color="primary">
						Upload Now
					</Typography>
					<Divider />
					<Grid
						container
						direction={"row"}
						justifyContent="center"
						alignContent={"center"}
						height="100%">
						<Grid
							item
							sx={{
								width: "100%",
								maxWidth: "600px",
							}}>
							<Paper
								elevation={5}
								sx={{
									padding: "1rem",
								}}>
								<Typography align="center" color={"primary"}>
									<Typography variant="h4" color={"primary"} fontWeight="bold">
										Upload Code
									</Typography>
									<Person
										sx={{
											color: "inherit",
											fontSize: "5rem",
										}}
									/>
								</Typography>

								<form noValidate autoComplete="false">
									<TextField
										fullWidth
										label="Email"
										variant="outlined"
										placeholder="Enter your Email"
										color="primary"
										margin="normal"
										helperText="Field is required"
									/>
									<TextField
										multiline
										rows={6}
										fullWidth
										label="Describe"
										variant="outlined"
										color="primary"
										margin="normal"
										helperText="Field is required"
									/>
									<Box display={"flex"} justifyContent="center">
										<Button variant="contained" size="large">
											Submit
										</Button>
									</Box>
								</form>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</CssBaseline>
		</React.Fragment>
	);
};

export default Upload;
