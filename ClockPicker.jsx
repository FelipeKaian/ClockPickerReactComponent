import React, { useEffect, useState } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";

const ClockPicker = (props) => {
	const {startTime, onChange, style } = props;

	const navigate = useNavigate();

	const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [hour, setHour] = useState(startTime?.hour || 12);

	const getAllMinutes = () => {
		var arr = [];

		for (let i = 0; i < 60; i++) {
			arr.push(i);
		}

		return arr;
	};

	const minutes = getAllMinutes();

	const [minute, setMinute] = useState(startTime?.minute || 0);

	const [shift, setShift] = useState("am");

	const [time, setTime] = useState(props?.time);

	const [hourConfirmed, setHourConfirmed] = useState(false);

	useEffect(() => {
		let shiftedHour = shift == "pm" ? (hour + 12) % 24 : hour;
		setTime({
			hour,
			minute,
			time: (shiftedHour < 10 ? "0" + shiftedHour : shiftedHour) + ":" + (minute < 10 ? "0" + minute : minute),
			shiftedTime: hour + ":" + (minute < 10 ? "0" + minute : minute) + " " + shift,
		});
	}, [hour, minute]);

	return (
		<div style={style}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<div style={{ justifyContent: "center", marginTop: "10px", display: "flex", marginLeft: "20px" }}>
					<Typography
						style={{ fontSize: "70px", color: !hourConfirmed ? "#3689ea" : "gray", cursor: "pointer" }}
						onClick={() => {
							setHourConfirmed(false);
						}}>
						{hour < 10 ? "0" + hour : hour}
					</Typography>
					<Typography style={{ fontSize: "70px", color: "gray" }}>{":"}</Typography>
					<Typography
						style={{ fontSize: "70px", color: !hourConfirmed ? "gray" : "#3689ea", cursor: "pointer" }}
						onClick={() => {
							setHourConfirmed(true);
						}}>
						{minute < 10 ? "0" + minute : minute}
					</Typography>
				</div>

				<div style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginTop: "10px" }}>
					<Button
						onClick={() => setShift("am")}
						style={{ fontSize: "20px", color: shift == "am" ? "#3689ea" : "gray", cursor: "pointer" }}>
						am
					</Button>
					<Divider></Divider>
					<Button
						onClick={() => setShift("pm")}
						style={{ fontSize: "20px", color: shift == "pm" ? "#3689ea" : "gray", cursor: "pointer" }}>
						pm
					</Button>
				</div>
			</div>

			<div
				style={{
					boxShadow: "0px 0px 5px #888888",
					borderRadius: "100%",
					padding: "125px",
					margin: "0 20px 20px 20px",
					alignItems: "center",
					background: "#eeeeee",
				}}>
				<div style={{ position: "relative", bottom: "7px", right: "10px" }}>
					{!hourConfirmed
						? hours.map((h) => {
								return (
									<div
										style={{
											transform: "rotate(" + (30 * h - 100) + "deg)",
											padding: "10px",
											margin: "0",
											position: "absolute",
										}}>
										<Typography
											onMouseEnter={() => setHour(h)}
											onClick={() => setHourConfirmed(true)}
											style={{
												color: "lightgray",
												position: "absolute",
												marginLeft: "80px",
												textAnchor: "start",
												transform: "rotate(" + (-30 * h + 100) + "deg)",
												borderRadius: "100%",
												padding: "0 0",
												width: "25px",
												padding: "5px",
												color: h == hour ? "white" : "gray",
												background: h == hour ? "#3689ea" : "#eeeeee",
												boxShadow: h == hour ? "0px 0px 5px #888888" : "none",
												textAlign: "center",
												cursor: "pointer",
											}}>
											{h}
										</Typography>
									</div>
								);
						  })
						: minutes.map((m) => {
								return (
									<div
										onMouseEnter={() => setMinute(m)}
										style={{
											transform: "rotate(" + (6 * m - 100) + "deg)",
											padding: "10px",
											position: "absolute",
										}}>
										{m % 5 == 0 && (
											<Typography
												onClick={() => {
													onChange(time);
												}}
												style={{
													position: "absolute",
													marginLeft: "80px",
													textAnchor: "start",
													transform: "rotate(" + (-6 * m + 100) + "deg)",
													borderRadius: "100%",
													padding: "0 0",
													width: "25px",
													padding: "5px",
													color: m == minute ? "white" : "gray",
													background: m == minute ? "#3689ea" : "#eeeeee",
													boxShadow: m == minute ? "0px 0px 5px #888888" : "none",
													textAlign: "center",
													cursor: "pointer",
													
												}}>
												{m < 10 ? "0" + m : m}
											</Typography>
										)}
									</div>
								);
						  })}

					<div
						style={{
							transform: "rotate(" + (6 * minute - 90) + "deg)",
							padding: "5px 75px 10px 0",
							position: "absolute",
							backgroundColor: hourConfirmed ? "#3689ea" : "lightgray",
							transformOrigin: "left",
							marginLeft: "10px",
							borderRadius: "30px",
							top: "2.5px",
							boxShadow: "0px 0px 5px #888888",
						}}></div>

					<div
						style={{
							transform: "rotate(" + (30 * hour - 90) + "deg)",
							padding: "5px 65px 10px 0",
							position: "absolute",
							backgroundColor: hourConfirmed ? "lightgray" : "#3689ea",
							transformOrigin: "left",
							marginLeft: "10px",
							borderRadius: "30px",
							top: "2.5px",
							boxShadow: "0px 0px 5px #888888",
						}}></div>

					<div
						style={{
							padding: "10px",
							position: "absolute",
							backgroundColor: "white",
							borderRadius: "100%",
							boxShadow: "0px 0px 5px #888888",
						}}></div>
				</div>
			</div>
		</div>
	);
};
export default ClockPicker;
