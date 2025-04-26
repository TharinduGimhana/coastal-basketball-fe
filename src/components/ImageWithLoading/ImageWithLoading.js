import React, { useState } from "react";
import { Spin } from "antd"; // Ant Design Spinner

const ImageWithLoading = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ position: "relative", display: "inline-block", width: '100%', minHeight: '200px' }}>
            {loading && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                    }}
                >
                    <Spin size="large" />
                </div>
            )}

            <img
                src={src}
                alt={alt}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)} // Hide spinner even if image fails
                style={{
                    display: loading ? "none" : "block",
                    maxWidth: "100%",
                    height: "auto",
                }}
            />
        </div>
    );
};

export default ImageWithLoading;