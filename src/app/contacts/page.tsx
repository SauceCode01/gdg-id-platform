"use client";
import { FaFacebook } from "react-icons/fa";
import Button from "@/components/Button";
import { IoIosPin } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
const ContactsPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen ">
      {/* content container */}
      <div className="w-full flex flex-col my-20 px-4 gap-8">
        {/* heading part */}
        <div className="flex flex-row justify-center items-center ">
          {/* sparky image */}
          <img
            src="/sites/contacts/sparkyOnCircle.png"
            alt="sparky "
            className="w-20 aspect-auto"
          />
          <div className="flex flex-col gap-2 ml-4">
            <h1 className="text-3xl sm:text-4xl font-bold   text-amber-400">
              Stay Connected
            </h1>
            <p className="  text-slate-600">Got a question? Let Sparky help.</p>
          </div>
        </div>

        {/* card  */}

        <div className="rounded-2xl max-w-xl shadow-lg mx-auto w-full">
          {/* info */}
          <div className="w-full rounded-tl-2xl rounded-tr-2xl border-2 border-amber-300 p-4 flex flex-col gap-4">
            <div className="font-bold text-2xl">Hi, I'm Sparky!</div>
            <div className="text-sm">
              Got a question, idea, or need help with your Digital ID? Drop me a
              message and I'll make sure the right people in our team get back
              to you.
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <IoIosPin /> <span className="font-bold">Address</span>
                <span>PUP A. Mabini Campus, Anonas St., Sta. Mesa, Manila</span>
              </div>
              <div className="flex flex-row gap-2">
                <IoIosPin /> <span className="font-bold">Contact</span>
                <span>+63 123456789</span>
              </div>
              <div className="flex flex-row gap-2">
                <IoIosPin /> <span className="font-bold">Email</span>
                <span>gdg.pupmnl@gmail.com</span>
              </div>
            </div>
          </div>

          {/* map  */}

          <div className="w-full aspect-4/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7490.792102567119!2d121.0014974154361!3d14.597931912463423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9e42d5f7275%3A0x569eb3406c633fbe!2sPolytechnic%20University%20of%20the%20Philippines%20-%20Institute%20of%20Technology!5e0!3m2!1sen!2sph!4v1759661054690!5m2!1sen!2sph"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* contact form */}
          <form
            className="w-full flex flex-col gap-4 p-4"
            onSubmit={handleSubmit}
          >
            {/* Row 1: Name and Email side by side */}
            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Row 2: Subject */}
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Row 3: Message */}
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>

            {/* Row 4: Submit button */}
            <Button
              type="submit"
              className="w-fit bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <CiLocationArrow1 />
              <span>Submit</span>
            </Button>

            {/* last row, socials */}

            <br />

            <div className="w-full flex flex-row justify-between items-center">
              <span>Follow us</span>
              <div className="flex flex-row gap-2">
                <FaFacebook />
                <FaFacebook />
                <FaFacebook />
                <FaFacebook />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactsPage;
