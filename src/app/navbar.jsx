"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../../public/images/voidspark-logo.png";
import Image from "next/image";

const navItems = [
  { label: "About us", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "#" },
];

const BagIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9996 8C15.9996 9.06087 15.5782 10.0783 14.828 10.8284C14.0779 11.5786 13.0605 12 11.9996 12C10.9387 12 9.92131 11.5786 9.17116 10.8284C8.42102 10.0783 7.99959 9.06087 7.99959 8M3.63281 7.40138L2.93281 15.8014C2.78243 17.6059 2.70724 18.5082 3.01227 19.2042C3.28027 19.8157 3.74462 20.3204 4.33177 20.6382C5.00006 21 5.90545 21 7.71623 21H16.283C18.0937 21 18.9991 21 19.6674 20.6382C20.2546 20.3204 20.7189 19.8157 20.9869 19.2042C21.2919 18.5082 21.2167 17.6059 21.0664 15.8014L20.3664 7.40138C20.237 5.84875 20.1723 5.07243 19.8285 4.48486C19.5257 3.96744 19.0748 3.5526 18.5341 3.29385C17.92 3 17.141 3 15.583 3L8.41623 3C6.85821 3 6.07921 3 5.4651 3.29384C4.92433 3.5526 4.47349 3.96744 4.17071 4.48486C3.82689 5.07243 3.76219 5.84875 3.63281 7.40138Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
                className="flex items-center justify-center w-10 h-11 text-[#1d1d1f] hover:text-[#6e6e73] transition-colors duration-150"
                aria-label="Shopping bag"
              >
                <BagIcon />
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
                className="flex items-center justify-center w-9 h-11 text-[#1d1d1f]"
                aria-label="Bag"
              >
                <BagIcon />
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
