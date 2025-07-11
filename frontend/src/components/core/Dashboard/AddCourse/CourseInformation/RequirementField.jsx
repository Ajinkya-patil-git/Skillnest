import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { RiDeleteBin6Line } from 'react-icons/ri'

export default function RequirementsField({ name, label, register, setValue, errors, trigger }) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || [])
    }
  }, [editCourse, course])

  // Register the field with validation
  useEffect(() => {
    register(name, { 
      required: `${label} is required`,
      validate: (value) => {
        if (!value || !Array.isArray(value) || value.length === 0) {
          return `At least one ${label.toLowerCase()} is required`
        }
        return true
      }
    });
  }, [register, name, label])

  useEffect(() => {
    setValue(name, requirementsList, { shouldValidate: true })
    if (trigger) {
      trigger(name)
    }
  }, [requirementsList, name, setValue, trigger])

  // add instruction
  const handleAddRequirement = () => {
    if (requirement && !requirementsList.includes(requirement)) {
      const newRequirements = [...requirementsList, requirement]
      setRequirementsList(newRequirements)
      setRequirement("")
    }
  }

  // delete instruction
  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={`${name}-input`}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={`${name}-input`}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                <RiDeleteBin6Line className="text-pink-200 text-sm hover:scale-125 duration-200" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message || `${label} is required`}
        </span>
      )}
    </div>
  )
}