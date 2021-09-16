//set up base map
var mymap = L.map('mapid').setView([33.99357184171194, -118.27030284749365], 12.5);

// L.tileLayer.provider('Stamen.TonerLite', {
//   id: 'mapbox.streets',
//   minZoom: 1,  
//   maxBounds: bounds,
//   trackResize: true,
//   accessToken: 'pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ'
//   }).addTo(mymap);
L.tileLayer('https://api.mapbox.com/styles/v1/madebyc/cktg76z573z8q17n2a3lzlncr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ').addTo(mymap);
//L.tileLayer('https://api.mapbox.com/styles/v1/madebyc/cjjp9qx7zahic2rthupyi6zzw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ').addTo(mymap);
// https://api.mapbox.com/styles/v1/madebyc/cktg76z573z8q17n2a3lzlncr/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ
// https://api.mapbox.com/styles/v1/madebyc/cjjp9qx7zahic2rthupyi6zzw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ
var redIcon = L.icon({
  iconUrl: 'surveillance.svg',
  iconSize: [25, 25], // size of the icon
  });
var k_icon = L.icon({
  iconUrl: 'candle_final.png',
  iconSize: [35, 35], // size of the icon
});

var jesse_icon = L.icon({
  iconUrl: 'JESSE.png',
  iconSize: [35, 35], // size of the icon
});

let newton_laser = [];
let southwest_laser = [];
let harbor_laser = [];
let hollenbeck_laser = [];
let seventy_seven_laser = [];
let southeast_laser = [];
let central_laser = [];

function laser_zones() {
  d3.csv('laser_zones.csv', function (error, data) {

    if (error) throw error;

    let divisionColor = "#000";
    data.forEach(function (row) {
      switch (row['DIVISION']) {
        case "NEWTON":
          divisionColor = "#2D2424";
          break;
        case "SOUTHWEST":
          divisionColor = "#B85C38";
          break;
        case "HARBOR":
          divisionColor = "#002366";
          break;
        case "HOLLENBECK":
          divisionColor = "#7952B3";
          break;
        case "77th Street ":
          divisionColor = "#592e2d";
          break;
        case "Southeast":
          divisionColor = "#b59b00";
          break;
        default:
          divisionColor = "#b83838";
      }
      var bounds = JSON.parse((row['BOUNDS']))
      var polyline = L.polyline(bounds, {
        color: divisionColor,
        weight: 3,
        lineJoin: 'round',
        fill: true,
        fillOpacity: .10,
      }).addTo(mymap);
      let divisionName = row['DIVISION'] + " " + row['LASER ID']
      polyline.bindTooltip(divisionName, { direction: 'top', opacity: 1, permanent: false, className: "my-label", offset: [0, 0] });
      // if(row['DIVISION'] == "NEWTON") {
      //   console.log("here");
      //   laser = polyline;
      // }
      switch (row['DIVISION']) {
        case "NEWTON":
          newton_laser.push(polyline);
          break;
        case "SOUTHWEST":
          southwest_laser.push(polyline);
          break;
        case "HARBOR":
          harbor_laser.push(polyline);
          break;
        case "HOLLENBECK":
          hollenbeck_laser.push(polyline);
          break;
        case "77th Street ":
          seventy_seven_laser.push(polyline);
          break;
        case "Southeast":
          southeast_laser.push(polyline);
          break;
        default:
          central_laser.push(polyline);
      }
    }); //end for loop
    for (let i = 0; i < newton_laser.length; i++) {
      newton_laser[i].openTooltip();
    }

  }); //end d3
}

function anchor_points() {

  d3.csv('anchor_points.csv', function (error, data) {

    if (error) throw error;

    data.forEach(function (row) {
      let coordinates = row['COORDINATES'].split(',');
      if (coordinates[0] !== null && coordinates[1] != null) {
        let marker = L.marker([coordinates[0], coordinates[1]], {
          icon: redIcon
        }).addTo(mymap);

        marker.bindPopup(
          "<b>Division: </b>" + row['Division'] +
          "<br><b>Address: </b>" + row['AP Address'] +
          "<br><b>Type: </b>" + row['Property type'] +
          "<br><b>Details: </b>" + row['Property detail/name']
          , { autoClose: true });
        marker.addEventListener('mouseover', function () {
          marker.openPopup();
        })
        // marker.addEventListener('mouseout', function () {
        //   marker.closePopup();
        // })

      }
    }); //end for loop

  }); //end d3
}

