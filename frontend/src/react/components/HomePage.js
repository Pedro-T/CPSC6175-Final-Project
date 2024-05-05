import React, { useEffect, useRef } from 'react';
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import { Link } from 'react-router-dom';
import { Root as amRoot, color as amColor } from "@amcharts/amcharts5";
import { MapChart, MapPolygonSeries, geoNaturalEarth1 } from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import './HomePage.css';
import './common/CommonPageElements.css';

const HomePage = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let root = amRoot.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            MapChart.new(root, {
                panX: "rotateX",
                projection: geoNaturalEarth1()
            })
        );

        let polygonSeries = chart.series.push(
            MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ["AQ"]
            })
        );

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            templateField: "polygonSettings",
            interactive: true
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: amColor(0x677935)
        });

        polygonSeries.data.setAll([
            { id: "US", polygonSettings: { fill: amColor(0xFF3C38) } },
            { id: "CA", polygonSettings: { fill: amColor(0xA23E48) } },
            { id: "MX", polygonSettings: { fill: amColor(0xFF8C42) } }
        ]);

        chartRef.current = chart;

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div className="page">
            <Navbar />
            <main className="main-content">
                <h1 className="page-title">Explore the World.</h1>
                <p className="subtitle">Choose your destination.</p>
                <div id="chartdiv" className="map-container"></div>
                <div className="cta-container">
                    <Link to="/countries" className="cta"></Link>
                    <Link to="/regions" className="cta1"></Link>
                    <Link to="/demographics" className="cta2"></Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
