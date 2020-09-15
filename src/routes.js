import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const EmpresaPage = React.lazy(() => import('./App/views/cadastros/Empresa/EmpresaView'));
const EmpresaFormPage = React.lazy(() => import('./App/views/cadastros/Empresa/EmpresaForm'));
const AcoesPage = React.lazy(() => import('./App/views/cadastros/Acoes/AcoesView'));

const routes = [
    { path: '/cadastros/empresas', exact: true, name: 'Empresas', component: EmpresaPage },
    { path: '/cadastros/empresas/:id', exact: false, name: 'Empresa Form', component: EmpresaFormPage },
    { path: '/cadastros/acoes', exact: true, name: 'Ações', component: AcoesPage },
];

export default routes;
