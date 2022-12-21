import React, { useEffect, Suspense } from 'react';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, fetchCart } from './store/product-thunks';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { userData } from './store/auth-thunks';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import BackToTop from './components/UI/BackToTop';
import ScrollToTop from './components/UI/ScrollToTopOnChange';
import SuccessSnackbar from './components/UI/SuccessSnackbar';
import ProgressBar from './components/UI/ProgressBar';
import Search from './pages/Search';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/config';
import ErrorModal from './components/UI/ErrorModal';

const About = React.lazy(() => import('./pages/About'));
const Shop = React.lazy(() => import('./pages/Shop'));
const Brands = React.lazy(() => import('./pages/Brands'));
const Help = React.lazy(() => import('./pages/Help'));
const BrandedProducts = React.lazy(() => import('./components/BrandsComponents/BrandedProducts/BrandedProducts'));
const ProductDetailsPage = React.lazy(() => import('./pages/ProductDetailsPage'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const OrderConfirmationPage = React.lazy(() => import('./pages/OrderConfirmationPage'));
const Authentication = React.lazy(() => import('./pages/Authentication'));
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const Profile = React.lazy(() => import('./pages/Profile'));

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			xm: 450,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	palette: {
		primary: {
			main: 'rgb(90, 57, 161)',
		},
		secondary: {
			main: 'rgb(132, 76, 196)',
		},
		text: {
			primary: '#222',
			secondary: '#868395',
			disabled: '#a19fad',
		},
	},
	typography: {
		fontFamily: 'Inter, sans-serif',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			 @font-face {
				font-family: 'Inter';
				font-style: normal;
				font-weight: 400;
			 }
		  `,
		},
		MuiCard: {
			styleOverrides: {
				root: {
					border: 'none',
					borderRadius: '10px',
					boxShadow: 'rgb(90 114 123 / 11%) 0px 7px 30px 0px'
				}
			}
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			}
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			}
		}
	}
});

const App = () => {
	const user = useSelector(state => state.auth.userData);
	const productLoading = useSelector(state => state.products.productPorgress);
	const categoryLoading = useSelector(state => state.products.categoryProgress);
	const cartLoading = useSelector(state => state.cart.cartProgress);
	const userLoading = useSelector(state => state.auth.userDataProgress);
	const errorModal = useSelector(state => state.ui.errorModal);
	const errorModalText = useSelector(state => state.ui.errorModalText);

	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const productDetailsPageRoutes = [
		'/product/:productID',
		'/related/:productID',
		'/shop/product/:productID',
		'/brands/:brandID/:productID',
		'/search/:keyID/:productID'
	];

	const authRoutes = ['/signup', '/login'];

	// Check if a user is signed in
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(userData(user.uid));
			}
		});

		return () => unsub();
	}, [dispatch]);

	// Fetch products, categories and cart
	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchCategories());
		dispatch(fetchCart());
	}, [dispatch]);

	if (productLoading || categoryLoading || cartLoading || userLoading) {
		return <ProgressBar />;
	};

	return (
		<ThemeProvider theme={theme}>
			<Suspense fallback={<ProgressBar />}>
				{
					errorModal &&
					<ErrorModal
						errorModal={errorModal}
						errorModalText={errorModalText}
					/>
				}
				<SuccessSnackbar />
				<ScrollToTop />
				<Navbar />
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					{authRoutes.map((route, index) => (
						<Route key={index} path={route} exact>
							{!user && <Authentication />}
							{user && <Redirect to='/' />}
						</Route>
					))}
					<Route path='/about' exact>
						<About />
					</Route>
					<Route path='/shop/:id' exact>
						<Shop />
					</Route>
					<Route path='/search/:id' exact>
						<Search />
					</Route>
					<Route path='/brands' exact>
						<Brands />
					</Route>
					<Route path='/brands/:id' exact>
						<BrandedProducts />
					</Route>
					<Route path='/help' exact>
						<Help />
					</Route>
					<Route path='/wishlist' exact>
						<Wishlist />
					</Route>
					<Route path='/cart' exact>
						<Cart />
					</Route>
					<Route path='/cart/checkout' exact>
						{user && <Checkout />}
						{!user && <Redirect to='/login' />}
					</Route>
					<Route path='/confirmation' exact>
						<OrderConfirmationPage />
					</Route>
					<Route path='/orderhistory' exact>
						{user && <OrderHistory />}
						{!user && <Redirect to='/login' />}
					</Route>
					<Route path='/profile' exact>
						{user && <Profile />}
						{!user && <Redirect to='/login' />}
					</Route>
					{productDetailsPageRoutes.map((route, index) => (
						<Route key={index} path={route} exact>
							<ProductDetailsPage />
						</Route>
					))}
					<Route path='*'>
						<Redirect to='/' />
					</Route>
				</Switch>
				{
					!(
						(pathname.startsWith('/brands') && pathname.length > 7) ||
						(pathname.startsWith('/search') && pathname.length > 7) ||
						(pathname.startsWith('/shop/product')) ||
						(pathname.startsWith('/product'))
					) &&
					<Footer />
				}
				<BackToTop />
			</Suspense>
		</ThemeProvider>
	);
};

export default App;
