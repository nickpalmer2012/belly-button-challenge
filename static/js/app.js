// Set up constant for JSON data url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Set up initial function to set up dropdown menu options and
// show default plot when page is opened
function init() {
    // Set up dropdown menu options
    let dropdownMenu = d3.select("#selDataset");

    //  load names list from the api called with the above link
    d3.json(url).then((data) => {

    let namesList = data.names;

    // iterate over names list and add each ID to the dropdown menu variable
    namesList.forEach(name => {
        // console.log(name)
        // select the dropdownMenu variable that was initialized above
        dropdownMenu
        // each string in the "names" object will need to be appended as an <option> element
        .append("option")
        // each string will also need to have its own <value> attribute within the option element
        .attr("value", name)
        // each string will need to be added to the dropdown element,
        // so the user can select different IDs
        .text(name);
    })
  
 // Set up plots to show first sample when page opens
 // Bar graph
 const firstPlotId = namesList[0];
 chartCreation(firstPlotId);

    

})}


// Create function that creates charts using the data selected in the dropdown menu
function chartCreation(sample) {

    // Pull the array of samples from api using d3 and extract bar chart parameters from query
    d3.json(url).then((data) => {
        let samplesArray = data.samples;

        // Get sample_values from selected sample

        // Isolate selected sample from samplesArray by filtering by selected sample ID
        let selectedSample = samplesArray.filter(sampleJSON => sampleJSON.id == sample);
        let result = selectedSample[0];

        // Isolate the sample_values from the result to a variable
        let sampleValues = result.sample_values;

        // Isolate otu_ids from the result to a variable
        let otuIds = result.otu_ids;

        // Isolate the otu_labels from the result to a variable
        let otuLabels = result.otu_labels;
        
        // Set up bar chart parameters
        let trace1 = [
            {
                type: 'bar',
                x: sampleValues.slice(0,10).reverse(),
                y: otuIds.slice(0,10).map(id => `OTU ${id}`).reverse(),
                text: otuLabels.slice(0,10).reverse(),
                orientation: 'h'
    
            }];
        Plotly.newPlot("bar", trace1)

    

    })

}



// Create function that calls the above functions based on the sample selected in dropdown menu
function optionChanged(updatedSample) {
    chartCreation(updatedSample);
}

// Execute entire "init" function on page load
init();

