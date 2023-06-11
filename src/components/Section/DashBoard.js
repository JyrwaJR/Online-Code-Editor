/** @format */

import Editor from "@monaco-editor/react";
import { CodeSharp } from "@mui/icons-material";
import { Button, Tabs, Tab, Typography, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { auth, db } from "../../FireBase";

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function TabPanel(props) {
	const { children, Name, value, Code, Language, index, ...other } = props;
	const DeleteProject = async () => {
		const DeleteProjectRef = doc(
			db,
			"Project File",
			auth.currentUser.uid,
			"Projects",
			Name
		);

		if (window.confirm("Are you sure to delete this project?")) {
			try {
				const docSnap = await getDoc(DeleteProjectRef);
				if (docSnap.exists()) {
					await deleteDoc(DeleteProjectRef);
					alert(Name + " Deleted");
					window.location.reload();
				} else {
					alert("Project not found");
				}
			} catch (error) {
				alert(error.message);
			}
		}
	};
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
			sx={{
				width: "100%",
				border: "1px solid #000000",
			}}>
			{value === index && (
				<Grid direction={"row"} container>
					<Box sx={{ p: 3 }}>
						<Typography textTransform={"uppercase"} variant="h4">
							Project Name: <strong>{children}</strong>
						</Typography>
						<Editor height={"70vh"} value={Code} width="100vh" />
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							p: 3,
						}}>
						<Grid container direction="column" spacing={1}>
							<Grid item>
								<Button
									onClick={DeleteProject}
									variant="outlined"
									color="error"
									startIcon={<CodeSharp />}>
									Delete
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			)}
		</div>
	);
}

const DashBoard = () => {
	const [value, setValue] = useState(0);
	const { user } = useUserAuth();
	const [isProjectName, setIsProjectName] = useState([]);
	const [isAutoSave, setIsAutoSave] = useState([]);
	useEffect(() => {
		const GetProject = async () => {
			const GetProjectRef = collection(
				db,
				"Project File",
				auth.currentUser.uid,
				"Projects"
			);
			const GetAutoSaveRef = doc(db, "Project File", user.uid);
			const GetAutoSaveSnap = await getDoc(GetAutoSaveRef);
			if (GetAutoSaveSnap.exists()) {
				setIsAutoSave(GetAutoSaveSnap.data().AutoSave);
			} else {
				setIsAutoSave(false);
			}
			const docSnap = await getDocs(GetProjectRef);
			setIsProjectName(
				docSnap.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
					Code: doc.data().Code,
					Upload: doc.data().UploadDate,
					Name: doc.data().ProjectName,
					Discription: doc.data().ProjectDiscription,
					language: doc.data().LanguageName,
				}))
			);
		};
		GetProject();
	}, [user.uid]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container
			maxWidth={"xl"}
			disableGutters
			sx={{
				height: "100vh",
			}}>
			<Grid xs={12}>
				<Typography
					fontWeight={"bold"}
					textAlign={"center"}
					variant="h3"
					textTransform={"uppercase"}>
					Projects
				</Typography>
			</Grid>
			<Grid xs={12} container justifyContent={"center"}>
				<Grid item>
					{isProjectName.length > 0 ? (
						<Tabs
							orientation="horizontal"
							variant="scrollable"
							value={value}
							onChange={handleChange}
							aria-label="Vertical tabs example"
							sx={{}}>
							{isProjectName.map((item, index) => (
								<Tab label={item.Name} {...a11yProps(index)} key={index} />
							))}
						</Tabs>
					) : (
						<Typography>Project Not Found</Typography>
					)}
				</Grid>
			</Grid>
			<Grid container justifyContent={"center"}>
				<Box
					sx={{
						height: "60vh",
					}}>
					{isProjectName.length > 0 ? (
						isProjectName.map((item, index) => (
							<TabPanel
								value={value}
								index={index}
								Code={item.Code}
								language={item.LanguageName}
								Name={item.id}
								key={index}>
								{item.Name}
							</TabPanel>
						))
					) : (
						<Grid
							direction={"row"}
							container
							justifyContent={"center"}
							alignItems={"center"}
							sx={{
								height: "100%",
							}}>
							<Grid item>
								<Typography
									textAlign={"center"}
									variant="h2"
									component="div"
									fontWeight={"bold"}
									gutterBottom>
									Sorry
								</Typography>
								<Typography
									textAlign={"center"}
									variant="h4"
									component="div"
									fontWeight={"bold"}
									color="error.main"
									gutterBottom>
									No Project Found
								</Typography>
							</Grid>
						</Grid>
					)}
				</Box>
			</Grid>
		</Container>
	);
};
export default DashBoard;
