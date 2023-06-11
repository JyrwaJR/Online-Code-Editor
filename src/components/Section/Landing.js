/** @format */

import { ArrowRight } from "@mui/icons-material";
import {
	Box,
	Button,
	CssBaseline,
	Grid,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import MonacoEditorImage from "../../Images/MonacoEditor.png";
import About from "./About";

const One = (
	<>
		<Typography align="start" variant="h5" color={"primary"} component={"h1"}>
			Hi
		</Typography>
	</>
);
const Two = (
	<>
		<Typography variant="h3" fontFamily={"inherit"} align="start">
			Welcome to
		</Typography>
	</>
);
const Three = (
	<>
		<Typography align="start" variant="h1">
			Code Editor
		</Typography>
	</>
);
const Four = (
	<>
		<Typography
			fontFamily={"inherit"}
			fontWeight="bold"
			align="start"
			gutterBottom
			variant="h3">
			For developers on the web.
		</Typography>
	</>
);
const Five = (
	<>
		<Typography gutterBottom paragraph>
			Many language has been add like{" "}
			<strong>JAVA, JAVASCRIPT, PYTHON, C++, C#, C</strong> etc.
		</Typography>
	</>
);
const Six = (
	<>
		<Box
			sx={{
				paddingTop: "1rem",
				marginBottom: 2,
			}}>
			<Tooltip title="open code editor" arrow placement="top">
				<Button variant="contained" href="/editor" size="large">
					<Typography
						variant="h4"
						paddingX="2rem"
						fontWeight={"bold"}
						fontFamily="sf mono"
						paddingY="1rem"
						align="center">
						Open Editor
					</Typography>
				</Button>
			</Tooltip>
		</Box>
	</>
);

const items = [One, Two, Three, Four, Five, Six];

function Landing() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				maxWidth="xl"
				sx={{
					height: "100vh",
				}}>
				<Grid
					container
					direction={"row"}
					justifyContent="center"
					alignContent={"center"}
					sx={{
						height: "100%",
						fontFamily: "Calibre",
					}}>
					<Grid item md={6}>
						{items &&
							items.map((item, i) => (
								<Grid key={i} xs={12}>
									<Box
										sx={{
											color: "black",
										}}>
										{item}
									</Box>
								</Grid>
							))}
					</Grid>
					<Grid item md={6}>
						<Card
							elevation={5}
							sx={{
								maxWidth: "100%",
							}}>
							<CardActionArea>
								<CardContent>
									<Typography
										variant="h5"
										align="center"
										fontWeight={"bold"}
										component="div">
										Monaco Editor
									</Typography>
								</CardContent>
								<CardMedia
									component="img"
									height="240"
									image={MonacoEditorImage}
									alt="monaco editor image"
									sx={{
										padding: "1rem",
									}}
								/>
								<CardContent>
									<Typography variant="body2">
										The Monaco Editor is the code editor that powers VS Code. It
										is licensed under the MIT License and supports Edge, Chrome,
										Firefox, Safari and Opera. The Monaco editor is not
										supported in mobile browsers or mobile web frameworks.
									</Typography>
									<Grid marginY={1} container direction="row" columnSpacing={1}>
										<Grid item>
											<Button
												href="https://github.in/jyrwajr"
												target={"__blank"}
												variant="contained"
												endIcon={<ArrowRight />}>
												Source
											</Button>
										</Grid>
										<Grid item>
											<Button
												target={"__blank"}
												href="https://microsoft.github.io/monaco-editor/"
												endIcon={<ArrowRight />}>
												Monaco Editor
											</Button>
										</Grid>
									</Grid>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
				<About />
			</Container>
		</React.Fragment>
	);
}

export default Landing;
