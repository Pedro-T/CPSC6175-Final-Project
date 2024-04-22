import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import './HomePage.css';

const HomePage = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let root = am5.Root.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "rotateX",
            panY: "rotateY",
            projection: am5map.geoMercator()
        }));

        let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow
        }));

        let polygonHoverState = polygonSeries.mapPolygons.template.states.create("hover");
        polygonHoverState.set("fill", root.interfaceColors.get("primaryButtonHover"));

        chartRef.current = chart;

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div className="homepage">
            <nav className="navigation">
                <Link to="/countries" className="nav-link">Countries</Link>
                <Link to="/regions" className="nav-link">Regions</Link>
                <Link to="/demographics" className="nav-link">Demographics</Link>
                <Link to="/" className="nav-link">Home</Link>
            </nav>

            <main className="main-content">
                <h1 className="title">Explore the World.</h1>
                <p className="subtitle">Choose your destination.</p>

                <div id="chartdiv" className="map-container"></div>

                <div className="cta-container">
                    <Link to="/countries" className="cta">Countries by Name</Link>
                    <Link to="/regions" className="cta">Countries by Region</Link>
                    <Link to="/demographics" className="cta">Countries by Demographics</Link>
                </div>
            </main>

            <footer className="footer">
                <p>World Explorer</p>
                <div className="footer-links">
                    <Link to="/countries" className="footer-link">Countries</Link>
                    <Link to="/regions" className="footer-link">Regions</Link>
                    <Link to="/demographics" className="footer-link">Demographics</Link>
                    <Link to="/" className="footer-link">Home</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
