export default {
    items: [
        {
            id: 'pages',
            title: '',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'menu-level',
                    title: 'Cadastros',
                    type: 'collapse',
                    icon: 'feather icon-menu',
                    children: [
                        {
                            id: 'empresas',
                            title: 'Empresas',
                            type: 'item',
                            url: '/cadastros/empresas',
                            classes: 'nav-item',
                            icon: 'feather icon-sidebar'
                        },
                        {
                            id: 'acoes',
                            title: 'Ações',
                            type: 'item',
                            url: '/cadastros/acoes',
                            classes: 'nav-item',
                            icon: 'feather icon-sidebar'
                        },
                        {
                            id: 'colaboradores',
                            title: 'Colaboradores',
                            type: 'item',
                            url: '/cadastros/colaboradores',
                            classes: 'nav-item',
                            icon: 'feather icon-sidebar'
                        },
                        {
                            id: 'acionistas',
                            title: 'Acionistas',
                            type: 'item',
                            url: '/cadastros/acionistas',
                            classes: 'nav-item',
                            icon: 'feather icon-sidebar'
                        },
                        {
                            id: 'usuarios',
                            title: 'Usuários',
                            type: 'item',
                            url: '/cadastros/usuarios',
                            classes: 'nav-item',
                            icon: 'feather icon-sidebar'
                        },
                        // {
                        //     id: 'modelos_contrato',
                        //     title: 'Modelos de contrato',
                        //     type: 'item',
                        //     url: '/cadastros/modelos_contrato',
                        //     classes: 'nav-item',
                        //     icon: 'feather icon-sidebar'
                        // },
                    ]
                },
            ]
        }
    ]
}