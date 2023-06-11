/** @format */

import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
import { Grid } from "@mui/material";

const CodeEditorWindow = ({ onChange, language, code, theme, name }) => {
	const [value, setValue] = useState(code || "");

	const handleEditorChange = (value) => {
		setValue(value);
		onChange("code", value);
	};
	useEffect(() => {
		setValue(code);
	}, [code]);
	// console.log(value, "value");
	return (
		<Grid
			container
			direction={"row"}
			sx={{
				display: "flex",
				overflow: "hidden",
				width: "100%",
				height: "auto",
			}}
			className=" ">
			<Editor
				className={name}
				height="85vh"
				width={`100%`}
				language={language || "javascript"}
				value={value}
				theme={theme}
				onChange={handleEditorChange}
			/>
		</Grid>
	);
};
export default CodeEditorWindow;
