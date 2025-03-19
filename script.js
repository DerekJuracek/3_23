mapboxgl.accessToken =
  "pk.eyJ1IjoiY2l2aWNuZWJyYXNrYSIsImEiOiJjbGRkaXdnMWowNDBvM3FwNWcybnE2NXhmIn0.KAyFk0TA3OaiUOFCnjXXNA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/civicnebraska/clexfr7cx000h01mzika7ykfc", // style URL
  center: [-99.60554664374831, 41.478777848167454], // starting position [lng, lat]
  zoom: 5.9, // starting zoom
  projection: "globe", // display the map as a 3D globe
  customAttribution: "Civic Nebraska",
});
document.getElementById("splash-close").addEventListener("click", function () {
  document.getElementById("splash-screen").style.display = "none";
  const dropdownToggle = document.getElementById("navbarDropdownMenuLink");
  dropdownToggle.classList.remove("disabled");
  dropdownToggle.removeAttribute("tabindex");
  const legend1 = document.getElementById("voter-legend");
  legend1.style.display = "block";
  var geocoderInput = document.querySelector(".mapboxgl-ctrl-geocoder input");
  geocoderInput.removeAttribute("disabled");
  geocoderInput.classList.remove("disabled");
});

// used to change zoom-level of mapbox styles depending on pixel width of users device
// not dynamic, will only fire every time a refresh occurs
map.on("load", function () {
  var screenSize = window.innerWidth;
  var zoom = screenSize < 600 ? 4.7 : 5.9;
  map.flyTo({
    center: [-99.60554664374831, 41.478777848167454],
    zoom: zoom,
    speed: 0.5,
    curve: 1,
  });
});

// adding navigation control to pan & zoom map
const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});

map.addControl(nav, "bottom-left");

// adding geocoder plugin to map
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  bbox: [-104.053514, 39.999975, -95.30829, 43.001707],
});

document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
// Disable the geocoder
var geocoderInput = document.querySelector(".mapboxgl-ctrl-geocoder input");
geocoderInput.setAttribute("disabled", "disabled");
geocoderInput.classList.add("disabled");

// adding mapboxgl popup component to map
let popup = new mapboxgl.Popup({
  offset: [0, -7],
  closeButton: true,
  closeOnClick: true,
  maxWidth: "none",
  anchor: "center",
});


let swipeOn = false;
const swipe = document.getElementById("swiper");

$(document).ready(function () {
  $("#modalContainer").load("modal.html", function () {
    $(".modal-dialog-draggable").draggable({
      handle: ".modal-header"
    });
  });
});

swipe.addEventListener("click", function (event) {
    $("#swipeModal").modal("show");
    $("#swiper").addClass("disabled")
});

function disableDropdown() {
  $("#navbarDropdownMenuLink").off("click.dropdown"); 
  $("#navbarDropdownMenuLink").on("click", function (e) {
    e.preventDefault(); 
    e.stopPropagation();
  });
}

function enableDropdown() {
  $("#navbarDropdownMenuLink").off("click"); 
  $("#navbarDropdownMenuLink").dropdown(); 
}

$(document).ready(function () {
  $("body").on("click", "#closeModal", function () {
    disableDropdown()
    $("#comparison-container").show()
    $("#closeSwiper").show()
    // $("#map").hide()
    const beforeMap = new mapboxgl.Map({
      container: 'before',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 0],
      zoom: 0
  });

  const afterMap = new mapboxgl.Map({
      container: 'after',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 0],
      zoom: 0
  });


  const container = '#comparison-container';
  const compare = new mapboxgl.Compare(beforeMap, afterMap, container);

  $("body").on("click", "#closeSwiper", function () {
    compare.remove()
    $("#closeSwiper").hide()
    $("#swiper").removeClass("disabled")
    $("#comparison-container").hide()
    enableDropdown()
  })

  });
})
// variables used to change mapbox styles on input id
const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

// legend html variables
const legend1 = document.getElementById("voter-legend");
const legend2 = document.getElementById("voter-legendZC");
const legend3 = document.getElementById("voter-legendC");
const legend4 = document.getElementById("income-legend");
const legend5 = document.getElementById("belowP-legend");
const legend6 = document.getElementById("aboveP-legend");
const legend7 = document.getElementById("disability-legend");
const legend8 = document.getElementById("plus60-legend");
const legend9 = document.getElementById("children-legend");
const legend10 = document.getElementById("white-legend");
const legend11 = document.getElementById("hl-legend");
const legend12 = document.getElementById("asian-legend");
const legend13 = document.getElementById("black-legend");
const legend14 = document.getElementById("indian-legend");

