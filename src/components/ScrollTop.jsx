import { useEffect, useState } from 'react';

function ScrollTop() {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShow(true);
            } else {
                setShow(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    function scrollTop() {
        window.scroll(
            {
                top: 0,
                behavior: "smooth"
            }
        )
    }

    return (
        <>
            {
                show && <button onClick={() => scrollTop()} className="btn btn-sm btn-primary scrollTopBtn">
                    <i className="bi bi-arrow-up"></i>
                </button>
            }
        </>
    )
}

export default ScrollTop;