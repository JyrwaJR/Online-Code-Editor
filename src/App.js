/** @format */

import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Layout from "./components/Layout";
import MuiTheme from "./Theme/MuiTheme";
function App() {
	return (
		<React.Fragment>
			<ThemeProvider theme={MuiTheme}>
				<Layout />
			</ThemeProvider>
			
		</React.Fragment>
	);
}

export default App;
