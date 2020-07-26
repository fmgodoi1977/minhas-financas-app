import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


function ConsultaLancamentos(props) {

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const service = new LancamentoService();
    const [filtro, setFiltro] = useState({
        descricao: '',
        ano: '',
        mes: '',
        tipo: '',
        usuario: LocalStorageService.obterItem('_usuario_logado').id
    });
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamentoDeletar, setLancamentoDeletar] = useState({});

    function buscar() {

        if (!filtro.ano) {
            messages.mensagemErro('O campo ano é obrigatório.');
            return false;

        }

        service.consultar(filtro)
            .then(result => {
                const lista = result.data;
                if (lista.length < 1) {
                    messages.mensagemAlerta('Nenhum resultado encontrado.');
                }
                setLancamentos(lista);
            }).catch(error => {
                console.log(error);
            });
    }

    const meses = service.obterListaMeses();
    const tipos = service.obterListaTipos();

    function editar(id) {
        props.history.push(`/cadastro-lancamentos/${id}`);
    }


    function abrirConfirmacao(lancamento) {
        setShowConfirmDialog(true);
        setLancamentoDeletar(lancamento);
    }

    function preparaFormularioCadastro() {
        props.history.push('/cadastro-lancamentos');
    }


    function alterarStatus(lancamento, status) {
        service.alterarStatus(lancamento.id, status)
            .then(response => {
                const _lancamentos = [...lancamentos];
                const index = _lancamentos.indexOf(lancamento);
                if (index !== -1) {
                    lancamento.status = status;
                    _lancamentos[index] = lancamento;
                    setLancamentos(_lancamentos);
                }
                messages.mensagemSucesso('Status atualizado com sucesso.');
            });
    }

    function deletar() {
        service
            .deletar(lancamentoDeletar.id)
            .then(response => {
                const _lancamentos = [...lancamentos];
                const index = _lancamentos.indexOf(lancamentoDeletar);
                _lancamentos.splice(index, 1);
                setLancamentos(_lancamentos);
                setShowConfirmDialog(false);
                messages.mensagemSucesso('Lançamento deletado com sucesso.')
            })
            .catch(error => {
                messages.mensagemErro('Ocorreu um erro ao deletar.');
            });
    }

    const confirDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
            <Button label="Cancelar"
                icon="pi pi-times"
                className="p-button-secondary"
                onClick={() => setShowConfirmDialog(false)} />
        </div>
    );


    return (

        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">

                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                className="form-control"
                                id="inputAno"
                                value={filtro.ano}
                                onChange={e => setFiltro({ ...filtro, ano: e.target.value })}
                                placeholder="Digite o Ano" />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu id="inputMes"
                                value={filtro.mes}
                                onChange={e => setFiltro({ ...filtro, mes: e.target.value })}
                                className="form-control"
                                lista={meses} />
                        </FormGroup>

                        <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                            <input type="text"
                                className="form-control"
                                id="inputDescricao"
                                value={filtro.descricao}
                                onChange={e => setFiltro({ ...filtro, descricao: e.target.value })}
                                placeholder="Digite a descrição" />
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                            <SelectMenu id="inputTipo"
                                value={filtro.tipo}
                                onChange={e => setFiltro({ ...filtro, tipo: e.target.value })}
                                className="form-control"
                                lista={tipos} />
                        </FormGroup>

                        <button onClick={() => buscar()}
                            type="button"
                            className="btn btn-success">
                            <i className="pi pi-search"></i> Buscar
                         </button>
                        <button onClick={preparaFormularioCadastro}
                            type="button"
                            className="btn btn-danger">
                            <i className="pi pi-plus"></i> Cadastrar
                        </button>

                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable lancamentos={lancamentos}
                            deleteAction={abrirConfirmacao}
                            editAction={editar}
                            alterarStatus={alterarStatus}
                        />
                    </div>
                </div>
            </div>

            <div>
                <Dialog header="Confirmação"
                    visible={showConfirmDialog}
                    style={{ width: '50vw' }}
                    footer={confirDialogFooter}
                    modal={true}
                    onHide={() => setShowConfirmDialog(false)}>
                    Confirma a exclusão deste lançamento?
                </Dialog>
            </div>
        </Card>
    );
}

export default withRouter(ConsultaLancamentos);