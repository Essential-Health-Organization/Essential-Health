import React, { Fragment, useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	// const [user_id, setuserid] = useState("");
	const [results, setResults] = useState([]);

	async function getResults() {
		try {
			const response = await fetch(`http://localhost:4001/results/occ`, {
				method: "GET",
				//pass token with localstorage because it is stored in the header
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			// setpersonalForm(parseData);
			console.log(parseRes);
			// setUsername(parseRes.username);
			setResults(parseRes.data.occupationResults);
			// setuserid(parseRes.user_id); //
			// const encryptStorage = new EncryptStorage('secret-key');
			// removed the localstorage user id
			console.log(parseRes.data.occupationResults);
		} catch (err) {
			console.error(err.message);
		}
	}
	var data = {
		labels: results?.map((x) => x.occupation),
		datasets: [
			{
				label: `${results?.length} Amount per Occupation`,
				data: results?.map((x) => x.values),
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};
	var options = {
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		legend: {
			labels: {
				fontSize: 26,
			},
		},
	};

	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getResults();
	}, []);

	return (
		<div>
			<Doughnut data={data} options={options} height={400} />
		</div>
	);
};

export default DoughnutChart;
