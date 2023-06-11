/** @format */

import { Person } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardMedia,
	CssBaseline,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import MonacoEditorImage from "../../Images/MonacoEditor.png";
const Contact = () => {
	return (
		<React.Fragment>
			<CssBaseline>
				<Container
					disableGutters
					maxWidth="xl"
					sx={{
						height: "100vh",
						border: "1px solid red",
					}}>
					<Grid
						container
						direction={"row"}
						justifyContent={"center"}
						sx={{
							alignContent: { md: "center" },
							height: "100%",
						}}>
						<Grid item md={6}>
							<Card
								sx={{
									maxHeight: "700px",
									width:"400px"
								}}>
								<CardMedia
									component={"img"}
									src={MonacoEditorImage}
									alt="pic"
									sx={{
										objectFit: "cover",
									}}
								/>
							</Card>
						</Grid>
						<Grid item md={6}></Grid>
					</Grid>
				</Container>
			</CssBaseline>
		</React.Fragment>
	);
};

export default Contact;
