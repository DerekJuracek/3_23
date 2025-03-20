mapboxgl.accessToken = "pk.eyJ1IjoiY2l2aWNuZWJyYXNrYSIsImEiOiJjbGRkaXdnMWowNDBvM3FwNWcybnE2NXhmIn0.KAyFk0TA3OaiUOFCnjXXNA";

// Global variables
let beforeMapValue = null;
let afterMapValue = null;
let swipeOn = false;
let beforeMap, afterMap, compare;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/civicnebraska/clexfr7cx000h01mzika7ykfc",
  center: [-99.60554664374831, 41.478777848167454],
  zoom: 5.9,
  projection: "globe",
  customAttribution: "Civic Nebraska",
});

document.getElementById("splash-close").addEventListener("click", function () {
  document.getElementById("splash-screen").style.display = "none";
  $("#swiper").removeAttr('disabled')
  const dropdownToggle = document.getElementById("navbarDropdownMenuLink");
  dropdownToggle.classList.remove("disabled");
  dropdownToggle.removeAttribute("tabindex");
  const legend1 = document.getElementById("voter-legend");
  legend1.style.display = "block";
  var geocoderInput = document.querySelector(".mapboxgl-ctrl-geocoder input");
  geocoderInput.removeAttribute("disabled");
  geocoderInput.classList.remove("disabled");
});

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

const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});
map.addControl(nav, "bottom-left");

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  bbox: [-104.053514, 39.999975, -95.30829, 43.001707],
});
document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
var geocoderInput = document.querySelector(".mapboxgl-ctrl-geocoder input");
geocoderInput.setAttribute("disabled", "disabled");
geocoderInput.classList.add("disabled");

let popup = new mapboxgl.Popup({
  offset: [0, -7],
  closeButton: true,
  closeOnClick: true,
  maxWidth: "none",
  anchor: "center",
});

var beforeMapSelected = false
var afterMapSelected = false

function checkCompareButton() {
  if (beforeMapSelected && afterMapSelected) {
    $("#closeModal").removeAttr('disabled')
  } else {
    $("#closeModal").attr('disabled')
    $("#closeModal")
    .attr("title", "Before Map and After Map Selection Required")
    // .css("cursor", "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"red\" d=\"M12 2L2 12h6v10h8V12h6L12 2z\"/></svg>') 12 12, auto");
  }
}

// Attach Before Map dropdown listener to body
$("body").on("click", "#beforeMapDropdown + .dropdown-menu .dropdown-item", function (e) {
  e.preventDefault();
  const selectedText = $(this).text();
  beforeMapValue = $(this).data("value");

  if (beforeMapValue.length > 0) {
    beforeMapSelected = true
  } else {
    beforeMapSelected = false
  }
  checkCompareButton()
  const dropdownButton = $("#beforeMapDropdown");
  dropdownButton.text(selectedText);
  dropdownButton.attr("title", selectedText);
});

// Attach After Map dropdown listener to body
$("body").on("click", "#afterMapDropdown + .dropdown-menu .dropdown-item", function (e) {
  e.preventDefault();
  const selectedText = $(this).text();
  afterMapValue = $(this).data("value");

  if (afterMapValue.length > 0) {
    afterMapSelected = true
  } else {
    afterMapSelected = false
  }
  checkCompareButton()
  const dropdownButton = $("#afterMapDropdown");
  dropdownButton.text(selectedText);
  dropdownButton.attr("title", selectedText);
});

$(document).ready(function () {
  $("#modalContainer").load("modal.html", function () {
    $(".modal-dialog-draggable").draggable({
      handle: ".modal-header",
    });
  });
});

const swipe = document.getElementById("swiper");
swipe.addEventListener("click", function (event) {
  $("#swipeModal").modal("show");
  $("#swiper").addClass("disabled");
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
    disableDropdown();
    $("#comparison-container").show();
    $("#closeSwiper").show();
    $("#map").hide();

    const allLegends = document.querySelectorAll("#legend-master > div");
    allLegends.forEach(legend => legend.style.display = "none");

    let beforeMapVal = beforeMapValue ? `mapbox://styles/civicnebraska/${beforeMapValue}` : "mapbox://styles/mapbox/light-v11";
    let afterMapVal = afterMapValue ? `mapbox://styles/civicnebraska/${afterMapValue}` : "mapbox://styles/mapbox/light-v11";

    beforeMap = new mapboxgl.Map({
      container: "before",
      style: beforeMapVal,
      center: map.getCenter(),
      zoom: map.getZoom(),
    });

    afterMap = new mapboxgl.Map({
      container: "after",
      style: afterMapVal,
      center: map.getCenter(),
      zoom: map.getZoom(),
    });

    const container = "#comparison-container";
    compare = new mapboxgl.Compare(beforeMap, afterMap, container);

    showCompareLegends(beforeMapValue, afterMapValue);

    $("body").on("click", "#closeSwiper", function () {
      compare.remove();
      // $("#closeModal").attr('disabled').attr('readonly')
      $("#closeSwiper").hide();
      $("#swiper").removeClass("disabled");
      $("#comparison-container").hide();
      $("#map").show();
      map.resize();
      enableDropdown();

      const selectedInput = document.querySelector("#menu input:checked");
      if (selectedInput) updateLegend(selectedInput.id);
    });
  });
});

