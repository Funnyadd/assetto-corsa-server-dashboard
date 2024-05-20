import { Footer } from 'react-daisyui';

const FooterComponent = () => {
    const currentYear = new Date().getFullYear()

    return (
        <Footer center className="mt-auto py-3 px-2 text-base bg-neutral text-neutral-content">
            © {currentYear} - Adam Mihajlovic. All rights reserved
        </Footer>
    )
}

export default FooterComponent