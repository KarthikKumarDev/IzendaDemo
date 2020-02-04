import React, { Component } from "react";
import axios from "axios";

class IzendaImplementation extends Component {
	state = {
		username: "zakky akhtar",
		password: "zakky@123",
		tenantname: "POCv2"
	};
	render() {
		return (
			<div>
				{" "}
				<div className="cont">
					<div className="login">
						<input
							type="text"
							id="instance"
							className="intxt"
							placeholder="Instance Name"
						/>
						<br />
						<span>User Id: </span>
						<input
							type="text"
							id="userId"
							className="intxt"
							placeholder="User Id"
						/>
						<br />
						<span>Password: </span>
						<input
							type="password"
							id="uPassword"
							className="intxt"
							placeholder="Password"
						/>
						<br />
						<br />
						<input type="button" value="Login" onClick={this.logon} />
					</div>
				</div>
				<div className="container" id="izenda-root"></div>
				<script
					type="text/javascript"
					src="/izenda/izenda_common.js?db1ebd9b10aa86f1fd76"
				></script>
				<script
					type="text/javascript"
					src="/izenda/izenda_locales.js?db1ebd9b10aa86f1fd76"
				></script>
				<script
					type="text/javascript"
					src="/izenda/izenda_vendors.js?db1ebd9b10aa86f1fd76"
				></script>
				<script
					type="text/javascript"
					src="/izenda/izenda_ui.js?db1ebd9b10aa86f1fd76"
				></script>
				<script src="mainScript.js"></script>
				<script>$(document).ready(function () {console.log("loaded")});</script>
			</div>
		);
	}

	logon = () => {
		var data = {
			username: this.state.username,
			password: this.state.password,
			tenantname: this.state.tenantname
		};
		var jsonData = JSON.stringify(data);
		var routes = [
			{
				user: "Amit",
				path: "report/view/4b49a107-2375-47f0-a1ec-a4bd492c4628"
			},
			{
				user: "Abdul",
				path: "dashboard/edit/b169dd43-8fe3-4bae-aa58-f6af7fdd6314"
			}
		];

		axios
			.post("http://159.89.90.84:81/api/user/login", jsonData)
			.then(response => {
				var token = response.data != null ? response.data.token : "No Token";
				console.log("token:" + token);
				//getIzendaApp(this.state.username);
			})
			.catch(error => {
				console.log(error);
			});
	};

	getIzendaApp = user => {
		IzendaSynergy.config({
			WebApiUrl: "http://159.89.90.84:81/api/",
			BaseUrl: "/",
			RootPath: "/izenda",
			CssFile: "izenda-ui.css",
			Routes: {
				// "Settings": "settings",
				// "New": "new",
				// "Dashboard": "dashboard",
				// "Report": "report",
				// "ReportViewer": "reportviewer",
				// "ReportViewerPopup": "reportviewerpopup",
				// "Viewer": "viewer"
				//"Report": route
			},
			Timeout: 3600
			//"OnReceiveUnauthorizedResponse": redirectToLoginPage()
		});

		IzendaSynergy.setCurrentUserContext({
			token: token
		});

		if (user == "Amit") {
			IzendaSynergy.renderReportViewerPage(
				document.getElementById("izenda-root"),
				"4b49a107-2375-47f0-a1ec-a4bd492c4628"
			);
		} else if (user == "Abdul") {
			IzendaSynergy.renderDashboardViewerPage(
				document.getElementById("izenda-root"),
				"b169dd43-8fe3-4bae-aa58-f6af7fdd6314"
			);
		} else {
			IzendaSynergy.render(document.getElementById("izenda-root"));
		}
	};

	redirectToLoginPage = () => {
		console.log(
			"Current user is unauthorized to access Izenda function. Navaigate to login page"
		);

		window.location.href = "login.html";
	};
}

export default IzendaImplementation;
