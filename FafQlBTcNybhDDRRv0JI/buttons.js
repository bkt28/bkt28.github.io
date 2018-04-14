function appendButton(id, width, height, x, y, fill, stroke, activeFill,
	text, textFill, activeTextFill, font, fontSize, showElementId, hideElementId) {

	buttonGroup = d3.select(id).append("g");

	buttonGroup.append("a")
	.append("rect")
	.attr("width", width)
	.attr("height", height)
	.attr("x", x)
	.attr("y", y)
	.style("fill", fill)
	.style("stroke", stroke)
	.style("stroke-width", 3)
	.style("cursor", "pointer");

	buttonGroup.append("text")
	.attr("x", width / 2)
	.attr("y", height / 2)
	.attr("pointer-events", "none")
	.style("text-anchor", "middle")
	.style("alignment-baseline", "middle")
	.style("fill", textFill)
	.style("font-family", font)
	.style("font-size", fontSize)
	.text(text);

	buttonGroup.on("mouseover", function () {
		d3.select(this).select("rect").transition()
		.style("fill", activeFill);

		d3.select(this).select("text").transition()
		.style("fill", activeTextFill);
	});

	buttonGroup.on("mouseout", function () {
		d3.select(this).select("rect").transition()
		.style("fill", fill);

		d3.select(this).select("text").transition()
		.style("fill", textFill);
	});

	buttonGroup.on("click", function () {
		var showElement = document.getElementById(showElementId);
		var hideElement = document.getElementById(hideElementId);

	    showElement.style.display = "block";
		hideElement.style.display = "none";

		d3.select(this).select("rect")
		.style("fill", activeFill);

		d3.select(this).select("text")
		.style("fill", activeTextFill);

		d3.select(this).on("mouseout", function () {

		});

		var inactiveId = (id == "#button_1") ? "#button_2" : "#button_1";
		console.log(d3.select(inactiveId));

		d3.select(inactiveId).select("rect")
		.style("fill", fill);

		d3.select(inactiveId).select("text")
		.style("fill", textFill);

		d3.select(inactiveId).select("g").on("mouseout", function () {
			d3.select(inactiveId).select("rect").transition()
			.style("fill", fill);

			d3.select(inactiveId).select("text").transition()
			.style("fill", textFill);
		});;
	});
}
