import "./App.css";
import Navbar from "./assets/Components/Navbar";
import CustomerTable from "./assets/Components/CustomerTable";
import Footer from "./assets/Components/Footer";
function App() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <CustomerTable />
      <Footer />
    </div>
  );
}

export default App;
