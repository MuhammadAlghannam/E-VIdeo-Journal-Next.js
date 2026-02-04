import { Mail, MapPin, Phone, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import contactUs from "../../../../public/images/contact-us/contact-us.png";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact us",
};

export default function Page() {
  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12 px-4">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          Contact Us
        </h1>
        <p className="sm:text-h5-regular text-h6-regular text-center md:w-3/5 w-full mx-auto">
          We`re here to help-share your thoughts or inquires with us, and we`ll back to you soon !
        </p>
      </div>

      {/* Contact */}
      <div className="flex-between gap-8 lg:gap-10 flex-col-reverse lg:flex-row">
        {/* Left */}
        <div className="flex flex-col gap-6 flex-1">
          {/* 1st row */}
          <div className="flex-between gap-6 flex-col sm:flex-row">
            {/* User */}
            <div className="email w-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#F1F9FA] flex flex-center rounded-full mb-4">
                <User className="text-primary" />
              </div>

              {/* Content */}
              <div className="content">
                <p className="text-h7-semibold">For inquiries please contact:</p>
                <p className="text-muted-foreground break-words">
                  Prof. Ahmed Hadidi
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#F1F9FA] flex flex-center rounded-full mb-4">
                <Mail className="text-primary" />
              </div>

              {/* Content */}
              <div className="content">
                <p className="text-h7-semibold">Email Address</p>
                <Link className="text-muted-foreground break-words" href="mailto:assistant@hypospadias-society.org">
                  assistant@hypospadias-society.org
                </Link>
              </div>
            </div>

          </div>

          {/* 2nd row */}
          <div className="flex-between gap-6 flex-col sm:flex-row">
            {/* Phone Number */}
            <div className="phone w-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#F1F9FA] flex flex-center rounded-full mb-4">
                <Phone className="text-primary" />
              </div>

              <div className="content">
                <p className="text-h7-semibold">Phone Number</p>
                <Link className="text-muted-foreground" href="tel:+491742056913">
                  0049 174 205 6913
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="w-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#F1F9FA] flex flex-center rounded-full mb-4">
                <MapPin className="text-primary" />
              </div>

              {/* Content */}
              <div className="content">
                <p className="text-h7-semibold">Location</p>
                <p className="text-muted-foreground">
                  Trieler Ring 94,<br />
                  Seligenstadt. D-36500, Germany
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <Image
            width={684}
            height={332}
            src={contactUs}
            alt="Contact us"
            className="w-full h-auto max-w-full object-contain"
            sizes="(min-width: 1280px) 684px, (min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