const legendMap = {
  "clexfr7cx000h01mzika7ykfc": "voter-legend",
  "cm8eoeypk001v01s0hkjr1kbe": "voter-legend-2020",
  "cm8eq6bp600xt01s5eru42ebf": "voter-legend-2024",
  "clexfyjaa000101rumyqaonzb": "voter-legendZC",
  "cm8emm223001801s0aza732ul": "voter-legendZC-2020",
  "cm8engaau006r01rygv0w2dwp": "voter-legendZC-2024",
  "clexg301o001e01tjbvu4n3v6": "voter-legendC",
  "cm8enoa9u00hs01s5ghebe02j": "voter-legendC-2020",
  "cm8enyly2006y01ry8hf38vcb": "voter-legendC-2024",
  "cm8erptki00yb01s5d6dk9f5t": "voter-legend-VD-CT",
  "cm8er28fc007x01ry7uxebczh": "voter-legend-VD-ZC",
  "cm8es0xzb003201s02l27cc6d": "voter-legend-VD-C",
  "clewoj4kq000501nzxujmb2ua": "income-legend",
  "clewnf117001a01pfv1micysu": "belowP-legend",
  "clevcmuzx00a101mgh3v8k4tv": "aboveP-legend",
  "cm8f2aaw700a501ry5tafeg40":"hs-legend",
  "cm8f246u000l701s59w596l5c":"bachelors-legend",
  "clewnra2m000701lnes3cxf9s": "disability-legend",
  "clewo1pjf000101o3e3dom768": "plus60-legend",
  "clewodoxw000401pjsyljoonj": "children-legend",
  "clexfewjc001801pbydx9y2ha": "white-legend",
  "clexf4tei000301pogtuiyqr4": "hl-legend",
  "clexf9z8d003v01trzgu99jha": "asian-legend",
  "clexfleuq003b01pgk110zhg6": "black-legend",
  "clexec5sf001901msxnv4lg37": "indian-legend",
};

function showCompareLegends(beforeValue, afterValue) {
  const beforeLegendId = legendMap[beforeValue] || "voter-legend";
  const afterLegendId = legendMap[afterValue] || "voter-legend";

  const beforeLegend = document.getElementById(beforeLegendId);
  const afterLegend = document.getElementById(afterLegendId);

  if (beforeLegend) {
    beforeLegend.style.display = "block";
    beforeLegend.classList.add("before-legend");
  }
  if (afterLegend) {
    afterLegend.style.display = "block";
    afterLegend.classList.add("after-legend");
  }
}

function updateLegend(layerId) {
  const legends = [
    "voter-legend", "voter-legend-2020", "voter-legend-2024", "voter-legendZC", "voter-legendZC-2020", "voter-legendZC-2024",
     "voter-legendC","voter-legendC-2020", "voter-legendC-2024", "voter-legend-VD-CT", "voter-legend-VD-ZC", "voter-legend-VD-C",
    "income-legend",
    "belowP-legend", "aboveP-legend","hs-legend", "bachelors-legend", "disability-legend", "plus60-legend",
    "children-legend", "white-legend", "hl-legend", "asian-legend",
    "black-legend", "indian-legend",
  ];
  legends.forEach(id => {
    const legend = document.getElementById(id);
    legend.style.display = (id === legendMap[layerId]) ? "block" : "none";
    legend.classList.remove("before-legend", "after-legend");
  });
}

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/civicnebraska/" + layerId);
    updateLegend(layerId);
  };
}

map.on("click", (e) => {
  const loader = map.getStyle().name;
  console.log(loader);
  if (loader !== "Zip_Code" && loader !== "County") {
    const features = map.queryRenderedFeatures(e.point, {});
    console.log(features);

    const properties = features[0].properties;
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