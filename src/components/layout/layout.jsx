import Navbar from "../navbar/navbar"
import Sidebar from "../sidebar/sidebar"

function Layout({ children }) {
    return (
        <div className="h-[calc(100vh-50px)]">
            <div className="flex h-full gap-[45px]">
                <div className="min-w-[310px] h-full">
                    <Sidebar />

                </div>
                <div className="flex-1">
                    <Navbar />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout