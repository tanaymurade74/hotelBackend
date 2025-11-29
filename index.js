const {initializeDatabase} = require("./db/db.connect")
const express = require("express")
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());


const Hotel = require("./models/hotel.models");
const hotel = require("./models/hotel.models");
const { findByIdAndDelete } = require("../BE2.1HW1/models/restaurant.models");

initializeDatabase();



async function getAllHotels(){
    try{
        const hotels = await Hotel.find();
        console.log(hotels);
        return hotels;
    }catch(error){
        throw error;
    }
}

async function getByName(name){
    try{
        const hotel = await Hotel.findOne({name: name});
        return hotel;
    }catch(error){
        throw error;
    }
}

async function getByPhoneNumber(number){
    try{
        const hotel = await Hotel.findOne({phoneNumber: number});
        return hotel;
    }catch(error){
        throw error;
    }
}

async function getByRating(rating){
    try{
        const hotels = await Hotel.find({rating: rating});
        return hotels;
    }catch(error){
        throw error;
    }
}

async function getByCategory(category){
    try{
        const hotels = await Hotel.find({category: category})
        return hotels;
    }catch(error){
        throw error;
    }
}

async function createHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveHotel = await hotel.save();
        return saveHotel;
    }catch(error){
        throw error;
    }
}

async function deleteById(id){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        return deletedHotel;
    }catch(error){
        throw error;
    }
}

async function updateById(id, dataToUpdate){
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(id, dataToUpdate, {new: true});
        return updatedHotel;
    }catch(error){
        throw error;
        
    }
}

app.post("/hotels/:hotelId", async (req, res)=>{
    try{
        const updatedHotel = await updateById(req.params.hotelId, req.body);
        if(!updatedHotel){
            res.status(404).json({error: "Hotel not found."})
        }else{
            res.status(200).json({message: "Hotel has been updated.", hotel: updatedHotel})
        }
    }catch{
        res.status(500).json({error: "Failed to updated the Hotel"});
    }
})

app.delete("/hotels/:hotelId", async (req, res)=>{
    try{
        const deletedHotel = await deleteById(req.params.hotelId);
        res.status(200).json({message: "Hotel has been deleted.", hotel: deletedHotel});
    }catch(error){
        res.status(500).json({error: "Error while deleting the hotel."})
    }
})
app.post("/hotels", async (req, res)=>{
    try{
        const hotel = await createHotel(req.body);
        res.status(200).json({message: "Hotel has been added.", hotel: hotel});
    }catch{
        res.status(500).json({error : "Failed to add hotel"})
    }
})

app.get("/hotels", async (req, res)=>{
   try{
    const hotels = await getAllHotels();
    res.status(200).json(hotels);
   }catch{
       res.status(500).json({error: "Failed to fetch data."})
   }
})

app.get("/hotels/:hotelName", async (req, res)=>{
    try{
        const hotel = await getByName(req.params.hotelName);
        res.status(200).json(hotel);
    }catch{
        res.status(500).json({error: "Failed to fetch the data"})
    }
})

app.get("/hotels/directory/:phoneNumber", async (req, res)=>{
    try{
        const hotel = await getByPhoneNumber(req.params.phoneNumber)
        res.status(200).json(hotel)
    }catch{
        res.status(500).json({error: "Failed to fetch the data"})
    }
})

app.get("/hotels/rating/:hotelRating", async (req, res)=>{
    try{
        const hotels = await getByRating(req.params.hotelRating)
        res.status(200).json(hotels)
    }catch{
        res.status(500).json({error: "Failed to fetch data"})
    }
})

app.get("/hotels/category/:hotelCategory", async (req, res)=>{
    try{
        const hotels = await getByCategory(req.params.hotelCategory)
        res.status(200).json(hotels);
    }catch{
        res.status(500).json({error : "Failed to fetch data"})
    }
})

const PORT =3000;
app.listen(PORT, ()=>{
    console.log("Server running on port 3000");
})