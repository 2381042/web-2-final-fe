import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./utils/AuthProvider";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Camera routes
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail";

// Lens routes
import Lensa from "./pages/Lensa";
import AddLensa from "./pages/AddLensa";
import EditLensa from "./pages/LensaDetail";
import LensaDetail from "./pages/LensaDetail";

// Tripod routes
import Tripod from "./pages/Tripod";
import TripodAdd from "./pages/TripodAdd";
import TripodEdit from "./pages/TripodEdit";
import TripodDetail from "./pages/TripodDetail";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes */}
        <Route path="/" element={<BaseLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        {/* Private Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Camera Routes */}
          <Route
            path="product"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
          <Route
            path="product/add"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="product/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="product/edit/:id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />

          {/* Lens Routes */}
          <Route
            path="lensa"
            element={
              <PrivateRoute>
                <Lensa />
              </PrivateRoute>
            }
          />
          <Route
            path="lensa/add"
            element={
              <PrivateRoute>
                <AddLensa />
              </PrivateRoute>
            }
          />
          <Route
            path="lensa/:id"
            element={
              <PrivateRoute>
                <LensaDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="lensa/:id/edit"
            element={
              <PrivateRoute>
                <EditLensa />
              </PrivateRoute>
            }
          />

          {/* Tripod Routes */}
          <Route
            path="tripod"
            element={
              <PrivateRoute>
                <Tripod />
              </PrivateRoute>
            }
          />
          <Route
            path="tripod/add"
            element={
              <PrivateRoute>
                <TripodAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="tripod/:id"
            element={
              <PrivateRoute>
                <TripodDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="tripod/:id/edit"
            element={
              <PrivateRoute>
                <TripodEdit />
              </PrivateRoute>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
