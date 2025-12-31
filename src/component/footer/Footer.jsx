import React from "react";
import { Link } from "react-router-dom";
import {
  FaGamepad,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaGithub,
  FaSteam,
  FaTwitch,
  FaInstagram,
  FaReddit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Reviews", path: "/allreviews" },
    { name: "Add Review", path: "/addreview" },
    { name: "My Reviews", path: "/myreviews" },
    { name: "Watchlist", path: "/watchlist" },
  ];

  const categories = [
    "Action",
    "RPG",
    "Adventure",
    "Strategy",
    "Sports",
    "Racing",
    "Horror",
    "Indie",
    "Simulation",
    "MMO",
  ];

  const socialLinks = [
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaDiscord />,
      name: "Discord",
      url: "https://discord.com",
      color: "hover:text-indigo-400",
    },
    {
      icon: <FaYoutube />,
      name: "YouTube",
      url: "https://youtube.com",
      color: "hover:text-red-500",
    },
    {
      icon: <FaTwitch />,
      name: "Twitch",
      url: "https://twitch.tv",
      color: "hover:text-purple-500",
    },
    {
      icon: <FaSteam />,
      name: "Steam",
      url: "https://steam.com",
      color: "hover:text-gray-100",
    },
    {
      icon: <FaReddit />,
      name: "Reddit",
      url: "https://reddit.com",
      color: "hover:text-orange-500",
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com",
      color: "hover:text-gray-300",
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      url: "https://instagram.com",
      color: "hover:text-pink-500",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-slate-300 pt-12 pb-6 px-4 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <FaGamepad className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent">
                  GameReviews
                </h2>
                <p className="text-sm text-slate-400">Community Driven</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your ultimate destination for honest game reviews, ratings, and
              community discussions. Join thousands of gamers sharing their
              experiences and discovering new titles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-700/50">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 group"
                  >
                    <div className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Game Categories */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-700/50">
              Game Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 hover:text-white text-sm rounded-lg cursor-pointer transition-all duration-300 hover:border-purple-500/50"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-700/50">
              Connect With Us
            </h3>
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-lg">
                    <FaEnvelope className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Email</div>
                    <div className="text-white">support@gamereviews.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-lg">
                    <FaPhone className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Support</div>
                    <div className="text-white">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                <div className="grid grid-cols-4 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-xl text-slate-300 ${social.color} hover:bg-slate-700/50 transition-all duration-300 hover:scale-105`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} GameReviews. All rights reserved.
              <span className="mx-2">•</span>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="mx-2">•</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="mx-2">•</span>
              <Link
                to="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Community</span>
            </div>
            <span className="mx-2">•</span>
            <span>10K+ Active Gamers</span>
            <span className="mx-2">•</span>
            <span>100K+ Reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
