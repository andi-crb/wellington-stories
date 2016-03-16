var React = require('react');
var fs = require('fs');
var jsonfile = require('jsonfile');
var util = require('util');


var Map = React.createClass({

	componentDidMount(){

		this.componentDidUpdate();
	},

	componentDidUpdate(){

		if(this.lastLat == this.props.lat && this.lastLng == this.props.lng){

			return;
		}

		this.lastLat = this.props.lat;
		this.lastLng = this.props.lng

		var map = new GMaps({
			el: '#map',
			lat: this.props.lat,
			lng: this.props.lng,
		});

// Adds a marker at the current location
		map.addMarker({
			lat: this.props.lat,
			lng: this.props.lng
		});

// Adds a marker for each book in the local storage

		var storage = JSON.parse(localStorage.favorites)

		var file = '../data/db.json'
		fs.readFile(file, function(err, obj) {
		  console.log(obj)
		})

		for (i = 0; i < storage.length; i++){
			map.addMarker({
				lat: storage[i].lat,
				lng: storage[i].lng,
			});
		}
	},






	render(){

		return (
			<div className="map-holder">
				<p>Loading...</p>
				<div id="map"></div>
			</div>
		);
	}

});

module.exports = Map;