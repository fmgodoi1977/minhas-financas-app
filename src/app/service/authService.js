import LocalStoreService from './localStorageService';

export const USUARIO_LOGADO = '_usuario_logado';

export default class AuthService {


    static isUsuarioAutenticado() {
        const usuario = LocalStoreService.obterItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado() {
        LocalStoreService.removerItem(USUARIO_LOGADO);
    }

    static logar(usuario) {
        LocalStoreService.adicionarItem(USUARIO_LOGADO, usuario);
    }

    static obterUsuarioAutenticado() {
        return LocalStoreService.obterItem(USUARIO_LOGADO);
    }

}