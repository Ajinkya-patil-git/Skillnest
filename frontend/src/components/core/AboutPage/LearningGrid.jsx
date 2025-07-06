import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "SkillNest provides a comprehensive learning management system where instructors can create and share their expertise, while students can enroll in courses and track their progress.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Our platform allows instructors to create courses tailored to current industry demands, ensuring students learn relevant and practical skills for today's job market.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "SkillNest offers structured learning with video lectures, organized sections, and progress tracking to help students learn at their own pace effectively.",
  },
  {
    order: 3,
    heading: "Course Management",
    description:
      "Instructors can easily create, edit, and manage their courses with our intuitive course builder, including video uploads and content organization.",
  },
  {
    order: 4,
    heading: "Rating & Reviews",
    description:
      "Students can rate and review courses they've completed, helping others make informed decisions about which courses to enroll in.",
  },
  {
    order: 5,
    heading: "Progress Tracking",
    description:
      "Track your learning journey with detailed progress monitoring, completed lectures tracking, and enrollment management for better learning outcomes.",
  },
];

const LearningGrid = () => {

  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                  ? "bg-richblack-800 h-[294px]"
                  : "bg-transparent"
              } ${card.order === 3 && "lg:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;