function lapd_killings_stories() {
  d3.csv('lapd_killings.csv', function (error, data) {

    if (error) throw error;

    data.forEach(function (row) {
      let x = row['LATITUDE '];
      let y = row['LONGITUDE'];
      let jesse = null;
      if (row['NAME'] === "Jesse Romero") {
        jesse = jesse_icon;
      }
      if (x != null && y != null) {
        let k_marker = L.marker([x, y], {
          icon: jesse ? jesse_icon : k_icon,
        }).addTo(mymap);

        k_marker.bindPopup(
          "<b>Name: </b>" + row['NAME'] +
          "<br><b>Age: </b>" + row['AGE'] +
          "<br><b>Date: </b>" + row['DATE'] +
          "<br><b>Killer Officer Type: </b>" + row['OFFICER-TYPE'] +
          "<br><b>Division: </b>" + row['DIVISION'] + (jesse ? "<br><img class='img-tooltip' src='JESSE_xs.jpg'/>" : "")

        );
        k_marker.addEventListener('mouseover', function () {
          k_marker.openPopup();
        })
      }


    }); //end for loop

  }); //end d3
}

function csp_sites() {
  d3.csv('csp_sites.csv', function (error, data) {

    if (error) throw error;

    let divisionColor = "#183b7e";
    data.forEach(function (row) {
      var bounds = JSON.parse((row['Cordinates']))
      var polyline = L.polyline(bounds, {
        color: divisionColor,
        weight: 3,
        opacity: 1,
        lineJoin: 'round',
        fill: true,
        dashArray: '5,10',
        lineJoin: 'miter',
        lineCap: 'square'
      }).addTo(mymap);
      let divisionName = row['When deemed a CSP site? '] ? row['Site Name'] + " became CSP site in " + row['When deemed a CSP site? '] : row['Site Name'] + " CSP site";
      polyline.bindTooltip(divisionName, { direction: 'bottom', opacity: 1, permanent: false, className: "my-label", offset: [0, 0] });
      polyline.openPopup();

    }); //end for loop

  }); //end d3
}

function all_police_killings() {
  d3.csv('/data/los-angeles-police-killings.csv', function (error, data) {

    if (error) throw error;

    data.forEach(function (row) {

      let marker = L.circleMarker([row.y, row.x], { radius: '1', opacity: '0.7', color: '#000' }).addTo(mymap);

      marker.bindPopup(
        "<b>Cause of Death: </b>" + "Police " + row.cause +
        "<br><b>Name: </b>" + row.first + " " + row.middle + " " + row.last +
        "<br><b>Age: </b>" + row.age +
        "<br><b>Race: </b>" + row.race +
        "<br><b>Date: </b>" + row.death_date +
        "<br><b>Neighborhood: </b>" + row.neighborhood
        , { autoClose: true });
      marker.addEventListener('mouseover', function () {
        marker.openPopup();
      })

    }); //end for loop

  }); //end d3
}

function predpol_hotspots() {

  d3.csv('predpol_hotspots_2018.csv', function (error, data) {

    if (error) throw error;

    const counts = {};

    data.forEach(function (row) {

      let latlon = row.lat + " , " + row.lon;
      counts[latlon] = (counts[latlon] || 0) + 1;

    }); //end for loop

    const uniqueRow = [];
    data.forEach(function (row) {

      let latlon = row.lat + " , " + row.lon;
      if (uniqueRow.indexOf(latlon) === -1) {
        // console.log("WHAA");
        uniqueRow.push(latlon);
        // let marker = L.circleMarker([row.lat, row.lon], { radius: counts[latlon], opacity: '0.7', color: 'red' }).addTo(mymap);
        let marker = L.circleMarker([row.lat, row.lon], { stroke: true, weight: 1, radius: 10, fillOpacity: counts[latlon] / 20, color: 'red' }).addTo(mymap);
        // (counts[latlon] / 10).toFixed(2)

        marker.bindPopup(
          "<b>Address: </b>" + row.full_address +
          "<br><b>Date: </b>" + row.date +
          "<br><b>Code: </b>" + row.code +
          "<br><b>Number of times this address was labeled a hotspot: </b>" + counts[latlon]
          , { autoClose: true });
        marker.addEventListener('mouseover', function () {
          marker.openPopup();
        })
      }


    }); //end for loop

    // console.log(counts);
  }); //end d3
}

function load_layers() {
  laser_zones();
  csp_sites();
  predpol_hotspots();
  anchor_points();
  all_police_killings();
  lapd_killings_stories();
}

load_layers();