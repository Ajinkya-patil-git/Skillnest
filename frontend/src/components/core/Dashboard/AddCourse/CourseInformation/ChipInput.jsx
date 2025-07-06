import { useEffect, useState } from "react"

import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

// Defining a functional component ChipInput
export default function ChipInput({ label, name, placeholder, register, errors, setValue, trigger, watch }) {
  const { editCourse, course } = useSelector((state) => state.course)

  // Setting up state for managing chips array
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || [])
    } else {
      setChips([])
    }
  }, [editCourse, course])

  // Register the field with validation
  useEffect(() => {
    register(name, { 
      required: "Tags are required",
      validate: (value) => {
        if (!value || !Array.isArray(value) || value.length === 0) {
          return "At least one tag is required"
        }
        return true
      }
    });
  }, [register, name])

  // Updates value whenever 'chips' is modified
  useEffect(() => {
    setValue(name, chips, { shouldValidate: true })
    // Trigger validation after setting value
    if (trigger) {
      setTimeout(() => trigger(name), 100)
    }
  }, [chips, name, setValue, trigger])

  // Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  // Render the component
  return (
    <div className="flex flex-col space-y-2">

      <label className="text-sm text-richblack-5" htmlFor={`${name}-input`}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {chips?.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}

            {/* delete chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}


        <input
          id={`${name}-input`}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message || `${label} is required`}
        </span>
      )}
    </div>
  )
}