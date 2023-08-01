//? ESTA CONFIG SIEMPRE ES IGUAL <<
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Esta linea sirve para conectar nuestra App con la EXTENSION redux DEVTOOLS DEL NAVEGADOR

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) //esta linea sirve para que podamos hacer peticiones a una API/SERVIDOR
)

export default store;
