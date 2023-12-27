import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import My from "./pages/my";
import Layout from "./components/Layout";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<My />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
