import React, { useContext } from 'react';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos';
import { AuthContext } from './provedorAutenticacao';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {

    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    );

}

function Rotas() {

    const contexto = useContext(AuthContext);

    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={contexto.isAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={contexto.isAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={contexto.isAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    );

}

export default Rotas;