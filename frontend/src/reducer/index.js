import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import courseReducer from "../slices/courseSlice"
import profileReducer from "../slices/profileSlice"
import viewCourseReducer from "../slices/viewCourseSlice"

import sidebarSlice from "../slices/sidebarSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  course: courseReducer,
  viewCourse: viewCourseReducer,
  sidebar: sidebarSlice
})

export default rootReducer
