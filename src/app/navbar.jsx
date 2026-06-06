"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../../public/images/voidspark-logo.png";
import Image from "next/image";
import CustomerService from "../../public/images/customer-service.svg";

const navItems = [
  { label: "About us", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "#" },
];

// WhatsApp configuration
const WHATSAPP_NUMBER = "6285813495425"; // Replace with your actual WhatsApp number
const WHATSAPP_MESSAGE =
  "Halo VoidSpark, saya ingin bertanya tentang layanan editing/website";

const MenuIcon = () => (
  <svg width="20" height="14" viewBox="0 0 18 12" fill="currentColor">
    <rect y="0" width="18" height="1.5" rx="0.75" />
    <rect y="5.25" width="18" height="1.5" rx="0.75" />
    <rect y="10.5" width="18" height="1.5" rx="0.75" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path
      d="M1 1l12 12M13 1L1 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function AppleNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <div className="bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(255,255,255,0.85)] backdrop-blur-xl border-b border-black/10 shadow-sm"
            : "bg-[rgba(255,255,255,0.85)] backdrop-blur-xl"
        }`}
      >
        <div className="max-w-[1024px] mx-auto px-4">
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-between h-11 relative">
            <div className="absolute hidden h-11 items-center justify-between lg:flex">
              <Link
                href="/"
                className="flex items-center gap-3 px-2 text-[#1d1d1f] transition-colors duration-200 hover:text-[#6e6e73]"
              >
                <Image
                  src={logo}
                  alt="VoidSpark logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-sm font-bold tracking-tight">
                  VoidSpark
                </span>
              </Link>
            </div>

            <ul className="mx-auto flex items-center gap-0">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block px-[11px] text-[12px] leading-[44px] tracking-[0.01em] transition-colors duration-150 whitespace-nowrap ${
                      activeItem === item.label
                        ? "text-[#1d1d1f]"
                        : "text-[#1d1d1f] hover:text-[#6e6e73]"
                    }`}
                    onClick={() => setActiveItem(item.label)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="absolute right-0 flex items-center h-full">
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center w-10 h-11 text-[#1d1d1f] hover:text-[#6e6e73] transition-colors duration-150"
                aria-label="Customer Service"
              >
                <Image
                  src={CustomerService}
                  alt="Customer Service"
                  className="w-7 h-7"
                />
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center text-[#1d1d1f] px-1"
              aria-label="Home"
            >
              <Image src={logo} alt="logo" className="w-10 h-10" />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center w-9 h-11 text-[#1d1d1f]"
                aria-label="Customer Service"
              >
                <Image
                  src={CustomerService}
                  alt="Customer Service"
                  className="w-8 h-8"
                />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex items-center justify-center w-9 h-11 text-[#1d1d1f]"
                aria-label="Menu"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[rgba(255,255,255,0.95)] backdrop-blur-xl border-t border-black/10 px-5 pb-6">
            <ul className="pt-2">
              {navItems.map((item, i) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-[13px] text-[17px] font-light text-[#1d1d1f] hover:text-[#6e6e73] transition-colors"
                    style={{
                      borderBottom:
                        i < navItems.length - 1
                          ? "0.5px solid rgba(0,0,0,0.1)"
                          : "none",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      className="opacity-30"
                    >
                      <path
                        d="M1 1l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
