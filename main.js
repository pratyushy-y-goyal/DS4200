// let width = 800,
//     height = 500;

// let margin = { top: 50, bottom: 50, left: 60, right: 60 };

// d3.json("scatterplot_json").then(function(loadedData) {
    
//     // // All your D3 drawing code MUST go inside this block
//     // // because it waits for the file to finish downloading.

//     // const logA = 0.8;   
//     // const logB = -0.09; 

//     // // Update your lineData block to look like this:
//     // const lineData = d3.range(1, 2800, 10).map(x => {
//     //     return {
//     //         xValue: x,
//     //         // Replace the 1.5 and 0.2 with logA and logB
//     //     yValue: logA + logB * Math.log(x)
//     // };
//     //     }).filter(d => d.yValue >= 0); // This keeps it from drooping below the X-axis!

//     // // 2. Define the line generator
//     // const logLine = d3.line()
//     //     .x(d => xScale(d.xValue))
//     //     .y(d => yScale(d.yValue))
//     //     .curve(d3.curveMonotoneX); // This makes the line smooth

//     const tooltip = d3.select("body")
//         .append("div")
//         .style("position", "absolute")
//         .style("visibility", "hidden")
//         .style("background-color", "white")
//         .style("border", "1px solid #ddd")
//         .style("padding", "10px")
//         .style("border-radius", "5px")
//         .style("pointer-events", "none"); // Prevents the tooltip from flickering
    
//     const regionMap = { "R": "Rural", "U": "Urban" };

    
//     const data = loadedData; // delivered information is now going to be called data

//     let svg = d3.select("#scatterplot") //put the image in the body part 
//               .append("svg")
//               .attr("width", width) // what you defined earlier 
//               .attr("height", height)
//               .style('background', "#fcfcfc")

//     let yScale = d3.scaleLinear()
//               .domain([0, d3.max(data, d => d["Operating Expense Ratio"])]) // this is the maximum value of the data])
//               .range([height - margin.bottom, margin.top]) //how the coordinates change based on the data 

//     let yAxis = svg.append("g")
//              .call(d3.axisLeft().scale(yScale))
//              .attr("transform", `translate(${margin.left}, 0)`) // this is the back tick
    
//     let xScale = d3.scaleLinear()
//             .domain([0, d3.max(data, d => d["Number of Beds + Total for all Subproviders"])]) // this is the maximum value of the data])
//             .range([margin.left, width - margin.right]) // always looking at it from left to right 
//             // will be equally divided into six parts 


//     let xAxis = svg.append("g") // append with a group 
//             .call(d3.axisBottom().scale(xScale))
//             .attr("transform", `translate(0, ${height - margin.bottom})`) // these are types of transformations (like a translation)
    
//     let colorScale = d3.scaleOrdinal()
//                 .domain(["R", "U"]) // The values in your data
//                 .range(["#6ad5ff", "#ff892a"])


//     svg.append("text")
//         .attr("x", width/2)
//         .attr("y", height - 15)
//         .attr("font-size", "14px")
//         .text("Number of Beds")
//         .style("text-anchor", "middle")
        

//     svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("x", -(margin.top + (height - margin.top - margin.bottom) / 2))
//         .attr("y", margin.left / 3) 
//         .style("text-anchor", "middle") 
//         .style("font-size", "14px")
//         .text("Operating Expense Ratio")

//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", margin.top / 2)
//         .attr("text-anchor", "middle")
//         .style("font-size", "15px")
//         .style("font-weight", "bold")
//         .text("Association between Number of Beds and Operating Expense Ratio")

//     let circle = svg.selectAll("circle")
//                 .data(data)
//                 .enter()
//                 .append("circle")
//                 .attr("cx", d => xScale(d["Number of Beds + Total for all Subproviders"])) // location x and y are defined by the data
//                 .attr("cy", d => yScale(d["Operating Expense Ratio"]))
//                 .attr("r", 1.5)
//                 .attr("fill", d => colorScale(d["Rural Versus Urban"])) 
//                 .attr("opacity", 0.7); // Makes overlapping dots easier to see
    
