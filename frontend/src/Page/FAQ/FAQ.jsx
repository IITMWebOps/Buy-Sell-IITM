import React, { useState } from "react";
import firstone from "./../../assets/firstone.jpg";

function WelcomeMessage() {
  return (
    <div className="WelcomeMessage">
      <div
        className="header h-96 bg-cover bg-center flex flex-col items-center p-6 md:p-10 mx-4 md:mx-6 my-16 md:my-16 object-cover  rounded-none  w-screen"
        style={{ backgroundImage: `url(${firstone})` }}
      >
        <h1 className="header-title text-4xl md:text-5xl font-bold mb-2 mt-16 text-black">FAQ</h1>
        <p className="header-desc text-base md:text-lg text-center mt-2 text-amber-500">
          Frequently Asked Questions
        </p>
        <div className="search w-full md:w-3/4 h-12 bg-white mt-5  rounded-full flex justify-between p-1">
          <input
            className="w-3/4 md:w-4/5 h-full p-2 bg-transparent border-none text-base outline-none"
            type="text"
            placeholder="Search..."
          />
          <button className="w-1/4 md:w-1/5 min-w-max h-full bg-black text-white rounded-full hover:bg-gray-800">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

function Neck() {
  return (
    <div className="faq flex flex-col items-center justify-center p-3 text-center">
      <div className="faq-name w-full max-w-lg">
        <h1 className="text-2xl md:text-4xl font-bold">Have Questions?</h1>
        <img className="w-full h-auto mt-4" src="secondone.png" alt="FAQ" />
      </div>
    </div>
  );
}
const data = [
  {
    question: "What should I look for when buying a used product?",
    answer: "Check the overall condition of the product, including all its components. If possible, arrange to see the product in person and test it if applicable. Don't hesitate to ask the seller about the product's history and any maintenance it has undergone."
  },
  {
    question: "How do I contact the seller?",
    answer: "Each listing includes a contact form to reach the seller directly. Fill out the form with your inquiry, and the seller will respond to arrange a meeting or provide more information."
  },
  {
    question: "How do I list my product for sale?",
    answer: "To list your product, log in to your account and go to the 'Sell' section. Fill out the listing form with details about your product, including photos, description, price, and contact information. Your listing will be reviewed and published within 24 hours."
  },
  {
    question: "How should I price my product?",
    answer: "Consider the age, condition, and original price of the product. Research similar listings on the platform to gauge a competitive price. Be honest about the product's condition to ensure a fair deal for both parties."
  },
  {
    question: "How do I edit or remove my listing?",
    answer: "You can manage your listings through your account dashboard. From there, you can edit the details or remove the listing if the product is sold or you change your mind."
  },
  {
    question: "How do I ensure a safe transaction?",
    answer: "Always meet in a public place, preferably on campus, to exchange the product and payment. Avoid sharing personal information beyond what's necessary for the transaction. Consider bringing a friend along for added safety."
  },
  {
    question: "What payment methods are recommended?",
    answer: "Cash is often the simplest method for in-person transactions. If both parties agree, you can also use digital payment platforms like GPay, Paytm, PhonePe, etc."
  },
  {
    question: "Who can use this platform?",
    answer: "This platform is exclusively for current students, faculty, and staff of the institute. You must have a valid institute ID to create an account and participate in the exchange."
  },
  {
    question: "How do I sign up?",
    answer: "You can sign up using your institute email address. Simply click on the 'Sign Up' button on the homepage, enter your details, and verify your email to get started."
  },
  {
    question: "How do I find a product to buy?",
    answer: "Browse the listings by visiting the 'Buy Product' section. You can filter the results by price, type, condition, and location to find the perfect product for your needs."
  }
];


const FAQ = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center font-medium w-full p-4 md:p-6">
      <WelcomeMessage />
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-6 md:gap-8 mt-6">
        <Neck />
        <div className="accordion w-full md:w-1/2 p-4 border-l-2 border-gray-300">
          {data.map((item, index) => (
            <div key={index} className="mb-3 border-b border-gray-400 pb-2">
              <div
                className="flex justify-between items-center cursor-pointer text-lg font-semibold"
                onClick={() => toggle(index)}
              >
                <h2 className="text-base md:text-lg">{item.question}</h2>
                <span className="text-xl">{selected === index ? "-" : "+"}</span>
              </div>
              <div
                className={`text-gray-600 mt-2 transition-all duration-300 ${selected === index ? "block" : "hidden"}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
