import React from 'react';

const FAQ = () => {
  return (
    <div className="flex flex-col items-center h-screen p-6 bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 text-center w-full">
        Frequently Asked Questions
      </h1>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl text-left">
        {/* Question 1 */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. How do I book tickets for an event?</h2>
          <p className="text-lg">You can book tickets by logging in, selecting the event you’re interested in, and following the booking process on the event page.</p>
        </div>

        {/* Question 2 */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Can I get a refund for a ticket?</h2>
          <p className="text-lg">Yes, you can request a refund based on the event’s refund policy. Visit the event page to see the refund options.</p>
        </div>

        {/* Question 3 */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. How can I contact customer support?</h2>
          <p className="text-lg">You can reach our support team via the provided phone number and email.</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center mt-8">
        <p className="text-xl font-bold ">
          Contact Us at:
        </p>
        <p className="text-lg">
          <strong>Email:</strong> support@localeventfinder.com
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> +1 123 456 7890
        </p>
        <p className="text-lg">
          <strong>Address:</strong> 123 Event Street, Event City, USA
        </p>
      </div>
    </div>
  );
};

export default FAQ;
