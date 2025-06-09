"use client";

import React from "react"
import { fontMap, FontKey, SvgData } from "../utils/utils";
import { BottleDesign } from "../utils/typing";

export const svgMap: Record<string, SvgData> = {
    "cuadrada-cubica": {
        width: 273,
        height: 334,
        viewBox: "0 0 273 334",
        className: "w-[13.6rem]",
        shapeElement: <rect width="273" height="334" fill="fillColor" />,
    },
    "cuadrada-cilindrica": {
        width: 252,
        height: 371,
        viewBox: "0 0 252 371",
        className: "w-[13.2rem]",
        shapeElement: (
            <path
                d="M0 0L24.3087 6.28814L42.9453 10.2182H89.1318H129.646H180.695L218.778 8.64619L251.19 0L252 359.996L229.312 367.856L125.595 371L30.791 367.856L0 359.996V0Z"
                fill="fillColor"
            />
        ),
    },
    "cuadrada-esferica": {
        width: 438,
        height: 267,
        viewBox: "0 0 438 267",
        className: "w-[19.5rem]",
        shapeElement: (
            <path
                d="M26 0L69.842 3.80342L129.624 7.60684L214.173 10.6496L297.869 7.60684L355.943 3.80342L408.5 0L424 33.5L435 69.5L437.5 103L436 138.064L431.5 167L420 199.5L405.627 226.105L391 247L373.294 267H328.225H219.47H69.842L51.1481 254.5L39.2301 240L28.8018 223.5L13.227 198.092L5.38876 166.077L0 127.059V81.0376L5.38876 52.5244L13.227 24.0111L26 0Z"
                fill="fillColor"
            />
        ),
    },
    "redonda-cubica": {
        width: 331,
        height: 345,
        viewBox: "0 0 331 345",
        className: "w-[15.7rem]",
        clipPathDefs: (
            <defs>
                <clipPath id="ellipse-clip">
                    <ellipse cx="165.5" cy="172.5" rx="165.5" ry="172.5" />
                </clipPath>
            </defs>
        ),
        shapeElement: (
            <ellipse cx="165.5" cy="172.5" rx="165.5" ry="172.5" fill="fillColor" />
        ),
        clipPathId: "ellipse-clip",
    },
    "redonda-cilindrica": {
        width: 251,
        height: 383,
        viewBox: "0 0 251 383",
        className: "w-[13.3rem]",
        clipPathDefs: (
            <defs>
                <clipPath id="ellipse-clip">
                    <path d="M250.5 191.5C250.5 297.263 197.245 383 126 383C54.7553 383 0 297.263 0 191.5C0 85.7375 54.7553 0 126 0C197.245 0 250.5 85.7375 250.5 191.5Z" />
                </clipPath>
            </defs>
        ),
        shapeElement: (
            <path
                d="M250.5 191.5C250.5 297.263 197.245 383 126 383C54.7553 383 0 297.263 0 191.5C0 85.7375 54.7553 0 126 0C197.245 0 250.5 85.7375 250.5 191.5Z"
                fill="fillColor"
            />
        ),
        clipPathId: "ellipse-clip",
    },
    "redonda-esferica": {
        width: 346,
        height: 343,
        viewBox: "0 0 346 343",
        className: "w-[16.5rem]",
        clipPathDefs: (
            <defs>
                <clipPath id="ellipse-clip">
                    <path d="M346 171.5C346 266.217 274.635 343 175.5 343C76.3649 343 0 266.217 0 171.5C0 76.7832 76.3649 0 175.5 0C274.635 0 346 76.7832 346 171.5Z" />
                </clipPath>
            </defs>
        ),
        shapeElement: (
            <path
                d="M346 171.5C346 266.217 274.635 343 175.5 343C76.3649 343 0 266.217 0 171.5C0 76.7832 76.3649 0 175.5 0C274.635 0 346 76.7832 346 171.5Z"
                fill="fillColor"
            />
        ),
        clipPathId: "ellipse-clip",
    },
};

const BottleLabel = ({
    bottleForm,
    labelForm,
    design,
}: {
    bottleForm: string;
    labelForm: string;
    design: BottleDesign;
}) => {
    const key = `${labelForm}-${bottleForm}`;
    const svgData = svgMap[key];
    if (!svgData) return null;

    const {
        width,
        height,
        viewBox,
        className,
        shapeElement,
        clipPathDefs,
        clipPathId,
    } = svgData;

    const shapeWithFill = React.cloneElement<React.SVGProps<SVGElement>>(
        shapeElement,
        { fill: design.labelColor }
    );
    ;

    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {clipPathDefs}
            {shapeWithFill}
            <image
                href={design.labelImage}
                x="0"
                y="0"
                width={width}
                height={height}
                preserveAspectRatio={
                    clipPathId ? "xMidYMid slice" : undefined
                }
                clipPath={clipPathId ? `url(#${clipPathId})` : undefined}
                transform={`scale(${design.imageScale})`}
                transform-origin="center"
            />
            <text
                x="50%"
                y={`${design.textYPosition * 100}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={design.textSize}
                fill={design.textColor}
                fontFamily={fontMap[design.textTypography as FontKey]}
            >
                {design.text}
            </text>
        </svg>
    );
};
export default BottleLabel;