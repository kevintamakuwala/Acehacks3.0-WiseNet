import React from 'react'
import { AiOutlineHome} from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

function Contact() {
  return (
  <section className='z-10 overflow-hidden bg-[#FAFAFA] py-10 dark:bg-dark lg:py-[50px]'>
       <div className="container">
          <div className="flex flex-col lg:flex-row mx-auto">
            <div className="w-full lg:w-1/2 lg:ml-12 mb-8 lg:mb-0">
              <div className="max-w-[570px] mx-auto">
                <h2 className="mb-6 text-[32px] ml-4 font-bold  text-dark dark:text-gray-200 sm:text-[40px] lg:text-[36px] xl:text-[40px] ">
                  Contact Us
                </h2>
                <p className="mb-6 ml-4 mr-4 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Want to get in touch? We'd love to hear from you. Here's how you can reach us.
                </p>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 ml-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <AiOutlineHome style={{ height: '30px', width: '30px', color: 'blue' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      702-Caspia Bloosam Aura Residency, DDIT Road, Nadiad
                    </p>
                  </div>
                </div>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 ml-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <FiPhoneCall  style={{ height: '30px', width: '30px', color: 'blue' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Phone Number
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                       (+91) 81414 25798
                    </p>
                  </div>
                </div>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 ml-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <MdOutlineMail style={{ height: '30px', width: '30px', color: 'blue' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Email Address
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      info@yourdomain.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg bg-white p-6 sm:p-8 shadow-lg dark:bg-dark-2 border-spacing-1">
                <form>
                  <ContactInputBox
                    type="text"
                    name="name"
                    placeholder="Your Name"
                  />
                  <ContactInputBox
                    type="text"
                    name="email"
                    placeholder="Your Email"
                  />
                  <ContactInputBox
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                  />
                  <ContactTextArea
                    rows="6"
                    placeholder="Your Message"
                    name="details"
                    defaultValue=""
                  />
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  </section>
  )
}

export default Contact;

const ContactTextArea = ({ row, placeholder, name, defaultValue }) => {
  return (
    <>
      <div className="mb-6">
        <textarea
          rows={row}
          placeholder={placeholder}
          name={name}
          className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

const ContactInputBox = ({ type, placeholder, name }) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
      </div>
    </>
  );
};