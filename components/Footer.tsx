
import Link from "next/link";
import { footerLinks, socialMedia } from "../constants";

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};

const Footer = () => (
    
 <div className={`bg-[#121212] text-white ${styles.paddingX} ${styles.flexCenter}`}>
 <div className={`${styles.boxWidth}`}>
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src='/images/logo.png'
          alt="hoobank"
          className="w-[266px] h-[72.14px] object-contain"
        />
        {/* <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          A new way to make the money easy, reliable and secure.
        </p> */}
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                    index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

     
  {/* <footer className="border-t border-[#43001f] flex items-center text-white justify-between p-5">
        <img
          className="h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full"
          src="/images/logo.png"
          alt=""
        />
        <p className="text-xs text-gray-400 pl-5"> 
        <span>DISCLAIMER:</span> 
        The Company will not be liable for any loss of profits, indirect, special or consequential loss suffered or incurred by you that arises out of the withdrawal of any Game or from the participation or non-participation in any Game.
        </p>
        <p className="text-xs text-gray-400 pl-5">
         
          SECURITY: Our True Random Address Picker has been certified by Gaming Laboratories International to ensure the highest security and guarantee 100% fairness of the drawing process.
          
          <img
          className=""
          src="https://lottonigeria.com/images/base/gli.jpg"
          alt=""
        />
          </p>
      </footer> */}

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2022 chainlabs. All Rights Reserved.
      </p>

      {/* <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div> */}
    </div>
  </section>
  </div>
  </div>
);

export default Footer;

 
