import '../styles/global.css'
import ThemeContextProvider from "../contexts/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <div style={{ margin: '0px' }}>
      <ThemeContextProvider>
          <Component {...pageProps} />
      </ThemeContextProvider>
    </div>
  );
}