// id variables for legend if/else statement
const idVote = "clexfr7cx000h01mzika7ykfc";
const idVoteZC = "clexfyjaa000101rumyqaonzb";
const idVoteC = "clexg301o001e01tjbvu4n3v6";
const idIncome = "clewoj4kq000501nzxujmb2ua";
const idBelowP = "clewnf117001a01pfv1micysu";
const idAboveP = "clevcmuzx00a101mgh3v8k4tv";
const idDis = "clewnra2m000701lnes3cxf9s";
const id60 = "clewo1pjf000101o3e3dom768";
const idChild = "clewodoxw000401pjsyljoonj";
const idWhite = "clexfewjc001801pbydx9y2ha";
const idHL = "clexf4tei000301pogtuiyqr4";
const idAsian = "clexf9z8d003v01trzgu99jha";
const idBlack = "clexfleuq003b01pgk110zhg6";
const idIndian = "clexec5sf001901msxnv4lg37";

// function used to change map styles
for (const input of inputs) {
  input.onclick = (layer) => {
    // console.log(layer);
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/civicnebraska/" + layerId);

    // else if statement for legend
    if (layerId === idVote) {
      // legend6.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend2.style.display = "none";
      legend3.style.display = "none";
      legend1.style.display = "block";

      //   legend.style.color = "green";
    } else if (layerId === idVoteZC) {
      // legend6.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "block";
      // legend.setAttribute("id", "poverty-legend");
      //   legend.style.color = "black";
    } else if (layerId === idVoteC) {
      // legend6.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "block";

      // legend.setAttribute("id", "poverty-legend");
      //   legend.style.color = "black";
    } else if (layerId === idIncome) {
      // legend6.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "block";
    } else if (layerId === idBelowP) {
      // legend6.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "block";

      // console.log(`it's the right id`);
    } else if (layerId === idAboveP) {
      // legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "block";

      // console.log(`it's the right id`);
    } else if (layerId === idDis) {
      // legend6.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "block";

      // console.log(`it's the right id`);
    } else if (layerId === id60) {
      // legend6.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "block";

      // console.log(`it's the right id`);
    } else if (layerId === idChild) {
      // legend6.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "block";

      // console.log(`it's the right id`);
    } else if (layerId === idWhite) {
      // legend6.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "block";
    } else if (layerId === idHL) {
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "block";
    } else if (layerId === idAsian) {
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend3.style.display = "none";
      legend2.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "none";
      legend12.style.display = "block";
    } else if (layerId === idBlack) {
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend2.style.display = "none";
      legend3.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "none";
      legend13.style.display = "block";
    } else if (layerId === idIndian) {
      legend13.style.display = "none";
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend2.style.display = "none";
      legend3.style.display = "none";
      legend1.style.display = "none";
      legend14.style.display = "block";
    } else {
      legend12.style.display = "none";
      legend11.style.display = "none";
      legend10.style.display = "none";
      legend9.style.display = "none";
      legend8.style.display = "none";
      legend7.style.display = "none";
      legend6.style.display = "none";
      legend5.style.display = "none";
      legend4.style.display = "none";
      legend2.style.display = "none";
      legend3.style.display = "none";
      legend1.style.display = "none";
      legend13.style.display = "none";
    }
  };
}

