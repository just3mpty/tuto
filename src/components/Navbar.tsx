"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../app/page.module.css";

const Navbar = () => {
    const linkRefs = useRef<HTMLAnchorElement[]>([]);

    const handleHover = (link: HTMLAnchorElement) => {
        const letters = link.querySelectorAll(`.${styles.original}`);
        const clones = link.querySelectorAll(`.${styles.clone}`);

        // Là c'est notre animation d'entrée, donc au survol des liens.
        gsap.to(letters, {
            y: -20,
            rotateX: 90,
            stagger: 0.025,
            duration: 0.025,
        });
        gsap.to(clones, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.025,
            duration: 0.025,
            color: "#91EF58",
        });
    };

    const handleMouseLeave = (link: HTMLAnchorElement) => {
        const letters = link.querySelectorAll(`.${styles.original}`);
        const clones = link.querySelectorAll(`.${styles.clone}`);

        // Et ça du coup, c'est notre animation de sortie ! Retour à la case départ bg
        gsap.to(letters, {
            y: 0,
            rotateX: 0,
            stagger: -0.025,
            duration: 0.025,
        });
        gsap.to(clones, {
            opacity: 0,
            y: 20,
            rotateX: 90,
            stagger: -0.025,
            duration: 0.025,
            color: "#D9DDE0",
        });
    };

    useEffect(() => {
        const links = linkRefs.current;

        links.forEach((link) => {
            link.addEventListener("mouseenter", () => handleHover(link));
        });
        links.forEach((link) => {
            link.addEventListener("mouseleave", () => handleMouseLeave(link));
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener("mouseenter", () => handleHover(link));
            });
            links.forEach((link) => {
                link.removeEventListener("mouseleave", () =>
                    handleMouseLeave(link)
                );
            });
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            {["Home", "About", "Contact"].map((text, index) => (
                <a
                    key={index}
                    href="#"
                    ref={(el) => {
                        if (el) {
                            linkRefs.current[index] = el;
                        }
                    }}
                    className={styles.navLink}>
                    {text.split("").map((letter, i) => (
                        <span
                            key={`wrapper-${i}`}
                            className={styles.letterWrapper}>
                            {/* Lettre originale */}
                            <span
                                className={`${styles.letter} ${styles.original}`}>
                                {letter}
                            </span>
                            {/* Clone de la lettre pour cet effet de bascule/replacement */}
                            <span
                                className={`${styles.letter} ${styles.clone}`}>
                                {letter}
                            </span>
                        </span>
                    ))}
                </a>
            ))}
        </nav>
    );
};

export default Navbar;
