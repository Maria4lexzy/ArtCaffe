import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import pics from "../../constants/pics";
import { useTranslation } from "react-i18next";
import "./Navbar.scss";
import i18next from "i18next";

const Navbar = () => {
  //const selected = localStorage.getItem("i18nextLng") || "sk";
  const { t } = useTranslation();
  const handleLanguageSet = (e, languageCode) => {
    i18next.changeLanguage(languageCode);
    e.preventDefault();
  };

  const [toggleMeny, setToggleMenu] = useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={pics.logo} alt="app logo" />
      </div>

      <ul className="app__navbar-links">
        <li className="p__opensans">
          <a href="#home">{t("home")}</a>
        </li>
        <li className="p__opensans">
          <a href="#about">{t("about")}</a>
        </li>
        <li className="p__opensans">
          <a href="#menu">{t("menu")}</a>
        </li>
        <li className="p__opensans">
          <a href="#contact">{t("contact")}</a>
        </li>
      </ul>
      <div className="app__navbar-language">

        <p onClick={(e) => handleLanguageSet(e, "en")}>
          <img src={pics.gb} className="app__navbar-language_en" alt="English" height="20" width="20" />
        </p>

        /
        <p onClick={(e) => handleLanguageSet(e, "sk")}>
          <img src={pics.sk} className="app__navbar-language_sk" alt="Slovenský" height="20" width="20" />

        </p>

        <div />
        <a href="/" className="p__opensans">
          {t("reserve_table")}
        </a>
      </div>

      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />

        {toggleMeny && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              color="#fff"
              className="overlay__close"
              fontSize={27}
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li className="p__opensans">
                <a href="#home">{t("home")}</a>
              </li>
              <li className="p__opensans">
                <a href="#about">{t("about")}</a>
              </li>
              <li className="p__opensans">
                <a href="#menu">{t("menu")}</a>
              </li>
              <li className="p__opensans">
                <a href="#contact">{t("contact")}</a>
              </li>
              <li>
                <p className="p__opensans">{t("language")}</p>
                <button onClick={(e) => handleLanguageSet(e, "en")}>
                  <img src={pics.gb} alt="English" height="20" width="20" />
                </button>
                <button onClick={(e) => handleLanguageSet(e, "sk")}>
                  <img src={pics.sk} alt="Slovenský" height="20" width="20" />
                </button>
                /
                <div />
                <a href="/" className="p__opensans">
                  {t("reserve_table")}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
