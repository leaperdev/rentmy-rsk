<?php

return [
    'theme' => [
        'name'  => 'RentMy Basic',
        'description'=> 'Default RentMy Sample Kit theme',
        'author'    => 'RentMy.co',
        'version'   => '1.0.0',
    ],
    'css' => [
        'fontsIcons'    => [
            'https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap',
            'https://use.fontawesome.com/releases/v5.4.1/css/all.css',
            'https://cdn.lineicons.com/2.0/LineIcons.css'
        ],
        'global'    => [
            'style.css'
        ],
        'home'  => [
            'owl.carousel.min.css',
            'owl.theme.default.min.css',
        ]
    ],
    'js' => [
        'global'    => [
        ],
        'home'  => [
            'owl.carousel.js',
            'home.js'
        ]
    ],
    'settings' => [
        'excludeHeader' =>[
            //set pages name
        ],
        'excludeFooter' =>[
            //set pages name
        ],
        'excludeCart' =>[
            //set pages name

        ],
    ],
];
