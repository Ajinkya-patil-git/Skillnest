const crypto = require('crypto');
require('dotenv').config();

const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require("../models/courseProgress")

const { default: mongoose } = require('mongoose')

// ================ capture the payment and Initiate the 'Rajorpay order' ================
exports.capturePayment = async (req, res) => {
    // extract courseId & userId
    const { coursesId } = req.body;
    const userId = req.user.id;

    if (!coursesId || coursesId.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide Course Id" });
    }

    // For simplified setup - directly enroll without payment
    try {
        const result = await enrollStudents(coursesId, userId);
        return res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        console.log("Enrollment error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// ================ verify the payment ================
exports.verifyPayment = async (req, res) => {
    // Payment verification disabled for simplified setup
    return res.status(200).json({ 
        success: true, 
        message: "Payment verification disabled - courses are free" 
    });
}

// ================ enroll Students to course after payment ================
const enrollStudents = async (courses, userId) => {
    if (!courses || !userId) {
        throw new Error("Please Provide data for Courses or UserId");
    }

    const results = [];
    
    for (const courseId of courses) {
        try {
            // Check if user is already enrolled
            const existingEnrollment = await Course.findOne({
                _id: courseId,
                studentsEnrolled: userId
            });

            if (existingEnrollment) {
                results.push({ courseId, status: 'already_enrolled', message: 'Already enrolled in this course' });
                continue;
            }

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            )

            if (!enrolledCourse) {
                results.push({ courseId, status: 'error', message: 'Course not Found' });
                continue;
            }

            // Initialize course progress with 0 percent
            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            })

            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            )

            results.push({ courseId, status: 'success', message: 'Successfully enrolled' });

            // Email notification disabled
            // const emailResponse = await mailSender(
            //     enrolledStudent.email,
            //     `Successfully Enrolled into ${enrolledCourse.courseName}`,
            //     courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            // )
        }
        catch (error) {
            console.log("Error enrolling in course:", courseId, error);
            results.push({ courseId, status: 'error', message: error.message });
        }
    }

    const successCount = results.filter(r => r.status === 'success').length;
    const alreadyEnrolledCount = results.filter(r => r.status === 'already_enrolled').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    let message = '';
    if (successCount > 0) {
        message += `Successfully enrolled in ${successCount} course(s). `;
    }
    if (alreadyEnrolledCount > 0) {
        message += `Already enrolled in ${alreadyEnrolledCount} course(s). `;
    }
    if (errorCount > 0) {
        message += `Failed to enroll in ${errorCount} course(s).`;
    }

    return { message: message.trim() || 'Enrollment completed' };
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    // Email sending disabled for simplified setup
    return res.status(200).json({ 
        success: true, 
        message: "Payment success email disabled" 
    });
}