import React from "react";
import { Link } from "react-router-dom";

export default function NotFound () {
    return (
        <section>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for doesn't exist.</p>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </section>
    )
}