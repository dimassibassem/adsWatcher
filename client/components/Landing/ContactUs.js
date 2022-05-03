import ContactForm from "./Contact/ContactForm";
import ContactInformations from "./Contact/ContactInformations";

export default function ContactUs() {
    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto pt-10 pb-5 px-4 ">
                <div className="relative bg-white shadow-xl ">
                    <h2 className="sr-only">Contact us</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3">

                        <ContactInformations/>

                        <ContactForm/>
                    </div>
                </div>
            </div>
            <div className=" pb-5 px-4 ">
                <div
                    className="border-t border-gray-200  flex items-center justify-between mx-auto mt-16 max-w-7xl">
                    <p className="mt-8 text-base text-gray-400 ">
                        &copy; 2022 adsWatcher, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
