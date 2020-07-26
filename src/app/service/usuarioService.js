import ApiService from '../apiservice';

import ErroValidacao from '../exception/ErroValidacao';

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }


    salvar(usuario) {
        return this.post('/', usuario);
    }

    validar(usuario) {
        const erros = [];

        if (!usuario.nome) {
            erros.push('Campo nome obrigatótio');
        }

        if (!usuario.email) {
            erros.push('Campo email obrigatório');
        }
        else if (!usuario.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um email válido');
        }

        if (!usuario.senha || !usuario.senhaRepetida) {
            erros.push('Digite senha 2x');
        }
        else if (usuario.senhaRepetida !== usuario.senha) {
            erros.push('As senhas não batem');
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;