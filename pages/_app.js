import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { ForumPostsProvider } from "../context/ForumPostsContext";
import { SidebarLatestNewsProvider } from '../context/SidebarLatestNewsContext';
import { CommunityPostUtilsProvider } from '../context/CommunityPostUtilsContext';
import NetworkBar from "../components/NetworkBar";

export default function App({ Component, pageProps }) {
  return (
    <SidebarLatestNewsProvider>
      <CommunityPostUtilsProvider>
        <ForumPostsProvider>
          <Toaster position="top-right" reverseOrder={false} />
          {/* Fixed network bar sits directly below the fixed Navbar (z-40 < navbar z-50) */}
          <div className="fixed top-[72px] left-0 w-full z-40 shadow-sm">
            <NetworkBar />
          </div>
          {/* Spacer so page content clears both the navbar (72px) and network bar (~36px) */}
          <div className="h-[108px]" />
          <Component {...pageProps} />
          <ToastContainer />
        </ForumPostsProvider>
      </CommunityPostUtilsProvider>
    </SidebarLatestNewsProvider>
  );
}
