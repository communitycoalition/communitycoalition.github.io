//set up base map
var mymap = L.map('mapid').setView([33.99357184171194, -118.27030284749365], 12.5);

L.tileLayer('https://api.mapbox.com/styles/v1/madebyc/cktg76z573z8q17n2a3lzlncr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ').addTo(mymap);
// L.tileLayer('https://api.mapbox.com/styles/v1/madebyc/cktg7st2l3zy519qtb4qv7ifs/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ').addTo(mymap);

var redIcon = L.icon({
  iconUrl: 'anchor_point_icon.svg',
  iconSize: [20, 20], // size of the icon
  });

var jesse_icon = L.icon({
  iconUrl: 'JESSE.png',
  iconSize: [35, 35], // size of the icon
});

function laser_zones() {
  let newton_laser = [];
  let southwest_laser = [];
  let harbor_laser = [];
  let hollenbeck_laser = [];
  let seventy_seven_laser = [];
  let southeast_laser = [];
  let central_laser = [];

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
      polyline.bindTooltip(divisionName, { direction: 'top', opacity: 1, permanent: false, className: "tooltip-label", offset: [0, 0] });
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
        mymap.setView([33.994687, -118.280534], 13);
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
        mymap.setView([34.022805, -118.308963], 13);
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
        mymap.setView([33.982267068751, -118.29409151414029], 13);
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
        mymap.setView([33.92946745632624, -118.2543273461193], 13);
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

function lapd_zones() {
  var lapdDivisions = {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      properties: {
        name: "77th Street Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.314895, 34.003717], [-118.281062, 34.003781], [-118.280792, 33.974677], [-118.256267, 33.974772], [-118.256260, 33.960179], [-118.300288, 33.959494], [-118.300258, 33.950000], [-118.302401, 33.949994], [-118.302450, 33.945472], [-118.305180, 33.945465], [-118.305192, 33.941838], [-118.309016, 33.941834], [-118.309024, 33.938213], [-118.313386, 33.938213], [-118.313372, 33.945461], [-118.317737, 33.945464], [-118.317730, 33.970807], [-118.326570, 33.970787], [-118.326579, 33.967266], [-118.333065, 33.967248], [-118.335284, 33.981703], [-118.358603, 33.982023], [-118.352654, 33.983074], [-118.352680, 33.989313], [-118.337264, 33.988491], [-118.337281, 33.996308], [-118.317125, 33.995052], [-118.317109, 34.003708], [-118.314895, 34.003717]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Central Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.224382, 34.068510], [-118.230031, 34.047910], [-118.227132, 34.034538], [-118.238578, 34.034985], [-118.246754, 34.040698], [-118.250308, 34.037295], [-118.252704, 34.039471], [-118.261390, 34.029561], [-118.274380, 34.035454], [-118.271757, 34.044291], [-118.247543, 34.063723], [-118.251945, 34.074186], [-118.237911, 34.067985], [-118.226476, 34.079906], [-118.224382, 34.068510]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Devonshire Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.489638, 34.315143], [-118.467588, 34.289973], [-118.472080, 34.271832], [-118.473176, 34.221387], [-118.587129, 34.219961], [-118.593303, 34.228546], [-118.592521, 34.235459], [-118.605014, 34.235450], [-118.606456, 34.242696], [-118.621361, 34.242680], [-118.632438, 34.238571], [-118.633484, 34.269663], [-118.625027, 34.275207], [-118.607607, 34.277860], [-118.596168, 34.274617], [-118.591700, 34.280222], [-118.592661, 34.287214], [-118.588109, 34.302926], [-118.571755, 34.298611], [-118.568707, 34.294637], [-118.559799, 34.299190], [-118.554031, 34.296414], [-118.540819, 34.298813], [-118.547101, 34.313355], [-118.546310, 34.317339], [-118.534013, 34.314539], [-118.507347, 34.334636], [-118.502120, 34.323375], [-118.489638, 34.315143]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Foothill Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.382914, 34.294254], [-118.382367, 34.291515], [-118.386890, 34.291501], [-118.384642, 34.289733], [-118.385753, 34.284818], [-118.372654, 34.282839], [-118.373507, 34.286152], [-118.369830, 34.286134], [-118.371333, 34.282356], [-118.368901, 34.283258], [-118.367486, 34.280399], [-118.354751, 34.278869], [-118.351732, 34.278842], [-118.351711, 34.282482], [-118.326802, 34.282420], [-118.326874, 34.286113], [-118.299479, 34.286148], [-118.299311, 34.293212], [-118.286296, 34.292662], [-118.286695, 34.278335], [-118.273677, 34.278066], [-118.273588, 34.281718], [-118.238790, 34.281588], [-118.238901, 34.267088], [-118.256697, 34.267190], [-118.256500, 34.252265], [-118.266678, 34.250780], [-118.266873, 34.221847], [-118.337464, 34.221311], [-118.334543, 34.215618], [-118.339808, 34.211194], [-118.339929, 34.206505], [-118.405209, 34.208499], [-118.405915, 34.206305], [-118.410881, 34.224486], [-118.410382, 34.233427], [-118.442062, 34.264751], [-118.433920, 34.277588], [-118.417121, 34.290356], [-118.418635, 34.291769], [-118.415660, 34.293935], [-118.406159, 34.285933], [-118.401626, 34.286434], [-118.399773, 34.293420], [-118.397000, 34.293375], [-118.393628, 34.298783], [-118.382841, 34.296940], [-118.382914, 34.294254]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Harbor Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.281507, 33.866348], [-118.281473, 33.862732], [-118.290660, 33.858636], [-118.290650, 33.854155], [-118.285250, 33.854158], [-118.286188, 33.846343], [-118.299101, 33.846367], [-118.299099, 33.797685], [-118.264592, 33.799127], [-118.264631, 33.804552], [-118.256679, 33.804769], [-118.258608, 33.799433], [-118.237484, 33.800482], [-118.230047, 33.792543], [-118.223940, 33.806235], [-118.228504, 33.824375], [-118.226610, 33.829489], [-118.222438, 33.812447], [-118.222437, 33.804155], [-118.227614, 33.789948], [-118.220669, 33.782537], [-118.245449, 33.763889], [-118.240768, 33.758296], [-118.248962, 33.755901], [-118.232287, 33.714579], [-118.267081, 33.703658], [-118.282285, 33.709143], [-118.294444, 33.704601], [-118.297996, 33.709569], [-118.312749, 33.714555], [-118.317534, 33.713636], [-118.320587, 33.717533], [-118.333039, 33.721893], [-118.328475, 33.729423], [-118.321013, 33.729398], [-118.318531, 33.731988], [-118.320373, 33.735769], [-118.318449, 33.746843], [-118.309450, 33.746789], [-118.309087, 33.757728], [-118.300998, 33.757721], [-118.301883, 33.760511], [-118.309036, 33.760520], [-118.311656, 33.762878], [-118.308923, 33.774963], [-118.306428, 33.774958], [-118.309742, 33.781943], [-118.309245, 33.865693], [-118.299322, 33.865698], [-118.299140, 33.870532], [-118.294353, 33.870544], [-118.294507, 33.866468], [-118.298068, 33.865541], [-118.291686, 33.865527], [-118.290903, 33.872777], [-118.281567, 33.872765], [-118.281507, 33.866348]], [[-118.299098, 33.847288], [-118.297035, 33.847285], [-118.297047, 33.858181], [-118.299114, 33.858175], [-118.299098, 33.847288]], [[-118.299500, 33.744145], [-118.302989, 33.741607], [-118.302176, 33.739269], [-118.304140, 33.741607], [-118.309122, 33.741622], [-118.309144, 33.737833], [-118.296856, 33.737795], [-118.296828, 33.743398], [-118.299500, 33.744145]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Hollenbeck Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.176649, 34.112229], [-118.177996, 34.098596], [-118.155358, 34.098669], [-118.160663, 34.093499], [-118.160492, 34.075127], [-118.165301, 34.062290], [-118.192621, 34.061763], [-118.191417, 34.012868], [-118.222610, 34.014943], [-118.230031, 34.047910], [-118.224468, 34.067375], [-118.226476, 34.079906], [-118.210403, 34.087376], [-118.200316, 34.101578], [-118.192130, 34.103279], [-118.183672, 34.111368], [-118.176649, 34.112229]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Hollywood Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.309182, 34.127393], [-118.307204, 34.110623], [-118.309261, 34.105389], [-118.300561, 34.105396], [-118.300448, 34.083566], [-118.333128, 34.083470], [-118.333151, 34.087117], [-118.344066, 34.087088], [-118.343383, 34.094410], [-118.361640, 34.094536], [-118.361653, 34.097178], [-118.368202, 34.097979], [-118.381181, 34.092105], [-118.384378, 34.093723], [-118.386040, 34.091036], [-118.395844, 34.091054], [-118.396506, 34.096182], [-118.392084, 34.099054], [-118.390574, 34.109204], [-118.392894, 34.121068], [-118.387620, 34.123463], [-118.386167, 34.121398], [-118.375694, 34.121951], [-118.373985, 34.126699], [-118.371557, 34.126707], [-118.373362, 34.130975], [-118.361193, 34.128237], [-118.359409, 34.122924], [-118.353081, 34.119532], [-118.347551, 34.120228], [-118.342692, 34.116442], [-118.341842, 34.123313], [-118.346954, 34.128784], [-118.342229, 34.135300], [-118.309322, 34.135085], [-118.309182, 34.127393]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Mission Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.419990, 34.329165], [-118.418220, 34.329489], [-118.420744, 34.325586], [-118.414341, 34.324462], [-118.412187, 34.325921], [-118.413588, 34.329886], [-118.405189, 34.329818], [-118.404891, 34.322078], [-118.396265, 34.319876], [-118.396528, 34.317434], [-118.400743, 34.316465], [-118.400907, 34.309702], [-118.405465, 34.307936], [-118.405574, 34.300716], [-118.401036, 34.300683], [-118.401208, 34.297091], [-118.403447, 34.297102], [-118.403531, 34.293533], [-118.410359, 34.291999], [-118.407531, 34.287235], [-118.418566, 34.296449], [-118.421399, 34.294374], [-118.432571, 34.304686], [-118.456008, 34.284905], [-118.443808, 34.273378], [-118.435588, 34.279375], [-118.433791, 34.277686], [-118.442062, 34.264751], [-118.410382, 34.233427], [-118.409636, 34.219856], [-118.423109, 34.219853], [-118.426690, 34.207337], [-118.473234, 34.216506], [-118.472080, 34.271832], [-118.467646, 34.290282], [-118.489638, 34.315143], [-118.502120, 34.323375], [-118.507347, 34.334636], [-118.503800, 34.337304], [-118.492721, 34.330609], [-118.419990, 34.329165]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Newton Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.242284, 34.037541], [-118.238578, 34.034985], [-118.227132, 34.034538], [-118.222610, 34.014943], [-118.239760, 34.014794], [-118.237922, 33.989392], [-118.256304, 33.989491], [-118.256267, 33.974772], [-118.280792, 33.974677], [-118.280990, 34.014409], [-118.274498, 34.027614], [-118.274380, 34.035454], [-118.261390, 34.029561], [-118.252704, 34.039471], [-118.250308, 34.037295], [-118.246754, 34.040698], [-118.242284, 34.037541]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Northeast Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.301351, 34.158174], [-118.295446, 34.158800], [-118.291489, 34.155716], [-118.282664, 34.156768], [-118.275583, 34.153210], [-118.262355, 34.127689], [-118.254257, 34.118761], [-118.251143, 34.120973], [-118.253266, 34.124428], [-118.235219, 34.126725], [-118.236260, 34.134497], [-118.227937, 34.135609], [-118.228682, 34.146733], [-118.226229, 34.149792], [-118.210957, 34.146219], [-118.198193, 34.151637], [-118.198190, 34.149040], [-118.183763, 34.149076], [-118.184545, 34.145386], [-118.180406, 34.140989], [-118.185682, 34.138887], [-118.186099, 34.133743], [-118.180193, 34.126406], [-118.176540, 34.126594], [-118.176834, 34.123126], [-118.170412, 34.126936], [-118.165795, 34.125549], [-118.172381, 34.113960], [-118.183672, 34.111368], [-118.192130, 34.103279], [-118.200316, 34.101578], [-118.208871, 34.088657], [-118.221985, 34.083148], [-118.239814, 34.068242], [-118.260077, 34.077959], [-118.269491, 34.079778], [-118.280503, 34.092540], [-118.300479, 34.090831], [-118.300561, 34.105396], [-118.309261, 34.105389], [-118.307206, 34.110732], [-118.310751, 34.152566], [-118.322915, 34.152825], [-118.329029, 34.150219], [-118.322065, 34.155722], [-118.312898, 34.154007], [-118.309621, 34.161259], [-118.301351, 34.158174]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "North Hollywood Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.412985, 34.219865], [-118.409636, 34.219856], [-118.405915, 34.206305], [-118.405209, 34.208499], [-118.363209, 34.208461], [-118.362135, 34.201127], [-118.370143, 34.201061], [-118.370147, 34.196348], [-118.361148, 34.194648], [-118.354649, 34.164901], [-118.357158, 34.164839], [-118.357151, 34.161287], [-118.353100, 34.161289], [-118.345071, 34.142652], [-118.322915, 34.152825], [-118.310751, 34.152566], [-118.309322, 34.135085], [-118.342229, 34.135300], [-118.346954, 34.128784], [-118.341842, 34.123313], [-118.342541, 34.116448], [-118.347551, 34.120228], [-118.353081, 34.119532], [-118.359409, 34.122924], [-118.361193, 34.128237], [-118.372492, 34.131118], [-118.371557, 34.126707], [-118.373985, 34.126699], [-118.375694, 34.121951], [-118.386167, 34.121398], [-118.387620, 34.123463], [-118.397593, 34.119212], [-118.409087, 34.132845], [-118.414275, 34.134147], [-118.412153, 34.136796], [-118.413766, 34.146714], [-118.422495, 34.149376], [-118.413773, 34.150375], [-118.413777, 34.156741], [-118.405226, 34.156701], [-118.412348, 34.162289], [-118.413743, 34.186696], [-118.417540, 34.186688], [-118.427123, 34.203308], [-118.423109, 34.219853], [-118.412985, 34.219865]], [[-118.362233, 34.138637], [-118.358598, 34.139503], [-118.348770, 34.131396], [-118.343221, 34.138219], [-118.345064, 34.142448], [-118.357254, 34.143177], [-118.361143, 34.142712], [-118.362233, 34.138637]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Olympic Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.300448, 34.083566], [-118.300396, 34.076295], [-118.283057, 34.076134], [-118.284004, 34.037130], [-118.317689, 34.036720], [-118.316267, 34.050268], [-118.323844, 34.053070], [-118.317908, 34.061709], [-118.322851, 34.061823], [-118.320612, 34.073685], [-118.322702, 34.083502], [-118.300448, 34.083566]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Pacific Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.397113, 34.029136], [-118.390556, 34.031080], [-118.387729, 34.029074], [-118.405646, 34.016879], [-118.406958, 34.018592], [-118.421369, 34.010422], [-118.417349, 34.006578], [-118.421078, 34.004355], [-118.418164, 34.000665], [-118.420307, 33.998722], [-118.425888, 33.998081], [-118.428311, 34.001340], [-118.442454, 33.993594], [-118.443375, 33.995357], [-118.448389, 33.993334], [-118.446947, 33.990551], [-118.437092, 33.995317], [-118.430869, 33.989323], [-118.431191, 33.996378], [-118.419640, 33.997623], [-118.414360, 34.003659], [-118.405889, 33.999238], [-118.402755, 34.003484], [-118.399823, 34.001609], [-118.407876, 33.992127], [-118.401339, 33.986551], [-118.398765, 33.988122], [-118.394892, 33.983855], [-118.397637, 33.982063], [-118.386030, 33.976615], [-118.371811, 33.977230], [-118.371802, 33.983005], [-118.358479, 33.983044], [-118.370148, 33.981632], [-118.370122, 33.967993], [-118.372822, 33.967647], [-118.371240, 33.963370], [-118.378896, 33.958003], [-118.378878, 33.952556], [-118.370168, 33.952580], [-118.368373, 33.929021], [-118.378724, 33.929008], [-118.378732, 33.930905], [-118.428763, 33.930820], [-118.427660, 33.923583], [-118.422222, 33.919959], [-118.422224, 33.916328], [-118.429452, 33.916324], [-118.452409, 33.957072], [-118.461539, 33.962922], [-118.459660, 33.965924], [-118.461981, 33.970964], [-118.483344, 33.995510], [-118.443422, 34.016625], [-118.452731, 34.027692], [-118.429248, 34.031754], [-118.397113, 34.029136]], [[-118.454860, 33.986365], [-118.463283, 33.981001], [-118.451333, 33.964220], [-118.432270, 33.975012], [-118.441493, 33.983363], [-118.454860, 33.986365]], [[-118.413135, 33.981401], [-118.409031, 33.981333], [-118.413438, 33.985106], [-118.414871, 33.984244], [-118.413135, 33.981401]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Rampart Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.278775, 34.090944], [-118.269491, 34.079778], [-118.252056, 34.074315], [-118.247543, 34.063723], [-118.271162, 34.044884], [-118.273921, 34.038288], [-118.284004, 34.037130], [-118.283057, 34.076134], [-118.300396, 34.076295], [-118.300479, 34.090831], [-118.280812, 34.092552], [-118.278775, 34.090944]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Southeast Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.255899, 33.960166], [-118.253638, 33.943179], [-118.249177, 33.943175], [-118.247451, 33.954257], [-118.233898, 33.953269], [-118.233929, 33.948176], [-118.230499, 33.947087], [-118.234901, 33.946032], [-118.230168, 33.945999], [-118.228645, 33.939008], [-118.230238, 33.928914], [-118.254205, 33.929394], [-118.253594, 33.923095], [-118.282087, 33.923201], [-118.281567, 33.872765], [-118.290903, 33.872777], [-118.291665, 33.960034], [-118.255899, 33.960166]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Southwest Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.274064, 34.037519], [-118.274498, 34.027614], [-118.280797, 34.015686], [-118.281062, 34.003781], [-118.317109, 34.003708], [-118.317125, 33.995052], [-118.332190, 33.994962], [-118.331485, 34.001492], [-118.335699, 34.008117], [-118.341819, 34.004712], [-118.351334, 34.004713], [-118.357706, 33.997094], [-118.357780, 34.009133], [-118.365035, 34.005546], [-118.367169, 34.007090], [-118.366733, 34.015612], [-118.372645, 34.015824], [-118.373171, 34.011902], [-118.372747, 34.018359], [-118.377979, 34.018008], [-118.381314, 34.020564], [-118.377952, 34.021385], [-118.376237, 34.028574], [-118.371904, 34.029921], [-118.368439, 34.035068], [-118.274064, 34.037519]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Topanga Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.619139, 34.242687], [-118.606456, 34.242696], [-118.605014, 34.235450], [-118.592521, 34.235459], [-118.593303, 34.228546], [-118.587129, 34.219961], [-118.562281, 34.220347], [-118.562190, 34.172610], [-118.565895, 34.172296], [-118.565832, 34.163724], [-118.562256, 34.161810], [-118.566291, 34.153835], [-118.566952, 34.143073], [-118.570394, 34.139728], [-118.566224, 34.137691], [-118.565529, 34.130464], [-118.614975, 34.149268], [-118.614973, 34.147276], [-118.628990, 34.147271], [-118.638570, 34.157695], [-118.641271, 34.156784], [-118.639733, 34.159090], [-118.641975, 34.161975], [-118.645552, 34.161984], [-118.645534, 34.165695], [-118.654280, 34.165722], [-118.654264, 34.169427], [-118.658628, 34.169440], [-118.658588, 34.176750], [-118.668154, 34.176751], [-118.668141, 34.191331], [-118.657442, 34.189912], [-118.656605, 34.196757], [-118.668051, 34.194972], [-118.667796, 34.209331], [-118.662765, 34.209344], [-118.662742, 34.212899], [-118.653239, 34.212945], [-118.652375, 34.216419], [-118.658589, 34.216403], [-118.658529, 34.223494], [-118.654055, 34.223492], [-118.653291, 34.227556], [-118.649713, 34.227115], [-118.646974, 34.238082], [-118.631465, 34.237019], [-118.630372, 34.239261], [-118.619139, 34.242687]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Van Nuys Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.417253, 34.186684], [-118.413743, 34.186696], [-118.412110, 34.161603], [-118.405226, 34.156701], [-118.413777, 34.156741], [-118.413773, 34.150375], [-118.422495, 34.149376], [-118.413766, 34.146714], [-118.412153, 34.136796], [-118.414275, 34.134147], [-118.409897, 34.133560], [-118.408423, 34.130220], [-118.407116, 34.129503], [-118.406770, 34.128454], [-118.412457, 34.129511], [-118.415376, 34.126385], [-118.430004, 34.132096], [-118.443351, 34.130319], [-118.454880, 34.133060], [-118.459156, 34.130550], [-118.470781, 34.130079], [-118.475454, 34.126401], [-118.467942, 34.152728], [-118.467839, 34.175565], [-118.474151, 34.186649], [-118.473234, 34.216506], [-118.426690, 34.207337], [-118.426074, 34.199374], [-118.417253, 34.186684]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "West Los Angeles Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.453165, 34.132055], [-118.443351, 34.130319], [-118.430037, 34.132101], [-118.415376, 34.126385], [-118.414089, 34.129079], [-118.408175, 34.129588], [-118.403881, 34.127870], [-118.397491, 34.119140], [-118.391052, 34.119458], [-118.391731, 34.112422], [-118.399190, 34.111464], [-118.398672, 34.108752], [-118.401039, 34.108746], [-118.400889, 34.093997], [-118.405321, 34.096304], [-118.405409, 34.101461], [-118.408692, 34.101508], [-118.411767, 34.092258], [-118.413945, 34.094265], [-118.422690, 34.094270], [-118.422655, 34.090645], [-118.427039, 34.090629], [-118.426961, 34.083043], [-118.422780, 34.083093], [-118.423286, 34.075690], [-118.418443, 34.072309], [-118.406166, 34.052744], [-118.405922, 34.057105], [-118.383567, 34.057099], [-118.383436, 34.062937], [-118.377329, 34.062954], [-118.376150, 34.047148], [-118.378704, 34.031660], [-118.386417, 34.028896], [-118.390556, 34.031080], [-118.396637, 34.029119], [-118.429811, 34.031733], [-118.452731, 34.027692], [-118.477191, 34.046621], [-118.483815, 34.041554], [-118.494413, 34.050617], [-118.503972, 34.040727], [-118.507546, 34.040081], [-118.508593, 34.033063], [-118.517569, 34.025053], [-118.544992, 34.038400], [-118.556355, 34.037898], [-118.567142, 34.041400], [-118.570111, 34.047120], [-118.570394, 34.069347], [-118.599206, 34.074335], [-118.564647, 34.131437], [-118.557370, 34.126640], [-118.553797, 34.128667], [-118.552493, 34.125961], [-118.544336, 34.126607], [-118.539493, 34.131124], [-118.534774, 34.131666], [-118.521889, 34.127994], [-118.508595, 34.131138], [-118.503994, 34.127736], [-118.501907, 34.130708], [-118.501122, 34.128930], [-118.482631, 34.130623], [-118.477581, 34.126205], [-118.470601, 34.130128], [-118.453165, 34.132055]], [[-118.417401, 34.105433], [-118.409751, 34.105151], [-118.409736, 34.108853], [-118.417489, 34.112493], [-118.417401, 34.105433]], [[-118.459226, 34.050770], [-118.452256, 34.047129], [-118.448175, 34.049576], [-118.449110, 34.053337], [-118.445776, 34.055353], [-118.454790, 34.066724], [-118.459541, 34.065455], [-118.455080, 34.060304], [-118.458677, 34.058129], [-118.466772, 34.067692], [-118.467949, 34.060920], [-118.459226, 34.050770]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "West Valley Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.495862, 34.220971], [-118.473176, 34.221387], [-118.474151, 34.186649], [-118.467601, 34.171055], [-118.469593, 34.165674], [-118.468133, 34.151270], [-118.474924, 34.127077], [-118.477951, 34.126247], [-118.480276, 34.129759], [-118.490429, 34.131262], [-118.501122, 34.128930], [-118.501907, 34.130708], [-118.503994, 34.127736], [-118.508540, 34.131137], [-118.521889, 34.127994], [-118.534774, 34.131666], [-118.546540, 34.126031], [-118.553613, 34.126075], [-118.553820, 34.128672], [-118.557425, 34.126659], [-118.570394, 34.139728], [-118.566952, 34.143073], [-118.566291, 34.153835], [-118.562256, 34.161810], [-118.565832, 34.163724], [-118.565895, 34.172296], [-118.562190, 34.172610], [-118.562281, 34.220347], [-118.495862, 34.220971]]]] }
    }, {
      type: "Feature",
      properties: {
        name: "Wilshire Division",
      },
      geometry: { "type": "MultiPolygon", "coordinates": [[[[-118.372490, 34.086983], [-118.370979, 34.085461], [-118.366441, 34.088923], [-118.352800, 34.087143], [-118.352801, 34.088961], [-118.344073, 34.088895], [-118.344066, 34.087088], [-118.333151, 34.087117], [-118.333128, 34.083470], [-118.322702, 34.083502], [-118.320612, 34.073685], [-118.322851, 34.061823], [-118.317908, 34.061709], [-118.323844, 34.053070], [-118.316267, 34.050268], [-118.317689, 34.036720], [-118.359758, 34.033843], [-118.369576, 34.035101], [-118.378704, 34.031660], [-118.376155, 34.059601], [-118.372026, 34.063864], [-118.375809, 34.070051], [-118.390704, 34.072111], [-118.390718, 34.076501], [-118.377166, 34.076592], [-118.375169, 34.081936], [-118.370300, 34.080169], [-118.370302, 34.083157], [-118.377033, 34.083041], [-118.376951, 34.088629], [-118.372500, 34.090256], [-118.372490, 34.086983]]]] }
    }]
  };
  var layerStyle = { "stroke": true, "color": "#2960ff", "weight": 1, "fill": true, "fillOpacity": 0.03, }
  var onEachFeature = function (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.name);
    }
  };
  L.geoJSON(lapdDivisions, {style: layerStyle, onEachFeature: onEachFeature}).addTo(mymap);
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
        marker.addEventListener('mouseout', function () {
          marker.closePopup();
        })
      }
    }); //end for loop
    let anchor_point_li = document.getElementById('anchor-point');
    // anchor_point_li.addEventListener('mouseover', function () {
    //   mymap.setView([33.99357184171194, -118.27030284749365], 10);
    // });

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
  d3.csv('lapd_shootings_laser_zones.csv', function (error, data) {

    if (error) throw error;

    let jamar = [];
    let redel = [];
    let keith = [];
    let gilbert = [];
    let grechario = [];
    let jose = [];
    let robert = [];
    let richard = [];
    let jesse = [];
    let kenney = [];
    let daniel = [];
    

    data.forEach(function (row) {
      let x = row.lat
      let y = row.lon
      let k_marker;
      if (row['NAME'] === "Jesse Romero") {
        k_marker = L.marker([x, y], {
          icon: jesse_icon
        }).addTo(mymap);
      } else {
        k_marker = L.marker([x, y], { opacity: 0 });
        k_marker.bindTooltip(row['NAME'], {direction: 'center', opacity: 1, permanent: true, className: "say-their-name-label", offset: [0, 0] });
        k_marker.addTo(mymap);
        k_marker.openTooltip();
      }
      var customOptions =
      {
        'width': '50vw',
        'className': 'custom'
      }

      k_marker.bindPopup(
        "<h1>" + row['NAME'] + ", " + row['AGE'] +".</h1>" +
        "<b>" + row['ACCOUNT'] + "</b>" +
        "<br><b style='color:red'>Date: </b>" + row['DATE'] +
        "<br><b style='color:red'>LAPD Officer: </b>" + row['OFFICER'] +
        "<br><b style='color:red'>Address: </b>" + row['Address']
         , customOptions
      );
      
      k_marker.addEventListener('mouseover', function (e) {
        mymap.setView(e.target.getLatLng());
        k_marker.openPopup();
      });

      switch(row.key) {
        case "jamar-nicholson":
          jamar.push(k_marker);
          break;
        case "redel-kentel-jones":
          redel.push(k_marker);
          break;
        case "keith-myron-bursey-jr":
          keith.push(k_marker);
          break;
        case "gilbert-henry":
          gilbert.push(k_marker);
          break;
        case "grechario-tyzavian-mack":
          grechario.push(k_marker);
          break;
        case "jose-juan-mendez":
          jose.push(k_marker);
          break;
        case "robert-mark-diaz":
          robert.push(k_marker);
          break;
        case "richard-che-risher":
          richard.push(k_marker);
          break;
        case "jesse-james-romero":
          jesse.push(k_marker);
          break;
        case "kenney-watkins":
          kenney.push(k_marker);
          break;
        case "daniel-enrique-perez":
          daniel.push(k_marker);
          break;
      }

    }); //end for loop
    console.log(jamar[0].getLatLng());
    let jamar_li = document.getElementById('jamar');
    jamar_li.addEventListener('mouseover', function () {
      mymap.setView(jamar[0].getLatLng(), 15);
      jamar[0].openPopup();
    });
    jamar_li.addEventListener('mouseout', function () {
      jamar[0].closePopup();
    });

    let jamar_visible = true;
    jamar_li.addEventListener('click', function () {
      if (jamar_visible) {
        mymap.removeLayer(jamar[0]);
        jamar_li.style.color = "grey";
        jamar_li.style.textDecoration = "line-through";
        jamar_visible = false;
      } else {
        mymap.addLayer(jamar[0]);
        jamar_li.style = "";
        jamar_visible = true;
      }
    });

    let redel_li = document.getElementById('redel');
    redel_li.addEventListener('mouseover', function () {
      mymap.setView(redel[0].getLatLng(), 15);
      redel[0].openPopup();
    });
    redel_li.addEventListener('mouseout', function () {
      redel[0].closePopup();
    });

    let redel_visible = true;
    redel_li.addEventListener('click', function () {
      if (redel_visible) {
        mymap.removeLayer(redel[0]);
        redel_li.style.color = "grey";
        redel_li.style.textDecoration = "line-through";
        redel_visible = false;
      } else {
        mymap.addLayer(redel[0]);
        redel_li.style = "";
        redel_visible = true;
      }
    });

    let keith_li = document.getElementById('keith');
    keith_li.addEventListener('mouseover', function () {
      mymap.setView(keith[0].getLatLng(), 15);
      keith[0].openPopup();
    });
    keith_li.addEventListener('mouseout', function () {
      keith[0].closePopup();
    });

    let keith_visible = true;
    keith_li.addEventListener('click', function () {
      if (keith_visible) {
        mymap.removeLayer(keith[0]);
        keith_li.style.color = "grey";
        keith_li.style.textDecoration = "line-through";
        keith_visible = false;
      } else {
        mymap.addLayer(keith[0]);
        keith_li.style = "";
        keith_visible = true;
      }
    });

    let gilbert_li = document.getElementById('gilbert');
    gilbert_li.addEventListener('mouseover', function () {
      mymap.setView(gilbert[0].getLatLng(), 15);
      gilbert[0].openPopup();
    });
    gilbert_li.addEventListener('mouseout', function () {
      gilbert[0].closePopup();
    });

    let gilbert_visible = true;
    gilbert_li.addEventListener('click', function () {
      if (gilbert_visible) {
        mymap.removeLayer(gilbert[0]);
        gilbert_li.style.color = "grey";
        gilbert_li.style.textDecoration = "line-through";
        gilbert_visible = false;
      } else {
        mymap.addLayer(gilbert[0]);
        gilbert_li.style = "";
        gilbert_visible = true;
      }
    });

    let grechario_li = document.getElementById('grechario');
    grechario_li.addEventListener('mouseover', function () {
      grechario[0].openPopup();
    });
    grechario_li.addEventListener('mouseout', function () {
      grechario[0].closePopup();
    });

    let grechario_visible = true;
    grechario_li.addEventListener('click', function () {
      if (grechario_visible) {
        mymap.removeLayer(grechario[0]);
        grechario_li.style.color = "grey";
        grechario_li.style.textDecoration = "line-through";
        grechario_visible = false;
      } else {
        mymap.addLayer(grechario[0]);
        grechario_li.style = "";
        grechario_visible = true;
      }
    });

    let jose_li = document.getElementById('jose');
    jose_li.addEventListener('mouseover', function () {
      mymap.setView(jose[0].getLatLng(), 15);
      jose[0].openPopup();
    });
    jose_li.addEventListener('mouseout', function () {
      jose[0].closePopup();
    });

    let jose_visible = true;
    jose_li.addEventListener('click', function () {
      if (jose_visible) {
        mymap.removeLayer(jose[0]);
        jose_li.style.color = "grey";
        jose_li.style.textDecoration = "line-through";
        jose_visible = false;
      } else {
        mymap.addLayer(jose[0]);
        jose_li.style = "";
        jose_visible = true;
      }
    });

    let robert_li = document.getElementById('robert');
    robert_li.addEventListener('mouseover', function () {
      mymap.setView(robert[0].getLatLng(), 15);
      robert[0].openPopup();
    });
    robert_li.addEventListener('mouseout', function () {
      robert[0].closePopup();
    });

    let robert_visible = true;
    robert_li.addEventListener('click', function () {
      if (robert_visible) {
        mymap.removeLayer(robert[0]);
        robert_li.style.color = "grey";
        robert_li.style.textDecoration = "line-through";
        robert_visible = false;
      } else {
        mymap.addLayer(robert[0]);
        robert_li.style = "";
        robert_visible = true;
      }
    });

    // richard 
    let richard_li = document.getElementById('richard');
    richard_li.addEventListener('mouseover', function () {
      mymap.setView(richard[0].getLatLng(), 15);
      richard[0].openPopup();
    });
    richard_li.addEventListener('mouseout', function () {
      richard[0].closePopup();
    });

    let richard_visible = true;
    richard_li.addEventListener('click', function () {
      if (richard_visible) {
        mymap.removeLayer(richard[0]);
        richard_li.style.color = "grey";
        richard_li.style.textDecoration = "line-through";
        richard_visible = false;
      } else {
        mymap.addLayer(richard[0]);
        richard_li.style = "";
        richard_visible = true;
      }
    });

    // jesse
    let jesse_li = document.getElementById('jesse');
    jesse_li.addEventListener('mouseover', function () {
      mymap.setView(jesse[0].getLatLng(), 15);
      jesse[0].openPopup();
    });
    jesse_li.addEventListener('mouseout', function () {
      jesse[0].closePopup();
    });

    let jesse_visible = true;
    jesse_li.addEventListener('click', function () {
      if (jesse_visible) {
        mymap.removeLayer(jesse[0]);
        jesse_li.style.color = "grey";
        jesse_li.style.textDecoration = "line-through";
        jesse_visible = false;
      } else {
        mymap.addLayer(jesse[0]);
        jesse_li.style = "";
        jesse_visible = true;
      }
    });

    // kenney
    let kenney_li = document.getElementById('kenney');
    kenney_li.addEventListener('mouseover', function () {
      mymap.setView(kenney[0].getLatLng(), 15);
      kenney[0].openPopup();
    });
    kenney_li.addEventListener('mouseout', function () {
      kenney[0].closePopup();
    });

    let kenney_visible = true;
    kenney_li.addEventListener('click', function () {
      if (kenney_visible) {
        mymap.removeLayer(kenney[0]);
        kenney_li.style.color = "grey";
        kenney_li.style.textDecoration = "line-through";
        kenney_visible = false;
      } else {
        mymap.addLayer(kenney[0]);
        kenney_li.style = "";
        kenney_visible = true;
      }
    });

    // daniel
    let daniel_li = document.getElementById('daniel');
    daniel_li.addEventListener('mouseover', function () {
      mymap.setView(daniel[0].getLatLng(), 15);
      daniel[0].openPopup();
    });
    daniel_li.addEventListener('mouseout', function () {
      daniel[0].closePopup();
    });

    let daniel_visible = true;
    daniel_li.addEventListener('click', function () {
      if (daniel_visible) {
        mymap.removeLayer(daniel[0]);
        daniel_li.style.color = "grey";
        daniel_li.style.textDecoration = "line-through";
        daniel_visible = false;
      } else {
        mymap.addLayer(daniel[0]);
        daniel_li.style = "";
        daniel_visible = true;
      }
    });

  }); //end d3
}

function csp_sites() {

  let csp_sites = [];
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
      polyline.bindTooltip(divisionName, { direction: 'bottom', opacity: 1, permanent: false, className: "tooltip-label", offset: [0, 0] });
      polyline.openPopup();
      csp_sites.push(polyline);
    }); //end for loop

    let csp_li = document.getElementById('csp');
    csp_li.addEventListener('mouseover', function () {
      for (let i = 0; i < csp_sites.length; i++) {
        csp_sites[i].openTooltip();
        mymap.setView([33.99357184171194, -118.27030284749365], 12.5);
      }
    });
    csp_li.addEventListener('mouseout', function () {
      for (let i = 0; i < csp_sites.length; i++) {
        csp_sites[i].closeTooltip();
      }
    });

    let csp_visible = true;
    csp_li.addEventListener('click', function () {
      if (csp_visible) {
        for (let i = 0; i < csp_sites.length; i++) {
          mymap.removeLayer(csp_sites[i]);
        }
        csp_li.style.color = "grey";
        csp_li.style.textDecoration = "line-through";
        csp_visible = false;
      } else {
        for (let i = 0; i < csp_sites.length; i++) {
          mymap.addLayer(csp_sites[i]);
        }
        csp_li.style = "";
        csp_visible = true;
      }
    });

  }); //end d3
}

function all_police_killings() {

  let hide = [
  "redel-kentel-jones",
  "keith-myron-bursey-jr",
  "grechario-tyzavian-mack",
  "jose-juan-mendez",
  "robert-mark-diaz",
  "richard-che-risher",
  "jesse-james-romero",
  "kenney-watkins",
  "daniel-enrique-perez"
  ]
  d3.csv('/data/los-angeles-police-killings.csv', function (error, data) {

    if (error) throw error;

    let police_killings = [];
    data.forEach(function (row) {
      if (hide.indexOf(row.slug) == -1) {
        let marker = L.circleMarker([row.y, row.x], { radius: '1', opacity: '0.7', color: '#000' });
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
        // marker.addEventListener('mouseout', function () {
        //   // setTimeout(function () {
        //   marker.closePopup();
        //   // }, 1000);

        // })
      }
    }); //end for loop

    let police_killings_li = document.getElementById('police-killings');

    // police_killings_li.addEventListener('mouseover', function () {
    //   mymap.setView([34.048854063902425, -118.2483245514302], 10);
    // });
    police_killings_li.style.color = "grey";
    police_killings_li.style.textDecoration = "line-through";
    let police_killings_visible = false;

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
        uniqueRow.push(latlon);

        switch(row.full_address) {
          case "": 
          break;
        }
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

function mission_sheets() {

  d3.csv('/map/mission_sheets_data.csv', function (error, data) {

    if (error) throw error;
    var customOptions =
    {
      'width': '50vw',
      'className': 'mission'
    }
    data.forEach(function (row) {

      let marker = L.circleMarker([row.lat, row.lon], { stroke: true, weight: 4, radius: 25, fillOpacity: .60, color: '#000' }).addTo(mymap);
      let segments = null;
      if (row.mission_sheet_image.indexOf(',') != -1) {
        segments = row.mission_sheet_image.split(',');
        segments = "<img src='/map/" + segments[0] + "'/> <img src='/map/" + segments[1] + "'/>"
      }
      let mission_image = segments ? segments : "<img src='/map/" + row.mission_sheet_image + "'/>";

      marker.bindPopup(
        "<h1>LAPD MISSION SHEET</h1>" +
        "<b>Location: </b>" + row.location +
        "<br><b>Details: </b>" + row.details +
        mission_image,  customOptions
        );

      marker.addEventListener('mouseover', function (e) {
        marker.openPopup();
      });

    }); //end for loop
   
  }); //end d3
}

function load_layers() {
  laser_zones();
  lapd_zones();
  csp_sites();
  predpol_hotspots();
  anchor_points();
  all_police_killings();
  lapd_killings_stories();
  mission_sheets();
}

load_layers();