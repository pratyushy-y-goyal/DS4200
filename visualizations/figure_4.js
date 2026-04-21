
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
            .style("font-size", "14px")
            .text("Number of Beds");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(title);

        svg.append("text")
            .attr("transform", "rotate(-90)") 
            .attr("y", margin.left / 4)        
            .attr("x", -(height / 2))         
            .attr("dy", "1em")                
            .style("text-anchor", "middle")   
            .style("font-size", "14px")
            .style("fill", "black")
            .text("Operating Expense Ratio");

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

        // 6. Draw the reference line
        svg.append("line")
            .attr("x1", margin.left)                      
            .attr("x2", margin.left + width)              
            .attr("y1", yScale(1.0))          
            .attr("y2", yScale(1.0))     
            .attr("stroke", "black")  
            .attr("stroke-width", 2)        
            .attr("stroke-dasharray", "8,4")  
            .style("opacity", 0.7);
    }

    // CALL THE FUNCTION TWICE
    drawChart("#scatterplot-rural", "R", "Rural Hospitals");
    drawChart("#scatterplot-urban", "U", "Urban Hospitals");
});