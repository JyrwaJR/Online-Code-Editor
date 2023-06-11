/** @format */

import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Alert,
	AppBar,
	Button,
	Container,
	CssBaseline,
	Divider,
	Grid,
	Modal,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { useUserAuth } from "../Context/UserAuthContext";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";
import { Box } from "@mui/system";
import {
	Download,
	GetApp,
	ImportExport,
	PictureAsPdf,
	Upload,
} from "@mui/icons-material";
import { db } from "../FireBase";
import { doc, getDoc } from "firebase/firestore";
import {
	CppSnipCode,
	CSharpSnipCode,
	CSnipCode,
	GoSnipCode,
	JavaSnipCode,
	JSSnipcode,
	PythonSnipCode,
	SwiftSnipCode,
	RubySnipCode,
	AssemblySnipCode,
	PHPsnipCode,
	RustSnipCode,
	KotlinSnipCode,
	RSnipCode,
	HaskellSnipCode,
	ScalaSnipCode,
	PerlSnipCode,
	LuaSnipCode,
	DartSnipCode,
	fsharpSnipCode,
	ElixirSnipCode,
	ClojureSnipCode,
	BashSnipCode,
	BasicSnipCode,
	CobolSnipCode,
	CommonLispSnipCode,
} from "../Snippet/CodeSnippetOnly.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { async } from "@firebase/util";

