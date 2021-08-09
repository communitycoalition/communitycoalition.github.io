//set up base map
var mymap = L.map('mapid').setView([34.041581, -118.221645], 12);
var bounds = [
    [34.056659, -118.220425], //southwest
    [34.008636, -118.219770]
];

L.tileLayer.provider('Stamen.TonerLite', {
  id: 'mapbox.streets',
  minZoom: 1,  
  maxBounds: bounds,
  trackResize: false,
  accessToken: 'pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ'
  }).addTo(mymap);

var redIcon = L.icon({
  iconUrl: 'target.png',
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  shadowAnchor: [4, 62], // the same for the shadow
//   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
var k_icon = L.icon({
  iconUrl: 'marker.svg',
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  shadowAnchor: [4, 62], // the same for the shadow
  //   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

  d3.csv('laser_zones.csv', function(error, data) {

    if (error) throw error;

    data.forEach(function(row) {

      var bounds = JSON.parse((row['BOUNDS']))
      var polyline = L.polyline(bounds, {
        color: 'red',
        weight: 2,
        opacity: .7,
        lineJoin: 'round',
        fill: 'red',
      }).addTo(mymap);

      polyline.bindPopup(row['DIVISION'] + " DIVISION : " + row['LASER ID']);
      polyline.addEventListener('mouseover', function() {
        polyline.openPopup();
      })

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
      );
      marker.addEventListener('mouseover', function() {
        marker.openPopup();
      })
    }
  }); //end for loop

}); //end d3

d3.csv('lapd_killings.csv', function (error, data) {

  if (error) throw error;

  data.forEach(function (row) {
    let x = row['LATITUDE '];
    let y = row['LONGITUDE'];
    console.log(x, y);
    if ( x != null && y != null) {
      let k_marker = L.marker([x, y], {
        icon: k_icon
      }).addTo(mymap);

      k_marker.bindPopup(
        "<b>Name: </b>" + row['NAME'] +
        "<br><b>Age: </b>" + row['AGE'] +
        "<br><b>Date: </b>" + row['DATE'] +
        "<br><b>Killer Officer Type: </b>" + row['OFFICER-TYPE'] +
        "<br><b>Division: </b>" + row['DIVISION'] +
        "<br><b>Circumstances: </b>" + row['CIRCUMSTANCES']
      );
      k_marker.addEventListener('mouseover', function () {
        k_marker.openPopup();
      })
    }
      
  
  }); //end for loop

}); //end d3
