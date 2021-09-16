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

    let central_li = document.getElementById('central');
    central_li.addEventListener('mouseover', function () {
      for (let i = 0; i < central_laser.length; i++) {
        central_laser[i].openTooltip();
        mymap.setView([34.04192210315219, -118.246022169184], 16);
      }
    });
    central_li.addEventListener('mouseout', function () {
      for (let i = 0; i < central_laser.length; i++) {
        central_laser[i].closeTooltip();
      }
    });

    let central_visible = true;
    central_li.addEventListener('click', function () {
        if (central_visible) {
          for (let i = 0; i < central_laser.length; i++) {
            mymap.removeLayer(central_laser[i]);
          }
          central_li.style.color = "grey";
          central_li.style.textDecoration = "line-through";
          central_visible = false;
        } else {
          for (let i = 0; i < central_laser.length; i++) {
            mymap.addLayer(central_laser[i]);
          }
          central_li.style = "";
          central_visible = true;
        }
    });
    
    let newton_li = document.getElementById('newton');
    newton_li.addEventListener('mouseover', function () {
      for (let i = 0; i < newton_laser.length; i++) {
        newton_laser[i].openTooltip();
        mymap.setView([33.994687, -118.280534], 14);
      }
    });
    newton_li.addEventListener('mouseout', function () {
      for (let i = 0; i < newton_laser.length; i++) {
        newton_laser[i].closeTooltip();
      }
    });

    let newton_visible = true;
    newton_li.addEventListener('click', function () {
      if (newton_visible) {
        for (let i = 0; i < newton_laser.length; i++) {
          mymap.removeLayer(newton_laser[i]);
        }
        newton_li.style.color = "grey";
        newton_li.style.textDecoration = "line-through";
        newton_visible = false;
      } else {
        for (let i = 0; i < newton_laser.length; i++) {
          mymap.addLayer(newton_laser[i]);
        }
        newton_li.style = "";
        newton_visible = true;
      }
    });

    let southwest_li = document.getElementById('southwest');
    southwest_li.addEventListener('mouseover', function () {
      for (let i = 0; i < southwest_laser.length; i++) {
        southwest_laser[i].openTooltip();
        mymap.setView([34.022805, -118.308963], 14);
      }
    });
    southwest_li.addEventListener('mouseout', function () {
      for (let i = 0; i < southwest_laser.length; i++) {
        southwest_laser[i].closeTooltip();
      }
    });

    let southwest_visible = true;
    southwest_li.addEventListener('click', function () {
      if (southwest_visible) {
        for (let i = 0; i < southwest_laser.length; i++) {
          mymap.removeLayer(southwest_laser[i]);
        }
        southwest_li.style.color = "grey";
        southwest_li.style.textDecoration = "line-through";
        southwest_visible = false;
      } else {
        for (let i = 0; i < southwest_laser.length; i++) {
          mymap.addLayer(southwest_laser[i]);
        }
        southwest_li.style = "";
        southwest_visible = true;
      }
    });

    let harbor_li = document.getElementById('harbor');
    harbor_li.addEventListener('mouseover', function () {
      for (let i = 0; i < harbor_laser.length; i++) {
        harbor_laser[i].openTooltip();
        mymap.setView([33.77645414152006, -118.27432207738882], 13);
      }
    });
    harbor_li.addEventListener('mouseout', function () {
      for (let i = 0; i < harbor_laser.length; i++) {
        harbor_laser[i].closeTooltip();
      }
    });

    let harbor_visible = true;
    harbor_li.addEventListener('click', function () {
      if (harbor_visible) {
        for (let i = 0; i < harbor_laser.length; i++) {
          mymap.removeLayer(harbor_laser[i]);
        }
        harbor_li.style.color = "grey";
        harbor_li.style.textDecoration = "line-through";
        harbor_visible = false;
      } else {
        for (let i = 0; i < harbor_laser.length; i++) {
          mymap.addLayer(harbor_laser[i]);
        }
        harbor_li.style = "";
        harbor_visible = true;
      }
    });

    let hollenbeck_li = document.getElementById('hollenbeck');
    hollenbeck_li.addEventListener('mouseover', function () {
      for (let i = 0; i < hollenbeck_laser.length; i++) {
        hollenbeck_laser[i].openTooltip();
        mymap.setView([34.043201, -118.201025], 13);
      }
    });
    hollenbeck_li.addEventListener('mouseout', function () {
      for (let i = 0; i < hollenbeck_laser.length; i++) {
        hollenbeck_laser[i].closeTooltip();
      }
    });

    let hollenbeck_visible = true;
    hollenbeck_li.addEventListener('click', function () {
      if (hollenbeck_visible) {
        for (let i = 0; i < hollenbeck_laser.length; i++) {
          mymap.removeLayer(hollenbeck_laser[i]);
        }
        hollenbeck_li.style.color = "grey";
        hollenbeck_li.style.textDecoration = "line-through";
        hollenbeck_visible = false;
      } else {
        for (let i = 0; i < hollenbeck_laser.length; i++) {
          mymap.addLayer(hollenbeck_laser[i]);
        }
        hollenbeck_li.style = "";
        hollenbeck_visible = true;
      }
    });

    let seventy_seven_li = document.getElementById('seventy-seven');
    seventy_seven_li.addEventListener('mouseover', function () {
      for (let i = 0; i < seventy_seven_laser.length; i++) {
        seventy_seven_laser[i].openTooltip();
        mymap.setView([33.982267068751, -118.29409151414029], 14);
      }
    });
    seventy_seven_li.addEventListener('mouseout', function () {
      for (let i = 0; i < seventy_seven_laser.length; i++) {
        seventy_seven_laser[i].closeTooltip();
      }
    });

    let seventy_seven_visible = true;
    seventy_seven_li.addEventListener('click', function () {
      if (seventy_seven_visible) {
        for (let i = 0; i < seventy_seven_laser.length; i++) {
          mymap.removeLayer(seventy_seven_laser[i]);
        }
        seventy_seven_li.style.color = "grey";
        seventy_seven_li.style.textDecoration = "line-through";
        seventy_seven_visible = false;
      } else {
        for (let i = 0; i < seventy_seven_laser.length; i++) {
          mymap.addLayer(seventy_seven_laser[i]);
        }
        seventy_seven_li.style = "";
        seventy_seven_visible = true;
      }
    });

    let southeast_li = document.getElementById('southeast');
    southeast_li.addEventListener('mouseover', function () {
      for (let i = 0; i < southeast_laser.length; i++) {
        southeast_laser[i].openTooltip();
        mymap.setView([33.92946745632624, -118.2543273461193], 14);
      }
    });
    southeast_li.addEventListener('mouseout', function () {
      for (let i = 0; i < southeast_laser.length; i++) {
        southeast_laser[i].closeTooltip();
      }
    });

    let southeast_visible = true;
    southeast_li.addEventListener('click', function () {
      if (southeast_visible) {
        for (let i = 0; i < southeast_laser.length; i++) {
          mymap.removeLayer(southeast_laser[i]);
        }
        southeast_li.style.color = "grey";
        southeast_li.style.textDecoration = "line-through";
        southeast_visible = false;
      } else {
        for (let i = 0; i < southeast_laser.length; i++) {
          mymap.addLayer(southeast_laser[i]);
        }
        southeast_li.style = "";
        southeast_visible = true;
      }
    });

  }); //end d3
}