//     // svg.append("path")
//     //     .datum(lineData)
//     //     .attr("fill", "none")
//     //     .attr("stroke", "black")
//     //     .attr("stroke-width", 2)
//     //     .attr("d", logLine)

//     circle
//         .on("mouseover", function(event, d) {
//         tooltip.style("visibility", "visible")
//                 .html(`<strong>Beds:</strong> ${d["Number of Beds + Total for all Subproviders"]}<br>
//                         <strong>Ratio:</strong> ${d["Operating Expense Ratio"]}<br>
//                         <strong>Hospital Name:</strong> ${d["Type of Control"]}<br>
//                         <strong>Region:</strong> ${regionMap[d["Rural Versus Urban"]]}<br>`);
//         })
//         .on("mousemove", function(event) {
//         tooltip.style("top", (event.pageY - 10) + "px")
//                 .style("left", (event.pageX + 10) + "px");
//         })
//         .on("mouseout", function() {
//         tooltip.style("visibility", "hidden");
//         })
    
//     const legend = svg.append("g")
//         .attr("class", "legend")
//         .attr("transform", "translate(700, 70)")
//         .style("z-index", "10"); // Ensure it stays on top

//     colorScale.domain().forEach((d, i) => {
//     const legendRow = legend.append("g")
//         .attr("transform", `translate(0, ${i * 25})`); 

//     // FIX: Use colorScale(d) to get the hex code from your scale
//     legendRow.append("circle")
//         .attr("r", 6)
//         .attr("fill", colorScale(d)); 

//     // FIX: Map "R" to "Rural" and "U" to "Urban" manually
//     legendRow.append("text")
//         .attr("x", 15)
//         .attr("y", 0) 
//         .attr("dy", ".35em") // This centers the text vertically with the circle
//         .text(d === "R" ? "Rural" : "Urban") 
//         .style("font-family", "sans-serif")
//         .style("font-size", "14px")
//         .style("fill", "black");
//     });

    
// })



// //comment


// Adjust dimensions for two smaller graphs
let width = 450, height = 400;
let margin = { top: 50, bottom: 50, left: 60, right: 20 };

d3.json("scatterplot_json").then(function(loadedData) {
    
    const regionMap = { "R": "Rural", "U": "Urban" };

    // HELPER FUNCTION: This draws one chart based on a filter
    function drawChart(selector, regionCode, title) {
        
        // 1. Filter the data for this specific chart
        const filteredData = loadedData.filter(d => d["Rural Versus Urban"] === regionCode);

        let svg = d3.select(selector)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .style('background', "#fcfcfc");

        // 2. Scales (Keep domains consistent across both for comparison)
        let yScale = d3.scaleLinear()
                  .domain([0, d3.max(loadedData, d => d["Operating Expense Ratio"])]) 
                  .range([height - margin.bottom, margin.top]);

        let xScale = d3.scaleLinear()
                .domain([0, d3.max(loadedData, d => d["Number of Beds + Total for all Subproviders"])]) 
                .range([margin.left, width - margin.right]);

        let colorScale = d3.scaleOrdinal()
                    .domain(["R", "U"])
                    .range(["#6ad5ff", "#ff892a"]);

        // 3. Axes
        svg.append("g")
           .call(d3.axisLeft().scale(yScale))
           .attr("transform", `translate(${margin.left}, 0)`);

        svg.append("g")
           .call(d3.axisBottom().scale(xScale))
           .attr("transform", `translate(0, ${height - margin.bottom})`);

        // 4. Labels
        svg.append("text")
            .attr("x", width/2)
            .attr("y", height - 10)
            .style("text-anchor", "middle")
            .text("Number of Beds");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(title);

        // 5. Circles
        svg.selectAll("circle")
            .data(filteredData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d["Number of Beds + Total for all Subproviders"]))
            .attr("cy", d => yScale(d["Operating Expense Ratio"]))
            .attr("r", 2)
            .attr("fill", colorScale(regionCode))
            .attr("opacity", 0.7);
    }

    // CALL THE FUNCTION TWICE
    drawChart("#scatterplot-rural", "R", "Rural Hospitals");
    drawChart("#scatterplot-urban", "U", "Urban Hospitals");
});