import { APP_NAME } from "@/lib/constants";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className='border-t'>
            <div className='p-5 flex-center'>
                {currentYear} {APP_NAME}. All Right reserved
            </div>
        </footer>
    );
};

export default Footer;