function anchor_points() {

  d3.csv('anchor_points.csv', function (error, data) {

    if (error) throw error;

    let anchor_point = [];

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
        
        anchor_point.push(marker);
        marker.addEventListener('mouseover', function () {
          marker.openPopup();
        })
      }
    }); //end for loop
    let anchor_point_li = document.getElementById('anchor-point');
    anchor_point_li.addEventListener('mouseover', function () {
      mymap.setView([33.99357184171194, -118.27030284749365], 11);
    });

    let anchor_point_visible = true;
    anchor_point_li.addEventListener('click', function () {
      if (anchor_point_visible) {
        for (let i = 0; i < anchor_point.length; i++) {
          mymap.removeLayer(anchor_point[i]);
        }
        anchor_point_li.style.color = "grey";
        anchor_point_li.style.textDecoration = "line-through";
        anchor_point_visible = false;
      } else {
        for (let i = 0; i < anchor_point.length; i++) {
          mymap.addLayer(anchor_point[i]);
        }
        anchor_point_li.style = "";
        anchor_point_visible = true;
      }
    });

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

    let police_killings = [];
    data.forEach(function (row) {

      let marker = L.circleMarker([row.y, row.x], { radius: '1', opacity: '0.7', color: '#000' }).addTo(mymap);
      police_killings.push(marker);
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

    let police_killings_li = document.getElementById('police-killings');

    police_killings_li.addEventListener('mouseover', function () {
      mymap.setView([34.048854063902425, -118.2483245514302], 10);
    });

    let police_killings_visible = true;
    
    police_killings_li.addEventListener('click', function () {
      if (police_killings_visible) {
        for (let i = 0; i < police_killings.length; i++) {
          mymap.removeLayer(police_killings[i]);
        }
        police_killings_li.style.color = "grey";
        police_killings_li.style.textDecoration = "line-through";
        police_killings_visible = false;
      } else {
        for (let i = 0; i < police_killings.length; i++) {
          mymap.addLayer(police_killings[i]);
        }
        police_killings_li.style = "";
        police_killings_visible = true;
      }
    });
    
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

    let predpol = [];

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
        predpol.push(marker);
      }
      
    }); //end for loop
    let predpol_li = document.getElementById('predpol');
    predpol_li.addEventListener('mouseover', function () {
      mymap.setView([34.048854063902425, -118.2483245514302], 14);
    });

    let predpol_visible = true;
    predpol_li.addEventListener('click', function () {
      if (predpol_visible) {
        for (let i = 0; i < predpol.length; i++) {
          mymap.removeLayer(predpol[i]);
        }
        predpol_li.style.color = "grey";
        predpol_li.style.textDecoration = "line-through";
        predpol_visible = false;
      } else {
        for (let i = 0; i < predpol.length; i++) {
          mymap.addLayer(predpol[i]);
        }
        predpol_li.style = "";
        predpol_visible = true;
      }
    });

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