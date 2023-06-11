/** @format */

import { Grid, Typography } from "@mui/material";
import React from "react";

const OutputWindow = ({ outputDetails }) => {
	const getOutput = () => {
		let statusId = outputDetails?.status?.id;

		if (statusId === 6) {
			// compilation error
			return (
				<Typography
					variant="caption"
					fontFamily={"sf mono"}
					color="error"
					margin={1}>
					{atob(outputDetails?.compile_output)}
				</Typography>
			);
		} else if (statusId === 3) {
			return (
				<Typography
					variant="caption"
					fontWeight={"bold"}
					fontFamily={"sf mono"}
					margin={1}>
					{atob(outputDetails.stdout) !== null
						? `${atob(outputDetails.stdout)}`
						: null}
				</Typography>
			);
		} else if (statusId === 5) {
			return (
				<Typography
					variant="caption"
					fontFamily={"sf mono"}
					color="error"
					margin={1}>
					{`Time Limit Exceeded`}
				</Typography>
			);
		} else {
			return (
				<Typography
					variant="caption"
					fontFamily={"sf mono"}
					color="error"
					margin={1}>
					{atob(outputDetails?.stderr)}
				</Typography>
			);
		}
	};
	return (
		<>
			<Grid
				container
				direction={"row"}
				sx={{
					width: "auto",
					overflowY: "auto",
					height: "300px",
				}}>
				{outputDetails ? <>{getOutput()}</> : null}
			</Grid>
		</>
	);
};

export default OutputWindow;
