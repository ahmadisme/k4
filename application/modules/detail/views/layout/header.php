<!-- =========================================================
* Argon Dashboard PRO v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 -->
<!DOCTYPE html>
<html>

<head>

    <title><?= $title ?></title>

    <!-- Favicon -->
    <link rel="icon" href="<?= base_url('assets/') ?>img/logoo.png" type="image/png">
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
    <!-- Icons -->
    <link rel="stylesheet" href="<?= base_url('assets/argon/') ?>assets/vendor/nucleo/css/nucleo.css" type="text/css">
    <link rel="stylesheet" href="<?= base_url('assets/argon/') ?>assets/vendor/%40fortawesome/fontawesome-free/css/all.min.css" type="text/css">
    <!-- Page plugins -->
    <link rel="stylesheet" href="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
    <link rel="stylesheet" href="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-select-bs4/css/select.bootstrap4.min.css">
    <!-- Argon CSS -->
    <link rel="stylesheet" href="<?= base_url('assets/argon/') ?>assets/css/argon.min9f1e.css?v=1.1.0" type="text/css">
    <style>
        #container {
            height: 500px;
            min-width: 100%;
            max-width: 100%;
            margin: 0 auto;
        }

        .loading {
            margin-top: 10em;
            text-align: center;
            color: gray;
        }
    </style>


</head>

<body>

    <!-- Sidenav -->
    <!-- <nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
        <div class="scrollbar-inner">
            
            <div class="sidenav-header d-flex align-items-center">
                <a class="navbar-brand" href="https://demos.creative-tim.com/argon-dashboard-pro/pages/dashboards/dashboard.html">
                    <img src="<?= base_url('assets/') ?>img/logoo.png" class="navbar-brand-img" alt="...">
                </a>
                <div class="ml-auto">
                    <div class="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
                        <div class="sidenav-toggler-inner">
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-inner">
              
                <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                   
                    <ul class="navbar-nav">

                        <li class="nav-item">
                            <a class="nav-link" href="<?= base_url('welcome') ?>">
                                <i class="ni ni-archive-2 text-green"></i>
                                <span class="nav-link-text">Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?= base_url('upload') ?>">
                                <i class="ni ni-chart-pie-35 text-info"></i>
                                <span class="nav-link-text">Upload</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard-pro/pages/calendar.html">
                                <i class="ni ni-calendar-grid-58 text-red"></i>
                                <span class="nav-link-text">Calendar</span>
                            </a>
                        </li>
                    </ul>
                   
                    <hr class="my-3">
                  
                    <h6 class="navbar-heading p-0 text-muted">Documentation</h6>
                    
                    <ul class="navbar-nav mb-md-3">
                        <li class="nav-item">
                            <a class="nav-link" href="<?= base_url('setting') ?>">
                                <i class="ni ni-spaceship"></i>
                                <span class="nav-link-text">Setting</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard-pro/docs/foundation/colors.html" target="_blank">
                                <i class="ni ni-palette"></i>
                                <span class="nav-link-text">Foundation</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard-pro/docs/components/alerts.html" target="_blank">
                                <i class="ni ni-ui-04"></i>
                                <span class="nav-link-text">Components</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard-pro/docs/plugins/charts.html" target="_blank">
                                <i class="ni ni-chart-pie-35"></i>
                                <span class="nav-link-text">Plugins</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav> -->
    <!-- Main content -->
    <div class="main-content" id="panel">
        <!-- Topnav -->
        <nav class="navbar navbar-top navbar-expand navbar-dark bg-default">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Search form -->
                    <!-- <form class="navbar-search navbar-search-light form-inline mr-sm-3" id="navbar-search-main">
                        <div class="form-group mb-0">
                            <div class="input-group input-group-alternative input-group-merge">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                                </div>
                                <input class="form-control" placeholder="Search" type="text">
                            </div>
                        </div>
                        <button type="button" class="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </form> -->
                    <!-- Navbar links -->

                    <ul class=" navbar-nav align-items-center mr-auto ml-md-0">
                        <li>
                            <a class="navbar" href="<?= base_url('welcome') ?>">
                                <img src="<?= base_url('assets') ?>/img/logoo.png" width="25" height="25">
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" href="<?= base_url('welcome') ?>" ">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a class=" nav-link" href="<?= base_url('penghunian') ?>" ">
                                Penghunian
                            </a>
                        </li>
                        <li>
                            <a class=" nav-link" href="#" ">
                                Pengelolaan
                            </a>
                        </li>
                    </ul>
                    <ul class=" navbar-nav align-items-center ml-auto ml-md-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="media align-items-center">
                                    <span class="avatar avatar-sm rounded-circle">
                                        <img alt="Image placeholder" src="<?= base_url('assets/argon/') ?>assets/img/theme/team-4.jpg">
                                    </span>
                                    <div class="media-body ml-2 d-none d-lg-block">
                                        <span class="mb-0 text-sm  font-weight-bold">John Snow</span>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <div class="dropdown-header noti-title">
                                    <h6 class="text-overflow m-0">Welcome!</h6>
                                </div>
                                <a href="#!" class="dropdown-item">
                                    <i class="ni ni-single-02"></i>
                                    <span>My profile</span>
                                </a>
                                <a href="#!" class="dropdown-item">
                                    <i class="ni ni-settings-gear-65"></i>
                                    <span>Settings</span>
                                </a>
                                <a href="#!" class="dropdown-item">
                                    <i class="ni ni-calendar-grid-58"></i>
                                    <span>Activity</span>
                                </a>
                                <a href="#!" class="dropdown-item">
                                    <i class="ni ni-support-16"></i>
                                    <span>Support</span>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="<?= base_url('auth/logout') ?>" class="dropdown-item">
                                    <i class="ni ni-user-run"></i>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Header -->