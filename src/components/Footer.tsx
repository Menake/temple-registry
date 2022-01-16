export const Footer = () => {
    return (
        <footer className="flex items-center justify-center w-full h-5 border-t p-5 text-gray-500">
            <a
                className="flex items-center justify-center text-xs"
                href="http://www.srilankaramaya.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Copyright © Sri Lankaramaya - New Zealand {" "}{new Date().getFullYear()}
            </a>
        </footer>
    )
}