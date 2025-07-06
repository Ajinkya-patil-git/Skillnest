import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = ({ hideButtons = false }) => {
    return (
        <div className='mt-[130px] mb-10'>
            <div className='flex flex-col gap-5 items-center'>

                <div className='text-3xl lg:text-4xl font-semibold text-center'>
                    Your Swiss Knife for
                    <HighlightText text={" learning any language"} />
                </div>

                <div className='lg:text-center text-richblack-600 mx-auto text-base font-medium lg:w-[70%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                {/* Images removed as per user request */}

                {!hideButtons && (
                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                )}

            </div>
        </div>
    )
}

export default LearningLanguageSection
