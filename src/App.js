import { useReactiveVar, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { client, isLoggedInVar, darkModeVar } from './apollo';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, GlobalStyles } from './styles';
import routes from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import NotFound from './screens/NotFound';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './component/Layout';

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Switch>
                            <Route path={routes.home} exact>
                                {isLoggedIn ? (
                                    <Layout>
                                        <Home />
                                    </Layout>
                                ) : (
                                    <Login />
                                )}
                            </Route>
                            {!isLoggedIn ? (
                                <Route path={routes.signUp}>
                                    <Signup />
                                </Route>
                            ) : null}
                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}

export default App;
