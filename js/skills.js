var width = 375;
var height = 375;
var radius = width / 2;
var donutWidth = 40;

var arc = d3.arc()
.innerRadius(radius - donutWidth)
.outerRadius(radius);

var pie = d3.pie()
.value(function (d) { return d.count; })
.sort(null);

var svg = d3.select("#donut")
.attr("width", width)
.attr("height", height);

function resetSkills () {
	d3.select("#skill_category")
	.text("All skills");

	d3.select("#skill_list")
	.html("iOS development<br>" +
		"Android development<br>" +
		"Java<br>" +
		"Swift<br>" +
		"Objective-C<br>" +
		"Android Studio<br>" +
		"Xcode<br>" +
		"C/C++<br>" +
		"Python<br>" +
		"OCaml<br>" +
		"Git<br>" +
		"Object-oriented programming<br>" +
		"Functional programming<br>" +
		"Data structures<br>" +
		"User experience design<br>" +
		"HTML/CSS<br>" +
		"JavaScript<br>" +
		"Interactive data visualizations<br>" +
		"D3.js<br>" +
		"Assembly language<br>" +
		"Processor design<br>" +
		"Finite automana<br>" +
		"Public key cryptography<br>" +
		"Ranking and search algorithms<br>" +
		"Graph theory and social networks");

	d3.select("#skill_list")
	.style("column-count", 2);
}

d3.csv("data/skills.csv", function (error, data) {
	function updateSkills (id) {
		var skillData = [];

		if (id == "app")
			skillData = data[2];
		if (id == "software")
			skillData = data[1];
		if (id == "web")
			skillData = data[0];

		d3.select("#skill_category")
		.text(skillData.category);

		d3.select("#skill_list")
		.html(skillData.skills.replace(/, /g, "<br>"));

		if (skillData.category != "Software engineering") {
			d3.select("#skill_list")
			.style("column-count", 1);
		}
	}

	function appendCircle (id, cx, cy, fill) {
		svg.append("circle")
		.attr("id", id + "_circle")
		.attr("cx", cx)
		.attr("cy", cy)
		.attr("r", 8)
		.style("fill", fill)
		.on("mouseover", function () {
			d3.select(this)
			.style("cursor", "pointer")
			.style("opacity", 0.9);

			d3.select("#" + id + "_arc")
			.style("opacity", 0.9);

			updateSkills(id);
		})
		.on("mouseout", function () {
			d3.select(this)
			.style("opacity", 1.0);

			d3.select("#" + id + "_arc")
			.style("opacity", 1.0);

			resetSkills();
		});
	}

	appendCircle("app", 115, 160, "#2dcad8");
	appendCircle("software", 115, 185, "#fc7a23");
	appendCircle("web", 115, 210, "#555555");

	function appendText (id, x, y, text) {
		svg.append("text")
		.attr("id", id + "_text")
		.attr("x", x)
		.attr("y", y)
		.style("text-anchor", "start")
		.style("alignment-baseline", "middle")
		.style("font-family", "'Raleway', sans-serif")
		.style("font-size", 14)
		.text(text)
		.on("mouseover", function () {
			d3.select(this)
			.style("cursor", "pointer");

			d3.select("#" + id + "_circle")
			.style("opacity", 0.9);

			d3.select("#" + id + "_arc")
			.style("opacity", 0.9);

			updateSkills(id);
		})
		.on("mouseout", function () {
			d3.select("#" + id + "_circle")
			.style("opacity", 1.0);

			d3.select("#" + id + "_arc")
			.style("opacity", 1.0);

			resetSkills();
		});
	}

	appendText("app", 135, 160, "App development");
	appendText("software", 135, 185, "Software engineering");
	appendText("web", 135, 210, "Web development");

	var path = svg.selectAll("path")
	.data(pie(data))
	.enter()
	.append("path")
	.attr("id", function (d) {
		if (d.data.category == "App development")
			return "app_arc";
		if (d.data.category == "Software engineering")
			return "software_arc";
		return "web_arc";
	})
	.attr("d", arc)
	.attr("transform", "translate(" + (width / 2) + ", " + (height / 2) + ")")
	.attr("fill", function (d) {
		if (d.data.category == "App development")
			return "#2dcad8";
		if (d.data.category == "Software engineering")
			return "#fc7a23";
		return "#555555";
	})
	.on("mouseover", function (d) {
		d3.select(this)
		.style("opacity", 0.9)
		.style("cursor", "pointer");

		if (d.data.category == "App development")
			d3.select("#app_circle").style("opacity", 0.9);
		if (d.data.category == "Software engineering")
			d3.select("#software_circle").style("opacity", 0.9);
		if (d.data.category == "Web development")
			d3.select("#web_circle").style("opacity", 0.9);

		d3.select("#skill_category")
		.text(d.data.category);

		d3.select("#skill_list")
		.html(d.data.skills.replace(/, /g, "<br>"));

		if (d.data.category != "Software engineering") {
			d3.select("#skill_list")
			.style("column-count", 1);
		}
	})
	.on("mouseout", function () {
		d3.select(this)
		.style("opacity", 1.0);

		d3.selectAll("circle")
		.style("opacity", 1.0);

		resetSkills();
	});
});
