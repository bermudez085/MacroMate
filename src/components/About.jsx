import React from "react";
import "../About.css";
import daniel from "../assets/daniel-img.jpeg";
import nick from "../assets/nick-img.jpeg";
import beforepic from "../assets/before.png";
import afterpic from "../assets/after.png";

function About() {
  return (
    <>
      <div className="header-banner">
        <h2 className="header-title">
          <span className="underline">About</span> Us
        </h2>
        <p className="header-description">
          MacroMate is your personal nutrition guide, helping you discover
          restaurants and meals that align with your dietary needs. Whether
          you're tracking macros, managing allergies, or following a specific
          diet, we've got you covered!
        </p>
      </div>

      <div className="about-sections">

        {/* Daniel's Box */}
        <div className="about-section daniel-box">
          <img src={daniel} alt="Daniel" className="about-image" />
          <div className="about-text">
            <h3>Meet Daniel - Founder & Developer</h3>
            <p>
              Daniel is the creator of MacroMate, passionate about making
              nutrition tracking effortless and accessible. His goal is to help
              people find meals that align with their health goals, whether
              they’re tracking macros or managing allergies. Daniel believes
              everyone should have access to food options that are tailored
              to their dietary needs, and MacroMate provides that personalized
              experience for anyone looking to eat healthier and with more
              awareness.
            </p>
          </div>
        </div>

        {/* Nick's Box */}
        <div className="about-section nick-box reverse">
          <img src={nick} alt="Nick" className="about-image" />
          <div className="about-text">
            <h3>Meet Nick – Marketer</h3>
            <p>
              Nick is not just a co-contributor but also a fellow gym-goer who
              tracks his calories to achieve a healthier lifestyle and improve
              his physique. With MacroMate, Nick has successfully lost weight
              and is now focused on building muscle while maintaining a balanced
              diet. His journey is a testament to how personalized nutrition can
              help anyone achieve their fitness and health goals. Nick’s passion
              for fitness and wellness is a driving force behind the features of
              MacroMate that help users track their macros and choose the best
              meals to fuel their workouts.
            </p>
          </div>
        </div>
      </div>

      <div className="transformation-section">
        <h3 className="transformation-title">My Transformation Journey</h3>
        <div className="transformation-content">
          <img src={afterpic} alt="After Transformation" className="transformation-image" />
          <img src={beforepic} alt="Before Transformation" className="transformation-image" />
        </div>
        <p className="transformation-text">
          Through dedication, proper nutrition, and consistency, I was able to transform my body.
          MacroMate played a key role in helping me stay on track by providing meal options that fit my goals.
          Now, I'm here to help others achieve their fitness and health ambitions!
        </p>
      </div>
    </>
  );
}

export default About;
