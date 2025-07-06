import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 mb-20 flex w-11/12 max-w-maxContent justify-center text-white">
        {/* Contact Details */}
        <div className="w-full max-w-2xl">
          <ContactDetails />
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default Contact