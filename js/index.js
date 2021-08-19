//set up base map
var mymap = L.map('mapid').setView([34.01712330775451, -118.26961622176387], 13);
var bounds = [
    [34.056659, -118.220425], //southwest
    [34.008636, -118.219770]
];

// L.tileLayer.provider('Stamen.TonerLite', {
//   id: 'mapbox.streets',
//   minZoom: 1,  
//   maxBounds: bounds,
//   trackResize: true,
//   accessToken: 'pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ'
//   }).addTo(mymap);
L.tileLayer('https://api.mapbox.com/styles/v1/madebyc/cjjp9qx7zahic2rthupyi6zzw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ').addTo(mymap);

var redIcon = L.icon({
  iconUrl: 'surveillance.svg',
  iconSize: [25, 25], // size of the icon
  });
var k_icon = L.icon({
  iconUrl: 'candle3.svg',
  iconSize: [35, 35], // size of the icon
});

var jesse_icon = L.icon({
  iconUrl: 'JESSE.png',
  iconSize: [35, 35], // size of the icon
});

  d3.csv('laser_zones.csv', function(error, data) {

    if (error) throw error;

    let divisionColor = "red";
    data.forEach(function(row) {
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
        case "HOLLENBACK": 
          divisionColor = "#7952B3";
          break;
        case "77th Street ":
          divisionColor = "#BD1616";
          break;
        case "Southeast":
          divisionColor = "#FFD523";
          break;
        default: 
          divisionColor = "red";
      }
      var bounds = JSON.parse((row['BOUNDS']))
      var polyline = L.polyline(bounds, {
        color: divisionColor,
        weight: 3,
        opacity: 1,
        lineJoin: 'round',
        fill: true,
      }).addTo(mymap);
      let divisionName = row['DIVISION'] + " "+ row['LASER ID']
      polyline.bindTooltip(divisionName, { direction: 'bottom', opacity: 1, permanent: false, className: "my-label", offset: [0, 0] });
      polyline.openPopup();

    }); //end for loop

}); //end d3

d3.csv('anchor_points.csv', function (error, data) {

  if (error) throw error;

  data.forEach(function (row) {
    let coordinates = row['COORDINATES'].split(',');
    if(coordinates[0] !== null && coordinates[1] != null) {
      let marker = L.marker([coordinates[0], coordinates[1]], {
        icon: redIcon
      }).addTo(mymap);

      marker.bindPopup(
        "<b>Division: </b>" + row['Division'] +
        "<br><b>Address: </b>" + row['AP Address'] +
        "<br><b>Type: </b>" + row['Property type'] +
        "<br><b>Details: </b>" + row['Property detail/name']
      , {autoClose: true});
      marker.addEventListener('mouseover', function() {
        marker.openPopup();
      })
      marker.addEventListener('mouseout', function () {
        marker.closePopup();
      })

    }
  }); //end for loop

}); //end d3

d3.csv('lapd_killings.csv', function (error, data) {

  if (error) throw error;

  data.forEach(function (row) {
    let x = row['LATITUDE '];
    let y = row['LONGITUDE'];
    let jesse = null;
    if (row['NAME'] === "Jesse Romero") {
      jesse = jesse_icon;
    }
    if ( x != null && y != null) {
      let k_marker = L.marker([x, y], {
        icon: jesse ? jesse_icon : k_icon,
      }).addTo(mymap);

      k_marker.bindPopup(
        "<b>Name: </b>" + row['NAME'] +
        "<br><b>Age: </b>" + row['AGE'] +
        "<br><b>Date: </b>" + row['DATE'] +
        "<br><b>Killer Officer Type: </b>" + row['OFFICER-TYPE'] +
        "<br><b>Division: </b>" + row['DIVISION'] + ( jesse ? "<br><img class='img-tooltip' src='JESSE_xs.jpg'/>" : "")
        
        );
      k_marker.addEventListener('mouseover', function () {
        k_marker.openPopup();
      })
    }
      
  
  }); //end for loop

}); //end d3
