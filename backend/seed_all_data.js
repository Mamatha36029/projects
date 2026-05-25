require('dotenv').config({ path: __dirname + '/.env' });
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const PESTICIDE_DATA = {
  // Same as server.js
  "Apple___Apple_scab": [{ name: "Copper Fungicide", price: 450 }],
  "Apple___Black_rot": [{ name: "Sulfur Spray", price: 500 }],
  "Apple___Cedar_apple_rust": [{ name: "Myclobutanil", price: 550 }],
  "Tomato___Late_blight": [{ name: "Metalaxyl", price: 550 }],
  "Tomato___Leaf_Mold": [{ name: "Zineb", price: 400 }]
}; // We'll just generate the unique list like server.js does

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("No MONGODB_URI found.");
  process.exit(1);
}

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB for seeding...");
    const db = client.db('agrovision');

    // 1. Seed Encyclopedia
    console.log("Seeding Encyclopedia...");
    const encyPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'encyclopediaData.json');
    if (fs.existsSync(encyPath)) {
      const encyData = JSON.parse(fs.readFileSync(encyPath, 'utf8'));
      const encyCol = db.collection('encyclopedia');
      if (await encyCol.countDocuments() === 0) {
        await encyCol.insertMany(encyData);
        console.log(`Inserted ${encyData.length} encyclopedia records.`);
      } else {
        console.log("Encyclopedia already seeded.");
      }
    }

    // 2. Seed Pesticides
    console.log("Seeding Pesticides...");
    const pestCol = db.collection('pesticides');
    if (await pestCol.countDocuments() === 0) {
      // Just some sample pesticides
      const pests = [
        { name: "Copper Fungicide", price: 450, vendor: "AgroVision Certified", type: 'Powder' },
        { name: "Sulfur Spray", price: 500, vendor: "AgroVision Certified", type: 'Liquid' },
        { name: "Myclobutanil", price: 550, vendor: "AgroVision Certified", type: 'Liquid' },
        { name: "Metalaxyl", price: 550, vendor: "AgroVision Certified", type: 'Liquid' },
        { name: "Zineb", price: 400, vendor: "AgroVision Certified", type: 'Powder' },
        { name: "Chlorothalonil", price: 480, vendor: "AgroVision Certified", type: 'Liquid' }
      ];
      await pestCol.insertMany(pests);
      console.log(`Inserted ${pests.length} pesticide records.`);
    } else {
      console.log("Pesticides already seeded.");
    }

    // 3. Seed Datasets
    console.log("Seeding Datasets...");
    const dsCol = db.collection('datasets');
    if (await dsCol.countDocuments() === 0) {
      const datasets = [
        { id: 1, name: "Premium Pathology Dataset", price: 4500, vendor: "AgroVision Research" },
        { id: 2, name: "Tropical Crop Disease Map", price: 2800, vendor: "AgriTech Labs" }
      ];
      await dsCol.insertMany(datasets);
      console.log(`Inserted ${datasets.length} dataset records.`);
    } else {
      console.log("Datasets already seeded.");
    }

    console.log("All seeding complete! You can now see the collections (folders) in MongoDB Compass.");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();
