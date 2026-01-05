import React from "react";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const SocialShare = () => {
  const location = useLocation();
  const { someObject } = location.state || {};

  // Safely extract title and shareUrl from someObject
  const title = someObject?.title || "Check out this event!";
  const shareUrl = someObject?.shareUrl || window.location.href;

  return (
    <div className="h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300 p-2 flex justify-center items-center">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold text-center mb-4">Share this event</h2>
        <p className="text-center text-gray-600 mb-6">
          Spread the word on your favorite social networks!
        </p>
        <div className="flex justify-around items-center space-x-2">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            hashtag="#event"
            className="focus:outline-none"
          >
            <FacebookIcon size={48} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            hashtags={["event", "share"]}
            className="focus:outline-none"
          >
            <TwitterIcon size={48} round />
          </TwitterShareButton>

          <LinkedinShareButton
            url={shareUrl}
            title={title}
            className="focus:outline-none"
          >
            <LinkedinIcon size={48} round />
          </LinkedinShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=" - "
            className="focus:outline-none"
          >
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={title}
            body={`Check out this amazing event! ${shareUrl}`}
            className="focus:outline-none"
          >
            <EmailIcon size={48} round />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
