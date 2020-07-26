import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import * as messages from '../../components/toastr';

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

function CadastroLancamentos(props) {

    const service = new LancamentoService();
    const tipos = service.obterListaTipos();
    const meses = service.obterListaMeses();
    const [atualizando, setAtualizando] = useState(false);

    const [lancamento, setLancamento] = useState({
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: null,
        usuario: LocalStorageService.obterItem('_usuario_logado').id
    });

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setLancamento({ ...lancamento, [name]: value });
    }

    function submit() {

        try {
            service.validar(lancamento);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        service
            .salvar(lancamento)
            .then(response => {
                props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento cadastrado com sucesso.');
            }).catch(error => {
                messages.mensagemErro(error.response.data);
            });
    }

    function atualizar() {
        service
            .atualizar(lancamento)
            .then(response => {
                props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso.');
            }).catch(error => {
                messages.mensagemErro(error.response.data);
            });
    }

    useEffect(() => {
        const params = props.match.params;
        if (params.id) {
            service.obterPorId(params.id)
                .then(response => {
                    setLancamento({ ...response.data });
                    setAtualizando(true);
                }).catch(error => {
                    messages.mensagemErro(error.responmse.data);
                });
        }
    }, []);


    return (
        <Card title={atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
            <div className="row">
                <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao"
                            type="text"
                            className="form-control"
                            name="descricao"
                            value={lancamento.descricao}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno"
                            type="text"
                            className="form-control"
                            name="ano"
                            value={lancamento.ano}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu id="inputMes"
                            lista={meses}
                            className="form-control"
                            name="mes"
                            value={lancamento.mes}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                        <input id="inputValor"
                            type="text"
                            className="form-control"
                            name="valor"
                            value={lancamento.valor}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTipo"
                            lista={tipos}
                            className="form-control"
                            name="tipo"
                            value={lancamento.tipo}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: ">
                        <input id="inputStatus"
                            type="text"
                            className="form-control"
                            disabled
                            name="status"
                        />
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    {
                        atualizando ?
                            (
                                <button className="btn btn-primary"
                                    onClick={atualizar}>
                                    <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button className="btn btn-success"
                                    onClick={submit}>
                                    <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                    }
                    <button className="btn btn-danger"
                        onClick={e => props.history.push('/consulta-lancamentos')}>
                        <i className="pi pi-times"></i> Cancelar
                         </button>
                </div>
            </div>
        </Card>
    );

}

export default withRouter(CadastroLancamentos);


