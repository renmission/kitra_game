const { Treasure, MoneyValue } = require('../models');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

exports.getTreasuresByDistanceAndPrize = async (req, res) => {
    const { latitude, longitude, distance, prizeValue } = req.query;

    if (!latitude || !longitude || !distance) {
        return res.status(400).send('Latitude, longitude, and distance are required');
    }

    const distanceInKm = parseInt(distance);
    if (![1, 10].includes(distanceInKm)) {
        return res.status(400).send('Distance must be either 1 or 10 km');
    }

    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);
    if (Number.isNaN(lat) || Number.isNaN(long)) {
        return res.status(400).send('Latitude and longitude must be valid numbers');
    }


    if (prizeValue) {
        const prizeValueInt = parseInt(prizeValue);
        if ( prizeValueInt.toString() !== prizeValue || prizeValueInt < 10 || prizeValueInt > 30) {
            return res.status(400).send('Prize value must be a whole number between $10 and $30');
        }
    }

    try {
        const treasures = await Treasure.findAll({
            include: [{
                model: MoneyValue,
                as: 'moneyValues'
            }]
        });

        const foundTreasures = treasures.filter(treasure => {
            const dist = calculateDistance(lat, long, treasure.latitude, treasure.longitude);
            if (dist > distanceInKm) return false;

            if (prizeValue) {
                const prizeValueInt = parseInt(prizeValue);
                return treasure.moneyValues.some(mv => mv.amt === prizeValueInt);
            }

            return true;
        });

        if (foundTreasures.length > 0) {
            res.status(200).json(foundTreasures);
        } else {
            res.status(404).send('No treasures found within the specified distance and prize value');
        }
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Something went wrong');
    }
};

exports.getlistTreasuresByProximity = async (req, res) => {
    const { latitude, longitude, distance } = req.query;

    if (!latitude || !longitude || !distance) {
        return res.status(400).send('Latitude, longitude, and distance are required');
    }

    const distanceInKm = parseFloat(distance);
    if (Number.isNaN(distanceInKm) || distanceInKm <= 0) {
        return res.status(400).send('Distance must be a positive number');
    }

    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);
    if (Number.isNaN(lat) || Number.isNaN(long)) {
        return res.status(400).send('Latitude and longitude must be valid numbers');
    }

    try {
        const treasures = await Treasure.findAll({
            include: [{
                model: MoneyValue,
                as: 'moneyValues'
            }]
        });

        const treasuresInfo = treasures.map(treasure => {
            const proximity = calculateDistance(lat, long, treasure.latitude, treasure.longitude);
            if (proximity <= distanceInKm) {
                const totalTreasure = treasure.moneyValues.reduce((sum, mv) => sum + mv.amt, 0);
                return {
                    name: treasure.name,
                    latitude: treasure.latitude,
                    longitude: treasure.longitude,
                    total: totalTreasure,
                    proximity
                };
            }
            return null;
        }).filter(treasure => treasure !== null)
          .sort((a, b) => a.proximity - b.proximity);

        res.status(200).json({ treasures: treasuresInfo });
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Something went wrong');
    }
};