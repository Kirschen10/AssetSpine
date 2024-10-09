import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './CSS/index.css';
import Home from './Home';
import Navbar from './Navbar';
import BridgeMap from './BridgeMap';
import Create from './Create';
import BridgeInfo from './BridgeInfo';
import SpanCountForm from './SpanCountForm';
import AbutmentCountForm from './AbutmentCountForm';
import SetOfColumnsForm from './SetOfColumnsForm';
import Lanes from './Lanes';
import Folders from './Folders';
import TreeFolderConfirm from './TreeFolderConfirm';
import EditSpine from './EditSpine';
import AddNewAsset from './AddNewAsset';
import LogIn from './LogIn';
import EditAsset from './EditAsset';

/**
 * The App component serves as the central routing system for the application. 
 * It uses React Router to define routes and render specific components based on the URL path.
 * This setup allows users to navigate through different parts of the application, such as viewing
 * and editing assets, creating new assets, and accessing bridge information.
 *
 * The Navbar is set to appear on every page dynamically using the route `/:path` to match any path.
 *
 * **ID Explanation:**
 * In the Navbar component, a function (`extractLastNumberFromURL`) is used to retrieve the user's ID
 * from the URL. The ID is always positioned as the last number in the URL. This is done by splitting
 * the URL into parts and reversing it to find the last segment containing only digits. This approach
 * ensures that the ID is consistently available and accessible across various pages of the application,
 * making it easier to manage user-specific information, permissions, and navigation throughout the app.
 */

function App() {
    return (
        <Router>
            <div className="App">
                {/* The Navbar is rendered for any path using a dynamic route to match any path */}
                <Route path="/:path" component={Navbar} />

                <div className="content">
                    <Switch>
                        {/* Route for the login page */}
                        <Route exact path="/">
                            <LogIn />
                        </Route>

                        {/* Route for the home page with user ID */}
                        <Route exact path="/Home/:id">
                            <Home />
                        </Route>

                        {/* Route for creating a new bridge with or without edit mode */}
                        <Route path="/Create/:bid/:lat/:lon/:id/:Edit_mode">
                            <Create />
                        </Route>
                        <Route path="/Create/:bid/:lat/:lon/:id">
                            <Create />
                        </Route>

                        {/* Route for the bridge map */}
                        <Route path="/BridgeMap">
                            <BridgeMap />
                        </Route>

                        {/* Route for viewing bridge information */}
                        <Route path="/BridgeInfo/:name/:bid/:id">
                            <BridgeInfo />
                        </Route>

                        {/* Route for the Span Count Form, supporting edit mode */}
                        <Route path="/SpanCountForm/:bridgeID/:bridgeSpanCount/:AbutmentCount/:SetOfColumns/:Lanes/:id/:Edit_mode">
                            <SpanCountForm />
                        </Route>
                        <Route path="/SpanCountForm/:bridgeID/:bridgeSpanCount/:AbutmentCount/:SetOfColumns/:Lanes/:id">
                            <SpanCountForm />
                        </Route>
                        <Route path="/SpanCountForm/:id">
                            <SpanCountForm />
                        </Route>

                        {/* Route for the Abutment Count Form, supporting edit mode */}
                        <Route path="/AbutmentCountForm/:bridgeID/:AbutmentCount/:SetOfColumns/:Lanes/:id/:Edit_mode">
                            <AbutmentCountForm />
                        </Route>
                        <Route path="/AbutmentCountForm/:bridgeID/:AbutmentCount/:SetOfColumns/:Lanes/:id">
                            <AbutmentCountForm />
                        </Route>

                        {/* Route for the Set of Columns Form, supporting edit mode */}
                        <Route path="/SetOfColumnsForm/:bridgeID/:SetOfColumns/:Lanes/:id/:Edit_mode">
                            <SetOfColumnsForm/>
                        </Route>
                        <Route path="/SetOfColumnsForm/:bridgeID/:SetOfColumns/:Lanes/:id">
                            <SetOfColumnsForm/>
                        </Route>

                        {/* Route for the Lanes page, supporting edit mode */}
                        <Route path="/Lanes/:bridgeID/:Lanes/:id/:Edit_mode">
                            <Lanes />
                        </Route>
                        <Route path="/Lanes/:bridgeID/:Lanes/:id">
                            <Lanes />
                        </Route>

                        {/* Route for Folders, supporting edit mode */}
                        <Route path="/Folders/:bridgeID/:id/:Edit_mode">
                            <Folders />
                        </Route>
                        <Route path="/Folders/:bridgeID/:id">
                            <Folders />
                        </Route>

                        {/* Route for TreeFolderConfirm, supporting edit mode */}
                        <Route path="/TreeFolderConfirm/:bridgeID/:id/:Edit_mode">
                            <TreeFolderConfirm />
                        </Route>
                        <Route path="/TreeFolderConfirm/:bridgeID/:id">
                            <TreeFolderConfirm />
                        </Route>

                        {/* Route for editing the spine of a bridge, supporting edit mode */}
                        <Route path="/EditSpine/:bridgeID/:id/:Edit_mode">
                            <EditSpine />
                        </Route>

                        {/* Route for adding a new asset */}
                        <Route path="/AddNewAsset/:id">
                            <AddNewAsset />
                        </Route>

                        {/* Route for editing an asset */}
                        <Route path="/EditAsset/:bid/:id">
                            <EditAsset />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
