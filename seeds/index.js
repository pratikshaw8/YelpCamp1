const mongoose=require('mongoose'); 
const Campground=require('../models/campground');
const cities = require('./cities');
const {places, descriptors}=require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;

db.on("error",console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("database connected");
})

const sample= (array)=>{
   return array[Math.floor(Math.random()*array.length)];
}

const seedDB =async () =>{
    await Campground.deleteMany({});    
    for(let i=0;i<300;i++)
    {
        const random1000=Math.floor(Math.random()*1000);
        const price= Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            author: '617f9896b8523989a637afb7',
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            geometry : {
              type: "Point",
              coordinates:[
                 cities[random1000].longitude,
                 cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dw9wvxduy/image/upload/v1636443064/YelpCamp/l2xkmizgqpm2hbumpstl.jpg',
                  filename: 'YelpCamp/l2xkmizgqpm2hbumpstl',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dw9wvxduy/image/upload/v1636443064/YelpCamp/mo02hu9chawqzbdsnvk9.jpg',
                  filename: 'YelpCamp/mo02hu9chawqzbdsnvk9',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dw9wvxduy/image/upload/v1636443064/YelpCamp/acqvamrvbl3gztpr3xzp.jpg',
                  filename: 'YelpCamp/acqvamrvbl3gztpr3xzp',
                  
                }
              ],
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dolorum natus maiores laudantium sit placeat amet quidem, esse voluptatem doloremque, cumque ex vel ad cupiditate exercitationem pariatur.',

            price

        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})