// query mapbox style features on click event
// create variables and add to popup
map.on("click", (e) => {
  const loader = map.getStyle().name;
  console.log(loader);
  if (loader !== "Zip_Code" && loader !== "County") {
    const features = map.queryRenderedFeatures(e.point, {});
    console.log(features);

    // popup variables
    const properties = features[0].properties;
    // console.log(properties);
    const census = properties.NAMELSAD;
    const voterTurnout = properties.Voter_Turn;
    const medianIncome = properties.Median_Inc;
    const over60 = properties.Over_60;
    const disab = properties.Household_;
    const childUnder18 = properties.Child_Unde;
    const abovePoverty = properties.Above_Pov;
    const belowPoverty = properties.Below_Pov;
    const blackAlone = properties.Black_Alon;
    const asianAlone = properties.Asian_Alon;
    const amIndianAlone = properties.Am_Indian;
    const whiteAlone = properties.White_Alon;
    const hisLatAlone = properties.Hispanic_L;

    // set lat & lng to popup
    var lat = e.lngLat.lat;
    var lng = e.lngLat.lng;
    var coordinates = [];
    coordinates.push(lng, lat);
    if (census === undefined) {
      popup
        .setLngLat(coordinates)
        .setHTML(
          `<h6><strong>No Data</strong></h6><hr style="height:2px;border-width:0;color:gray;background-color:gray"><p><strong>Voter Turnout: </strong>No Data<br><strong>Median Income: </strong>No Data</nobr><br>
        <nobr><strong>Above Poverty: </strong>No Data</nobr><br><nobr><strong>Below Poverty: </strong>No Data</nobr><br><nobr><strong>Homes w/ at least one 60 year old: </strong>No Data<br>
       <nobr><strong>Homes w/ at least one child under 18 years old: </strong>No Data<br>
        <nobr><strong>Homes w/ at least one person w/ Disability: </strong>No Data<nobr><br><strong>Asian Householders: </strong>No Data<nobr><br><strong>Black Householders: </strong>No Data<br><nobr><strong>American Indian Householders: </strong>No Data
        </nobr><br><nobr><strong>White Householders: </strong>No Data</nobr><br><nobr><strong>Hispanic/Latino Householders: </strong>No Data`
        )
        .addTo(map);
    } else {
      popup
        .setLngLat(coordinates)
        .setHTML(
          `<h6><strong>${census}</strong></h6><hr style="height:2px;border-width:0;color:gray;background-color:gray"><p><strong>Voter Turnout: </strong>${voterTurnout}%<br><strong>Median Income: </strong>$${medianIncome}</nobr><br>
        <nobr><strong>Above Poverty: </strong>${abovePoverty}% </nobr><br><nobr><strong>Below Poverty: </strong>${belowPoverty}% </nobr><br><nobr><strong>Homes w/ at least one 60 year old: </strong>${over60}%<br>
       <nobr><strong>Homes w/ at least one child under 18 years old: </strong>${childUnder18}% <br>
        <nobr><strong>Homes w/ at least one person w/ Disability: </strong>${disab}%<nobr><br><strong>Asian Householders: </strong>${asianAlone}%<nobr><br><strong>Black Householders: </strong>${blackAlone}%<br><nobr><strong>American Indian Householders: </strong>${amIndianAlone}%
        </nobr><br><nobr><strong>White Householders: </strong>${whiteAlone}%</nobr><br><nobr><strong>Hispanic/Latino Householders: </strong>${hisLatAlone}%`
        )
        .addTo(map);
    }

    // popup for if zip-code map style id is selected
  } else if (loader === "Zip_Code") {
    const features = map.queryRenderedFeatures(e.point, {});
    console.log(features);
    const properties = features[0].properties;

    const zipCode = properties.NAME;
    const City = properties.City;
    const voterTurnout = properties.VoterTurn;
    var lat = e.lngLat.lat;
    var lng = e.lngLat.lng;
    var coordinates = [];
    coordinates.push(lng, lat);

    popup
      .setLngLat(coordinates)
      .setHTML(
        `<h6><strong>Zip-Code: ${zipCode}</strong></h6><hr style="height:2px;border-width:0;color:gray;background-color:gray"><p><strong>Voter Turnout: </strong>${voterTurnout}%
        </p><strong>City: </strong>${City}</nobr>`
      )
      .addTo(map);

    //popup for if county map style id is select
  } else {
    const features = map.queryRenderedFeatures(e.point, {});
    console.log(features);
    const properties = features[0].properties;

    const CountyName = properties.NAMELSAD;
    const voterTurnout = properties.VoterTurn;

    var lat = e.lngLat.lat;
    var lng = e.lngLat.lng;
    var coordinates = [];
    coordinates.push(lng, lat);

    popup
      .setLngLat(coordinates)
      .setHTML(
        `<h6><strong>County: ${CountyName}</strong></h6><hr style="height:2px;border-width:0;color:gray;background-color:gray"><strong>Voter Turnout: </strong>${voterTurnout}%
        </p>`
      )
      .addTo(map);
  }
});
