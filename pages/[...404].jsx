import Navbar from "~/components/navbar/navbar.jsx";
import Footer from "~/components/footer/footer.jsx";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <div style={{height:"500px", color:"var(--text-color1)", textAlign:"center"}}>
        <h1>Page Not Found</h1>
        <p style={{color:"var(--text-color2)"}}>
          Click <a href="/" style={{color:"var(--text-color1)", fontWeight:"bold", textDecoration:"none"}}>here</a> to go home.
        </p>
      </div>
      <Footer />
    </main>
  );
}
