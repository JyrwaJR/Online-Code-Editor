/** @format */

import { CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import Select from "react-select";

import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {
	return (
		<React.Fragment>
			<CssBaseline>
				<Select
					placeholder={`Filter By Category`}
					options={languageOptions}
					styles={{
						control: (base) => ({
							...base,
							width: "250px",
							border: "1px solid #000",
						}),
					}}
					defaultValue={languageOptions[0]}
					onChange={(selectedOption) => onSelectChange(selectedOption)}
				/>
			</CssBaseline>
		</React.Fragment>
	);
};

export default LanguagesDropdown;
