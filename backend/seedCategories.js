const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('./models/category');

// Default categories
const defaultCategories = [
  {
    name: "Web Development",
    description: "Learn to build modern web applications using various technologies"
  },
  {
    name: "Mobile Development",
    description: "Create mobile apps for iOS and Android platforms"
  },
  {
    name: "Data Science",
    description: "Master data analysis, machine learning, and statistical modeling"
  },
  {
    name: "Artificial Intelligence",
    description: "Explore AI, machine learning, and deep learning concepts"
  },
  {
    name: "Cybersecurity",
    description: "Learn about network security, ethical hacking, and digital forensics"
  },
  {
    name: "Cloud Computing",
    description: "Master cloud platforms like AWS, Azure, and Google Cloud"
  },
  {
    name: "DevOps",
    description: "Learn CI/CD, containerization, and infrastructure automation"
  },
  {
    name: "Database Management",
    description: "Master SQL, NoSQL databases, and data modeling"
  },
  {
    name: "Programming Languages",
    description: "Learn various programming languages and their applications"
  },

];

async function seedCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert default categories
    const categories = await Category.insertMany(defaultCategories);
    console.log(`Successfully seeded ${categories.length} categories:`);
    
    categories.forEach(category => {
      console.log(`- ${category.name}: ${category.description}`);
    });

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories(); 