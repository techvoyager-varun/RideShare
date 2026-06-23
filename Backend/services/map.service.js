const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'RideShareApp/1.0'
      }
    });
    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        ltd: parseFloat(location.lat),
        lng: parseFloat(location.lon),
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    // OSRM requires coordinates, so we fetch them first using Nominatim
    const originCoords = await module.exports.getAddressCoordinate(origin);
    const destCoords = await module.exports.getAddressCoordinate(destination);

    const url = `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?overview=false`;

    const response = await axios.get(url);
    if (response.data.code === "Ok") {
      const route = response.data.routes[0];
      return {
        distance: {
          text: `${(route.distance / 1000).toFixed(1)} km`,
          value: route.distance, // meters
        },
        duration: {
          text: `${Math.round(route.duration / 60)} mins`,
          value: route.duration, // seconds
        },
        originCoords,
        destCoords,
      };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    input
  )}&format=json&addressdetails=1&limit=5`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'RideShareApp/1.0'
      }
    });
    if (response.data && response.data.length > 0) {
      return response.data
        .map((prediction) => prediction.display_name)
        .filter((value) => value);
    } else {
      // return empty array instead of throwing error to prevent UI from breaking on no results
      return [];
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius, vehicleType) => {
  // radius in km
  
  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, ltd], radius / 6371],
        },
      },
      "vehicle.type": vehicleType,
    });
    return captains;
  } catch (error) {
    throw new Error("Error in getting captain in radius: " + error.message);
  }
};
