import { Footer } from 'react-daisyui';

const FooterComponent = () => {
    const currentYear = new Date().getFullYear()

    return (
        <Footer center className="py-2 px-1 text-base bg-neutral text-neutral-content">
            © {currentYear} - Adam Mihajlovic. All rights reserved
        </Footer>
    )
}

export default FooterComponent