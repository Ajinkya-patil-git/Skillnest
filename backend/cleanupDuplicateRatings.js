const mongoose = require('mongoose');
const RatingAndReview = require('./models/ratingAndReview');
const Course = require('./models/course');
require('dotenv').config();

async function cleanupDuplicateRatings() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB');

        // Find all ratings
        const allRatings = await RatingAndReview.find({}).populate('course');
        console.log(`Total ratings found: ${allRatings.length}`);

        // Group by user and course
        const ratingGroups = {};
        const duplicates = [];

        allRatings.forEach(rating => {
            const key = `${rating.user}_${rating.course}`;
            if (!ratingGroups[key]) {
                ratingGroups[key] = [];
            }
            ratingGroups[key].push(rating);
        });

        // Find duplicates
        Object.keys(ratingGroups).forEach(key => {
            if (ratingGroups[key].length > 1) {
                duplicates.push(...ratingGroups[key].slice(1)); // Keep first, mark rest as duplicates
            }
        });

        console.log(`Found ${duplicates.length} duplicate ratings`);

        if (duplicates.length > 0) {
            // Remove duplicates
            const duplicateIds = duplicates.map(rating => rating._id);
            await RatingAndReview.deleteMany({ _id: { $in: duplicateIds } });
            console.log('Duplicate ratings removed successfully');
        }

        // Update course ratingAndReviews arrays to remove references to deleted ratings
        const courseIds = [...new Set(allRatings.map(rating => rating.course))];
        
        for (const courseId of courseIds) {
            const courseRatings = await RatingAndReview.find({ course: courseId });
            const ratingIds = courseRatings.map(rating => rating._id);
            
            // Update course to only include existing rating IDs
            await Course.findByIdAndUpdate(courseId, {
                ratingAndReviews: ratingIds
            });
        }

        console.log('Course ratingAndReviews arrays updated');

        console.log('Cleanup completed successfully');
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the cleanup
cleanupDuplicateRatings(); 