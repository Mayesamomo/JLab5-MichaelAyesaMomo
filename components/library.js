const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let xml;
const libraryNS = "http://www.opengis.net/kml/2.2"; //name space

async function loadLibraryData() {
    let url = "http://www.torontopubliclibrary.ca/data/library-data.kml";
    // let url = "http://localhost:8888/library-data.kml";
    if (xml == undefined) {
        let response = await fetch(
            url, {
            method: "GET",
            headers: {
                "Content-Type": "application/xml"
            }
        });
        const xmlText = await response.text();
    const dom = new JSDOM(xmlText, { contentType: "application/xml" });
    console.log(dom)
    xml = dom.window.document;
    }
    return xml;
}

async function loadLibraryBranches() {
    xml = await loadLibraryData();
    return xml.getElementsByTagNameNS(libraryNS, "Placemark");
}

async function getBranchById(id) {
    xml = await loadLibraryData();
  return xml.getElementById(id);
}

module.exports = {
    loadLibraryBranches,
    getBranchById
};
