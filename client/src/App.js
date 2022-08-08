import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import Error404 from "./pages/Error404";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    </ApolloProvider>
  );
}

export default App;