const Landing = () => {
	const [code, setCode] = useState("");
	const [customInput, setCustomInput] = useState("");
	const [outputDetails, setOutputDetails] = useState(null);
	const [processing, setProcessing] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isProjectName, setIsProjectName] = useState("");
	const [isProjectDiscription, setIsProjectDiscription] = useState("");
	const [language, setLanguage] = useState(languageOptions[0]);
	const { user, AutoUpdate, uploadCode } = useUserAuth();
	const enterPress = useKeyPress("Enter");
	const shiftPress = useKeyPress("Shift");
	const sPress = useKeyPress("S");

	const ctrlPress = useKeyPress("Control");
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const onSelectChange = (sl) => {
		console.log("selected Option:", sl);
		setLanguage(sl);
	};

	useEffect(() => {
		if (enterPress && ctrlPress) {
			HandleCompile();
		}
	}, [ctrlPress, enterPress]);

	useEffect(() => {
		if (shiftPress && sPress) {
			ExportPDF();
		}
	}, [shiftPress, sPress]);

	const onChange = (action, data) => {
		switch (action) {
			case "code": {
				setCode(data);
				break;
			}
			default: {
				console.warn("case not handled!", action, data);
			}
		}
	};

	const upload = async (e) => {
		e.preventDefault();
		const ProjectName = isProjectName;
		const ProjectData = {
			ProjectName: isProjectName,
			Code: code,
			LanguageID: language.id,
			LanguageName: language.name,
			UserId: user.uid,
			UploadDate: new Date(),
			ProjectDiscription: isProjectDiscription,
		};

		if (isProjectName === "" || isProjectDiscription === "") {
			setIsError(true);
		}
		if (isProjectName === "") {
			showErrorToast("Please Enter Project Name");
			setIsError(true);
			return;
		}
		if (isProjectDiscription === "") {
			setIsError(true);
			showErrorToast("Please Enter Project Discription");
			return;
		}

		try {
			const docRef = doc(db, "user", user.uid, "Projects", isProjectName);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				showErrorToast("Project Name Already Exists");
			} else {
				try {
					uploadCode(ProjectData, ProjectName);
					setOpen(false);
					showSuccessToast("Project Uploaded Successfully");
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const AutoSave = async () => {
		if (user) {
			try {
				const data = {
					Code: code,
					ProjectName: "AutoSave",
					LanguageID: language.id,
					LanguageValue: language.value,
					languageLabel: language.label,
				};
				await AutoUpdate(data);
				toast.success("Auto Saved Successfully", {
					position: "top-left",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} catch (error) {
				toast.error("Auto Save Failed", {
					position: "top-left",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		}
	};

	const HandleCompile = () => {
		setProcessing(true);
		const formData = {
			language_id: language.id,
			// encode source code in base64
			source_code: btoa(code),
			stdin: btoa(customInput),
		};
		const options = {
			method: "POST",
			url: process.env.REACT_APP_RAPID_API_URL,
			params: { base64_encoded: "true", fields: "*" },
			headers: {
				"content-type": "application/json",
				"Content-Type": "application/json",
				"X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
				"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
			},
			data: formData,
		};
		axios
			.request(options)

			.then(function (response) {
				const token = response.data.token;
				checkStatus(token);
			})

			.catch((err) => {
				let error = err.response ? err.response.data : err;
				// get error status
				let status = err.response.status;
				console.log("status", status);
				if (status === 429) {
					console.log("too many requests", status);
					showErrorToast(`Quota of 100 requests exceeded for the Day!`, 10000);
				} else if (status === 0) {
					showErrorToast(`Please check your internet Connection`, 2000);
				}

				setProcessing(false);
				console.log("catch block...", error);
			});
		AutoSave();
	};

	const checkStatus = async (token) => {
		const options = {
			method: "GET",
			url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
			params: { base64_encoded: "true", fields: "*" },
			headers: {
				"X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
				"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
			},
		};

		try {
			let response = await axios.request(options);
			let statusId = response.data.status?.id;

			// Processed - we have a result
			if (statusId === 1 || statusId === 2) {
				// still processing
				setTimeout(() => {
					checkStatus(token);
				}, 2000);
				return;
			} else {
				setProcessing(false);
				setOutputDetails(response.data);
				showSuccessToast(`Compiled Successfully!`);
				console.log("response.data", response.data);
				return;
			}
		} catch (err) {
			console.log("err", err);
			setProcessing(false);
			showErrorToast();
		}
	};

	const showSuccessToast = (msg) => {
		toast.success(msg || `Compiled Successfully!`, {
			position: "top-left",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const showErrorToast = (msg, timer) => {
		toast.error(msg || `Something went wrong! Please try again.`, {
			position: "top-left",
			autoClose: timer ? timer : 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const ModalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		p: 4,
	};

	const ExportPDF = () => {
		const element = document.createElement("a");
		if (language.value === "javascript") {
			const file = new Blob([code], { type: "js" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".js";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		} else if (language.value === "python") {
			const file = new Blob([code], { type: "py" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".py";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		} else if (language.value === "c") {
			const file = new Blob([code], { type: "c" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".c";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		} else if (language.value === "cpp") {
			const file = new Blob([code], { type: "cpp" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".cpp";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		} else if (language.value === "java") {
			const file = new Blob([code], { type: "java" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".java";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		} else if (language.value === "csharp") {
			const file = new Blob([code], { type: "cs" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".cs";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		} else if (language.value === "php") {
			const file = new Blob([code], { type: "php" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".php";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		} else {
			const file = new Blob([code], { type: "txt" });
			element.href = URL.createObjectURL(file);
			element.download = new Date() + ".txt";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		}
	};
	const drawerWidth = 240;

	const navItems = [
		{
			name: "Upload",
			icon: <Upload />,
			disabled: "Check",
			onclick: "upload",
		},

		{
			name: "Export",
			icon: <ImportExport />,
			disabled: "Not Check",
			onclick: "export",
			path: "",
		},
	];

	const ChangeCodeSnippet = () => {
		setCode("code");
		if (language.value === "java") {
			setCode(JavaSnipCode);
		} else if (language.value === "javascript") {
			setCode(JSSnipcode);
		} else if (language.value === "c") {
			setCode(CSnipCode);
		} else if (language.value === "python") {
			setCode(PythonSnipCode);
		} else if (language.value === "cpp") {
			setCode(CppSnipCode);
		} else if (language.value === "csharp") {
			setCode(CSharpSnipCode);
		} else if (language.value === "go") {
			setCode(GoSnipCode);
		} else if (language.value === "assembly") {
			setCode(AssemblySnipCode);
		} else if (language.value === "swift") {
			setCode(SwiftSnipCode);
		} else if (language.value === "ruby") {
			setCode(RubySnipCode);
		} else if (language.value === "php") {
			setCode(PHPsnipCode);
		} else if (language.value === "kotlin") {
			setCode(KotlinSnipCode);
		} else if (language.value === "rust") {
			setCode(RustSnipCode);
		} else if (language.value === "r") {
			setCode(RSnipCode);
		} else if (language.value === "haskell") {
			setCode(HaskellSnipCode);
		} else if (language.value === "scala") {
			setCode(ScalaSnipCode);
		} else if (language.value === "perl") {
			setCode(PerlSnipCode);
		} else if (language.value === "lua") {
			setCode(LuaSnipCode);
		} else if (language.value === "d") {
			setCode(DartSnipCode);
		} else if (language.value === "dart") {
			setCode(DartSnipCode);
		} else if (language.value === "fsharp") {
			setCode(fsharpSnipCode);
		} else if (language.value === "elixir") {
			setCode(ElixirSnipCode);
		} else if (language.value === "clojure") {
			setCode(ClojureSnipCode);
		} else if (language.value === "bash") {
			setCode(BashSnipCode);
		} else if (language.value === "basic") {
			setCode(BasicSnipCode);
		} else if (language.value === "cobol") {
			setCode(CobolSnipCode);
		} else if (language.value === "lisp") {
			setCode(CommonLispSnipCode);
		} else {
			setCode("//snippet code not available");
		}
	};

	useEffect(() => {
		ChangeCodeSnippet();
	}, [language]);

	return (
		<>
			<ToastContainer
				position="top-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<CssBaseline />
			<AppBar
				color="transparent"
				position="fixed"
				sx={{
					width: `calc(100% - ${drawerWidth}px)`,
				}}>
				<Toolbar>
					<Typography
						variant="body1"
						noWrap
						textTransform={"uppercase"}
						component="h1"
						color={"primary"}
						fontWeight={"bold"}
						fontFamily="sf mono">
						Change Language
					</Typography>
					<Box marginLeft={2}>
						<LanguagesDropdown onSelectChange={onSelectChange} />
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box>
						{navItems.map(({ path, name, icon, disabled, onclick }) => (
							<Button
								href={!path ? "" : path}
								target="__blank"
								label={name}
								variant="outlined"
								disabled={
									processing
										? true
										: false || !code
										? true
										: false || disabled === "Check"
										? user
											? false
											: true
										: false
								}
								startIcon={icon}
								onClick={
									onclick === "upload"
										? handleOpen
										: onclick === "export"
										? ExportPDF
										: null
								}
								color="primary"
								sx={{
									marginLeft: 4,
								}}>
								{name}
							</Button>
						))}

						<Button
							onClick={HandleCompile}
							size="large"
							disabled={processing ? true : false || !code}
							variant="contained"
							sx={{
								marginLeft: 2,
							}}>
							{processing ? "Running " : "Compile"}
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Container
				disableGutters
				maxWidth={"xl"}
				marginTop={13}
				sx={{
					height: `calc(100vh - ${drawerWidth}px)`,
				}}>
				<Grid container marginTop={0.5} direction={"row"}>
					<Grid item xs={12} md={7}>
						<CodeEditorWindow
							name={"code-editor"}
							code={code}
							onChange={onChange}
							language={language?.value}
							theme={"Active4D"}
						/>
					</Grid>
					<Grid item xs={12} md={5}>
						<Box
							sx={{
								width: "100%",
							}}>
							<Typography
								variant="h5"
								fontWeight={"bold"}
								textTransform={"uppercase"}>
								Output
							</Typography>
							<Box
								sx={{
									border: "1px solid #e0e0e0",
								}}>
								<OutputWindow outputDetails={outputDetails} />
							</Box>
						</Box>
						<Divider
							sx={{
								marginY: 2,
							}}
						/>
						<Box
							sx={{
								width: "100%",
							}}>
							<Box>
								<CustomInput
									customInput={customInput}
									setCustomInput={setCustomInput}
								/>
							</Box>
						</Box>
						<Divider
							sx={{
								marginY: 2,
							}}
						/>
						<Box>
							{outputDetails && outputDetails ? (
								<OutputDetails outputDetails={outputDetails} />
							) : (
								<Typography
									variant="caption"
									fontFamily={"calibre medium"}
									marginLeft={"1rem"}>
									{" "}
									Please run Something to Get Output Details
								</Typography>
							)}
						</Box>
						<Divider
							sx={{
								marginY: 2,
							}}
						/>
					</Grid>
				</Grid>

				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box sx={ModalStyle}>
						<Typography
							fontFamily={"calibre medium"}
							variant="h5"
							textTransform={"uppercase"}
							textAlign={"center"}>
							uploadCode
						</Typography>
						<TextField
							required
							error={isError ? true : false}
							label="Project Name"
							fullWidth
							onChange={(e) =>
								setIsProjectName(e.target.value) || setIsError(false)
							}
							margin="normal"
						/>
						<TextField
							required
							error={isError ? true : false}
							label="Project Discription"
							fullWidth
							multiline
							rows={4}
							onChange={(e) =>
								setIsProjectDiscription(e.target.value) || setIsError(false)
							}
							margin="normal"
						/>
						{isError ? (
							<Alert severity="error">Please Enter a Name && Discription</Alert>
						) : null}
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
							marginTop={2}
							spacing={1}>
							<Grid item>
								<Button
									endIcon={<PictureAsPdf />}
									variant="contained"
									onClick={upload}>
									Upload
								</Button>
							</Grid>
							<Grid item>
								<Button variant="outlined" onClick={handleClose}>
									Close
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>
			</Container>
		</>
	);
};
export default Landing;
