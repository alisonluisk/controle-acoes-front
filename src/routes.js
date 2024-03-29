import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const EmpresaPage = React.lazy(() => import('./App/views/cadastros/Empresa/EmpresaView'));
const EmpresaFormPage = React.lazy(() => import('./App/views/cadastros/Empresa/EmpresaForm'));
const AcoesPage = React.lazy(() => import('./App/views/cadastros/Acoes/AcoesView'));

const ColaboradorPage = React.lazy(() => import('./App/views/cadastros/Colaborador/ColaboradorView'));
const ColaboradorFormPage = React.lazy(() => import('./App/views/cadastros/Colaborador/ColaboradorForm'));

const AcionistaPage = React.lazy(() => import('./App/views/cadastros/Acionista/AcionistaView'));
const AcionistaFormPage = React.lazy(() => import('./App/views/cadastros/Acionista/AcionistaForm'));

const UsuarioPage = React.lazy(() => import('./App/views/cadastros/Usuario/UsuarioView'));

const ModeloContratoPage = React.lazy(() => import('./App/views/cadastros/ModeloContrato/ModeloContratoView'));
const ModeloContratoFormPage = React.lazy(() => import('./App/views/cadastros/ModeloContrato/ModeloContratoForm'));

const DashboardFarmacia = React.lazy(() => import('./App/views/dashboards/farmacia/DashboardFarmaciaView'));

const routes = [
    { path: '/cadastros/empresas', exact: true, name: 'Empresas', component: EmpresaPage },
    { path: '/cadastros/empresas/:id', exact: false, name: 'Empresa Form', component: EmpresaFormPage },
    { path: '/cadastros/acoes', exact: true, name: 'Ações', component: AcoesPage },
    { path: '/cadastros/colaboradores', exact: true, name: 'Colaboradores', component: ColaboradorPage },
    { path: '/cadastros/colaboradores/:id', exact: false, name: 'Colaboradores Form', component: ColaboradorFormPage },
    { path: '/cadastros/acionistas', exact: true, name: 'Acionistas', component: AcionistaPage },
    { path: '/cadastros/acionistas/:id', exact: false, name: 'Acionistas Form', component: AcionistaFormPage },
    { path: '/cadastros/usuarios', exact: true, name: 'Usuários', component: UsuarioPage },
    { path: '/cadastros/modelos_contrato', exact: true, name: 'Modelo contrato', component: ModeloContratoPage },
    { path: '/cadastros/modelos_contrato/:id', exact: false, name: 'Modelo contrato Form', component: ModeloContratoFormPage },

    { path: '/', exact: true, name: 'Dashboard', component: DashboardFarmacia },
];

export default routes;
