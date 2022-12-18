mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGlrc2hhdyIsImEiOiJja3Z0N29sYW4wa2oxMzBrMzJka3poZHZlIn0.arENdYjPcc6s0z5lZHAinA';

const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 11 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

 new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
       new mapboxgl.Popup({offset:25})
         .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
         )
    )
    .addTo(map);