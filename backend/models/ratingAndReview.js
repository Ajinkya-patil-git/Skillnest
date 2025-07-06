const mongoose = require('mongoose')

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},

});

// Add compound index to ensure one rating per user per course
ratingAndReviewSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);