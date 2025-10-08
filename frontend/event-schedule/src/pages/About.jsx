import "./About.css"
import flower from "../assets/Flowers.svg"

export default function About() {
    return (
        <div>
            <div className="about-container">
                <h1>About EarthPulse</h1>
                <p className="about-intro">
                    At <strong>EarthPulse</strong>, our mission is simple: To create a sacred space where
                    movement, music, and mindfulness meet.
                </p>
                <p>
                    Set in nature and rooted in intention, EarthPulse is more than just a festival. 
                    Through yoga, live music, holistic workshops, spiritual ceremonies, and meaningful
                    community, we invite you to slow down and remember what it feels like to truly belong.
                </p>
                <img className="flower" src={flower} alt="Flower logo" />
                <h2>What We Offer</h2>
                <ul>
                    <li>Daily Yoga & Meditation sessions for all levels</li>
                    <li>Live Music under the stars featuring conscious artists</li>
                    <li>Workshops on healing arts, breathwork, and herbalism</li>
                    <li>Ceremonial Gatherings, sound baths, and nature walks</li>
                    <li>Holistic Marketplace with local artisans</li>
                    <li>Camping under the trees to reconnect with nature</li>
                </ul>
            </div>
        </div>
    );
}