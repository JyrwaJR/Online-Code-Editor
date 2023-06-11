/** @format */

import { TextField } from "@mui/material";
import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
	return (
		<>
			{" "}
			<TextField
				multiline
				rows="5"
				fullWidth
				value={customInput}
				onChange={(e) => setCustomInput(e.target.value)}
				placeholder={`Custom input`}
			/>
		</>
	);
};

export default CustomInput;
