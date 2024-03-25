const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footerContainer align-middle py-2 px-1 text-center">
            <span className="footerText">
                © {currentYear} - Adam Mihajlovic. All rights reserved
            </span>
        </div>
    );
}

export default Footer;