import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../Home.css";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container className="hero-content text-center">
          <h1>Track, Compare, and Optimize Your Meals</h1>
          <p>
            Get personalized meal recommendations and effortlessly track your
            nutrition with MacroMate.
          </p>
          <Button variant="light" size="lg" className="button">
            Get Started
          </Button>
        </Container>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <Container>
        <Row className="features-row no-wrap">
            <Col md={4} sm={12} className="feature-box text-center px-4">
              <h3>Track Macros</h3>
              <p>
                Effortlessly log and track your daily macros to meet your health
                goals.
              </p>
            </Col>
            <Col md={4} sm={12} className="feature-box text-center px-4">
              <h3>Compare Meals</h3>
              <p>
                Compare meals and restaurants to find the best fit for your
                macros.
              </p>
            </Col>
            <Col md={4} sm={12} className="feature-box text-center px-4">
              <h3>Meal Recommendations</h3>
              <p>
                Get personalized meal suggestions based on your dietary
                preferences.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="cta-section text-center">
        <h2>Ready to take control of your nutrition?</h2>
        <p>Sign up today and start optimizing your meals!</p>
        <Button variant="success" size="lg" className="second-button">
          Sign Up Now
        </Button>
      </div>

      {/* Footer */}
      <footer className="footer text-center">
        <p>© 2025 MacroMate. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a> |{" "}
          <a href="#">Terms of Service</a> |{" "}
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </>
  );
}

export default Home;
