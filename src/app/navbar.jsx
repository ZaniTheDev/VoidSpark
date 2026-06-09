"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../../public/images/voidspark-logo.png";
import Image from "next/image";
import CustomerService from "../../public/images/customer-service.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }
      // Scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 10);
    };

    window.addEventListener("scroll", controlNavbar);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );
    setIsModalOpen(false);
  };

  const handleCustomerServiceClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
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
                onClick={handleCustomerServiceClick}
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
                onClick={handleCustomerServiceClick}
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

      {/* WhatsApp Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-0 gap-0 overflow-hidden rounded-[20px] max-w-[340px] border-0 shadow-2xl">
          {/* Header band */}
          <div className="bg-[#f5f5f7] px-6 pt-6 pb-5 border-b border-black/[0.08] text-center">
            <div className="relative w-14 h-14 mx-auto mb-[14px]">
              <div className="w-14 h-14 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white text-base font-semibold tracking-wide">
                VS
              </div>
              <span className="absolute bottom-[1px] right-[1px] w-[13px] h-[13px] bg-[#34c759] rounded-full border-2 border-[#f5f5f7]" />
            </div>
            <DialogTitle className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight mb-[3px]">
              VoidSpark Support
            </DialogTitle>
            <DialogDescription className="text-[12px] text-[#6e6e73]">
              Web Design & Video Editing
            </DialogDescription>
            <div className="inline-flex items-center gap-[5px] mt-2 bg-[#34c759]/[0.12] rounded-full px-[10px] py-[3px]">
              <span className="w-[5px] h-[5px] bg-[#34c759] rounded-full" />
              <span className="text-[11.5px] font-medium text-[#1d7a35]">
                Online sekarang
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 pt-[18px] pb-0">
            <p className="text-[13px] text-[#3d3d3f] leading-[1.55] text-center mb-[14px]">
              Kamu akan diarahkan ke WhatsApp untuk berbicara langsung dengan
              tim kami.
            </p>
            <div className="flex items-center gap-2 bg-[#f5f5f7] rounded-[10px] px-3 py-[9px] mb-4">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6e6e73"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[12px] text-[#6e6e73]">
                Rata-rata balas dalam{" "}
                <strong className="text-[#1d1d1f] font-medium">~5 menit</strong>
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 flex flex-col gap-2">
            <Button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#1d1d1f] hover:bg-[#333] text-white rounded-xl h-[46px] text-[14px] font-medium tracking-tight border-0"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Chat di WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="w-full h-[42px] rounded-xl text-[13.5px] text-[#6e6e73] hover:text-[#1d1d1f] border-black/[0.14]"
            >
              Batal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
