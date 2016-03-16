var React = require('react');

var Search = require('./Search');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');

var jsonfile = require('jsonfile')


var App = React.createClass({

	getInitialState(){

		// Extract the favorite locations from local storage

		var favorites = [];

		if(localStorage.favorites){
			favorites = JSON.parse(localStorage.favorites);
		}



		return {
			title: "",
			author: "",
			favorites: favorites,
			currentAddress: 'Wellington, New Zealand',
			mapCoordinates: {
				lat: -41.2889,
				lng: 174.7772
			}
		};
	},

	updatetitle: function (e) {
    this.setState({title: e.target.value})
  },

	updateauthor: function (e) {
    this.setState({author: e.target.value})
  },


	addToFavorites(address){



		var favorites = this.state.favorites;
		console.log("refs", this.refs.title.value, this.refs.title.author)
		favorites.push({
			address: address,
			timestamp: Date.now(),
			author: this.state.author,
			title: this.state.title,
			lat: this.state.mapCoordinates.lat,
			lng: this.state.mapCoordinates.lng
		});

		this.setState({
			favorites: favorites
		});

		localStorage.favorites = JSON.stringify(favorites);
	},




	searchForAddress(address){
		var title = this.refs.title
		console.log("title", title.value)
		
		var self = this;


		GMaps.geocode({
			address: address,
			callback: function(results, status) {

				if (status !== 'OK') return;

				var latlng = results[0].geometry.location;

				self.setState({
					currentAddress: results[0].formatted_address,
					mapCoordinates: {
						lat: latlng.lat(),
						lng: latlng.lng()
					}
				});

			}
		});

	},


	render(){

		return (

			<div>
				<h1>Books Around Wellington</h1>

				<Search onSearch={this.searchForAddress} />

				<Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
				<br />
				<p>Title</p><input type="text" ref="title" onChange={this.updatetitle} />
				<br />
				<p>Author</p><input type="text" ref="author" onChange={this.updateauthor} />
				<p></p>
				<CurrentLocation address={this.state.currentAddress} 
					// favorite={this.isAddressInFavorites(this.state.currentAddress)} 
					onFavoriteToggle={this.addToFavorites} />

				<LocationList locations={this.state.favorites} activeLocationAddress={this.state.currentAddress}
					onClick={this.searchForAddress} />

			</div>

		);
	}

});

module.exports = App;