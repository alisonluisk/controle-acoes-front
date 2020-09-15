export default {
    items: [
        {
            id: 'pages',
            title: 'Pages',
            type: 'group',
            icon: 'icon-pages',
            children: [
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
                    ]
                },
            ]
        }
    ]
}