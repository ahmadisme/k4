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
    <div class="main-content" id="panel">
        <!-- Topnav -->
        <nav class="navbar navbar-top navbar-expand navbar-dark bg-default">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class=" navbar-nav align-items-center mr-auto ml-md-0">
                        <li>
                            <a class="navbar" href="<?= base_url('welcome') ?>">
                                <img src="<?= base_url('assets') ?>/img/logoo.png" width="25" height="25">
                            </a>
                        </li>
                        <li>
                            <a class="nav-link font-weight-bold" href="<?= base_url('welcome') ?>" ">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a class=" nav-link font-weight-bold" href="<?= base_url('penghunian') ?>" ">
                                Penghunian
                            </a>
                        </li>
                        <li>
                            <a class=" nav-link font-weight-bold" href="#" ">
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