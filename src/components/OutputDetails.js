/** @format */

import { Grid, Typography } from "@mui/material";
import React from "react";

const OutputDetails = ({ outputDetails }) => {
	return (
		<Grid container columnSpacing={2} direction={"row"}>
			<Grid item>
				<Typography paragraph>
					Status:{" "}
					<span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
						{outputDetails?.status?.description}
					</span>
				</Typography>
			</Grid>

			<Grid item>
				<Typography paragraph>
					Memory:{" "}
					<span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
						{outputDetails?.memory}
					</span>
				</Typography>
			</Grid>
			<Grid item>
				<Typography paragraph>
					Time:{" "}
					<span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
						{outputDetails?.time}
					</span>
				</Typography>
			</Grid>
		</Grid>
	);
};

export default OutputDetails;
