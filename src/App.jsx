import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
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

function App() {
    return (
        <Router>
            <div className="App">
            <Route path="/:path" component={Navbar} />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <LogIn />
                        </Route>
                        <Route exact path="/Home/:id">
                            <Home />
                        </Route>
                        <Route path="/Create/:bid/:lat/:lon/:id/:Edit_mode">
                            <Create />
                        </Route>
                        <Route path="/Create/:bid/:lat/:lon/:id">
                            <Create />
                        </Route>
                        <Route path="/BridgeMap">
                            <BridgeMap />
                        </Route>
                        <Route path="/BridgeInfo/:name/:bid/:id">
                            <BridgeInfo />
                        </Route>
                        <Route path="/SpanCountForm/:bridgeID/:bridgeSpanCount/:AbutmentCount/:SetOfColumns/:Lanes/:id/:Edit_mode">
                            <SpanCountForm />
                        </Route>
                        <Route path="/SpanCountForm/:bridgeID/:bridgeSpanCount/:AbutmentCount/:SetOfColumns/:Lanes/:id">
                            <SpanCountForm />
                        </Route>
                        <Route path="/SpanCountForm/:id">
                            <SpanCountForm />
                        </Route>
                        <Route path="/AbutmentCountForm/:bridgeID/:AbutmentCount/:SetOfColumns/:Lanes/:id/:Edit_mode">
                            <AbutmentCountForm />
                        </Route>
                        <Route path="/AbutmentCountForm/:bridgeID/:AbutmentCount/:SetOfColumns/:Lanes/:id">
                            <AbutmentCountForm />
                        </Route>
                        <Route path="/SetOfColumnsForm/:bridgeID/:SetOfColumns/:Lanes/:id/:Edit_mode">
                            <SetOfColumnsForm/>
                        </Route>
                        <Route path="/SetOfColumnsForm/:bridgeID/:SetOfColumns/:Lanes/:id">
                            <SetOfColumnsForm/>
                        </Route>
                        <Route path="/Lanes/:bridgeID/:Lanes/:id/:Edit_mode">
                            <Lanes />
                        </Route>
                        <Route path="/Lanes/:bridgeID/:Lanes/:id">
                            <Lanes />
                        </Route>
                        <Route path="/Folders/:bridgeID/:id/:Edit_mode">
                            <Folders />
                        </Route>
                        <Route path="/Folders/:bridgeID/:id">
                            <Folders />
                        </Route>
                        <Route path="/TreeFolderConfirm/:bridgeID/:id/:Edit_mode">
                            <TreeFolderConfirm />
                        </Route>
                        <Route path="/TreeFolderConfirm/:bridgeID/:id">
                            <TreeFolderConfirm />
                        </Route>
                        <Route path="/EditSpine/:bridgeID/:id/:Edit_mode">
                            <EditSpine />
                        </Route>
                        <Route path="/AddNewAsset/:id">
                            <AddNewAsset />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>

            
            
    );
}

export default App;
