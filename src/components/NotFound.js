/** @format */
import { Home, Javascript } from "@mui/icons-material";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CssBaseline,
	Grid,
	Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import MonacoEditorImage from "../Images/MonacoEditor.png";
const NotFound = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				fixed
				sx={{
					height: "100vh",
				}}>
				<Grid
					container
					direction={"row"}
					justifyContent={"center"}
					alignContent={"center"}
					sx={{
						height: "100%",
					}}>
					<Grid item xs={12}>
						<Typography align="center" variant="h1" color={"error"}>
							404
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography align="center" variant="h1" color={"error"}>
							Page Not Found
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
							}}>
							<Card
								elevation={5}
								sx={{
									width: { md: "60%" },
								}}>
								<CardActionArea>
									<CardMedia
										component="img"
										width={"500px"}
										image={MonacoEditorImage}
										alt="monaco editor image"
										sx={{
											padding: "1rem",
										}}
									/>
									<CardContent>
										<Typography variant="body2" gutterBottom>
											The Monaco Editor is the code editor that powers VS Code.
											It is licensed under the MIT License and supports Edge,
											Chrome, Firefox, Safari and Opera. The Monaco editor is
											not supported in mobile browsers or mobile web frameworks.
										</Typography>
										<Grid container direction={"row"} columnSpacing={1}>
											<Grid item>
												<Button
													href="/"
													variant="outlined"
													startIcon={<Home />}>
													Home
												</Button>
											</Grid>
											<Grid item>
												<Button
													href="/editor"
													variant="contained"
													startIcon={<Javascript />}>
													Code Editor
												</Button>
											</Grid>
										</Grid>
									</CardContent>
								</CardActionArea>
							</Card>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default NotFound;
