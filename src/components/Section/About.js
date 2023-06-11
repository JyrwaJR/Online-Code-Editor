/** @format */

import { ArrowRight } from "@mui/icons-material";
import {
	CssBaseline,
	Container,
	Grid,
	Typography,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";
const ListItem = [
	{
		name: "React JS",
		version: "16.00",
		use: "React was use to build all the front end ui of CODE EDITOR.",
		icon: <ArrowRight />,
		path: "https://reactjs.org/",
	},
	{
		name: "Firebase",
		version: "11.1.1",
		use: "Authentication For Register and Login was use and Fire-Store Database.",
		icon: <ArrowRight />,
		path: "https://firebase.google.com/",
	},
	{
		name: "VS Code",
		version: "1.72",
		use: "Tool use For developing the code editor.",
		icon: <ArrowRight />,
		path: "https://code.visualstudio.com",
	},
	{
		name: "Node Js",
		version: "16.18",
		use: "Tool use to handle all the library within reactjs and also running it.",
		icon: <ArrowRight />,
		path: "https://nodejs.org/en/",
	},
];
const Flow = [
	{
		name: "user land on the landing page.",
		use: "they can choose to login or directly use the CODE-EDITOR without cloud support.",
	},
	{
		name: "on the code editor.",
		use: "they can change the language of the code to their desire language they want.",
	},
	{
		name: "on clicking export on the Editor Page (Without Cloud Support).",
		use: "it can export to any file they want.",
	},
	{
		name: "With cloud support.",
		use: "user can upload save their code online and also come back to re-write their code again without losing any of the code.",
	},
];
const About = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xl">
				<Typography
					marginY={2}
					align="justify"
					variant="h3"
					color={"primary"}
					fontWeight="bold"
					gutterBottom>
					What is Code Editor?
				</Typography>
				<Divider />
				<Grid container marginY={4}>
					<Grid item>
						<Typography variant="h6" marginLeft={5}>
							Code Editor is an online code editor which you can run and compile
							code link java python and also other language. It was build using
							react and firebase.Code Editor was develop as a Mini Project for
							the 5th semester of MCA 2022.
						</Typography>
					</Grid>
				</Grid>
				<Divider />
				<Typography
					marginY={2}
					variant="h4"
					color={"primary"}
					gutterBottom
					fontWeight={"bold"}>
					Tool Use{" "}
				</Typography>
				<Grid container>
					<Grid item>
						<List>
							{ListItem &&
								ListItem.map(({ name, icon, use, path, version }, i) => (
									<ListItemButton href={path} key={i} target="__blank">
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText
											primary={name}
											secondary={
												<React.Fragment>
													<Typography variant="body1">{version}</Typography>
													<Typography variant="body2">{use}</Typography>
												</React.Fragment>
											}
										/>
									</ListItemButton>
								))}
						</List>
					</Grid>
				</Grid>
				<Divider />
				<Typography
					marginY={2}
					variant="h4"
					color={"primary"}
					gutterBottom
					fontWeight={"bold"}>
					Flow of the Application
				</Typography>
				<Grid container>
					<Grid item>
						<List>
							{Flow &&
								Flow.map(({ name, use }, i) => (
									<ListItemButton key={i}>
										<ListItemIcon>{i + 1}</ListItemIcon>
										<ListItemText
											primary={
												<>
													<Typography textTransform={"capitalize"}>
														{name}
													</Typography>
												</>
											}
											secondary={use}
										/>
									</ListItemButton>
								))}
						</List>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default About;
