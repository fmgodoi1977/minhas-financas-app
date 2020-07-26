import React, { useContext } from 'react';
import NavbarItem from './navbaritem';
import AuthService from '../app/service/authService';
import { AuthContext } from '../main/provedorAutenticacao';


function Navbar() {

    const contexto = useContext(AuthContext);

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={contexto.isAutenticado} href="#/home" label="Home" />
                        <NavbarItem render={contexto.isAutenticado} href="#/cadastro-usuarios" label="Usuários" />
                        <NavbarItem render={contexto.isAutenticado} href="#/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem render={contexto.isAutenticado} onClick={contexto.encerrarSessao} href="#/login" label="Sair" />
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default Navbar;