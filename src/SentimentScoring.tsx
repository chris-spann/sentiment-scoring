import React, { useState } from "react"
import axios from "axios"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Button, Paper, TextField, Typography } from "@material-ui/core"
import Chart from "react-google-charts"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {},
		root: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			flexGrow: 1,
			"& > *": {
				margin: theme.spacing(1),
			},
		},
	})
)

interface Props {
	avg_sent?: BigInteger
	sents?: {
		message: string
		compound: BigInteger
		scores: string
	}
}

const SentimentScoring: React.FC<Props> = (sents) => {
	const classes = useStyles()
	const [text, setText] = useState("")
	const [comp, setComp] = useState(0)
	const [showGuage, setShowGuage] = useState(false)

	const guageOptions = {
		tooltip: { textStyle: { fontName: "Lucida Console", fontSize: 2 } },
		min: -1.0,
		max: 1.0,
		greenColor: "0dc98b",
		greenFrom: 0.3,
		greenTo: 1.0,
		yellowColor: "ffd952",
		yellowFrom: -0.3,
		yellowTo: 0.3,
		redColor: "ff4c4d",
		redFrom: -1.0,
		redTo: -0.3,
		majorTicks: ["-1.0", "1.0"],
		minorTicks: 1,
	}

	const handleChange = (event: any) => {
		setText((event.target as HTMLInputElement).value)
	}

	const formSubmit: React.FormEventHandler = (event) => {
		event.preventDefault()
		event.stopPropagation()
		if (showGuage === false) {
			setShowGuage(true)
		}
		console.log("Submitted: " + text)
		axios
			.post("/get_sentiment", {
				text: text,
			})
			.then((res) => {
				console.log("Returned: " + res.data.text)
				console.log("Score: " + res.data.comp)
				setText(res.data.searchText)
				setComp(parseFloat(res.data.comp))
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<>
			<div className="cards">
				<Paper variant="outlined" style={{ width: "22rem", height: "38rem" }}>
					<form
						className={classes.root}
						noValidate
						autoComplete="off"
						onSubmit={formSubmit}>
						<Typography variant="h5">Sentiment Calulator</Typography>
						<TextField
							id="standard-required"
							label="Type Something..."
							value={text || ""}
							fullWidth={true}
							onChange={handleChange}
						/>
						<Button
							variant="contained"
							style={{
								backgroundColor: "#420499",
								color: "white",
							}}
							type="submit">
							Get Sentiment
						</Button>
					</form>
					<br />

					{showGuage && (
						<div className={classes.root}>
							<TextField fullWidth={true} value={text} rowsMax={3} />

							<Chart
								className="gauge"
								chartType="Gauge"
								width="15em"
								height="15em"
								data={[
									["Label", "Value"],
									["Sentiment", comp],
								]}
								options={guageOptions}
							/>
						</div>
					)}
				</Paper>
			</div>
		</>
	)
}

export default SentimentScoring
