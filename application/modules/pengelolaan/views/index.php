<!-- Header -->
<div class="header pb-6 d-flex align-items-center" style="min-height: 300px; background-image: url(<?= base_url('assets/img/gdg.jpeg') ?>); background-size: cover; background-position: center top;">
    <!-- Mask -->
    <span class="mask bg-gradient-default opacity-8"></span>
    <!-- Header container -->
    <div class="container-fluid d-flex align-items-center">
        <div class="row">
            <div class="col-lg-12 col-md-5">
                <h1 class="display-2 text-white">Pengelolaan</h1>
                <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
            </div>
        </div>
    </div>
</div>
<!-- Page content -->
<div class="container-fluid mt--6">
    <div class="row">
        <div class="col-lg-3 pb-3">
            <button type="button" class="btn btn-primary lebar-card btn-block" data-toggle="modal" data-target="#exampleModal1">

                <p class="display-3 count"><?= $jumlah_tb->total ?></p>
            </button>
        </div>
        <div class="col-lg-3 pb-3">
            <button type="button" class="btn btn-primary bg-gradient-danger lebar-card btn-block" data-toggle="modal" data-target="#exampleModal2">

                <p class="display-3 count"><?= $jumlah_tb->belum ?></p>
            </button>
        </div>
        <div class="col-lg-3 pb-3">
            <button type="button" class="btn btn-primary bg-gradient-yellow lebar-card btn-block" data-toggle="modal" data-target="#exampleModal3">

                <p class="display-3 count"><?= $jumlah_tb->proses ?></p>
            </button>
        </div>
        <div class="col-lg-3 pb-3">
            <button type="button" class="btn btn-primary bg-gradient-success lebar-card btn-block" data-toggle="modal" data-target="#exampleModal4">

                <p class="display-3 count"><?= $jumlah_tb->sudah_bast ?></p>
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="nav-wrapper">
                <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="ni ni-cloud-upload-96 mr-2"></i>Tahun Anggaran</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i class="ni ni-bell-55 mr-2"></i>Penerima Manfaat</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><i class="ni ni-calendar-grid-58 mr-2"></i>Peta Persebaran</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                            <table class="table table-striped" id="data_ta">
                                <thead class="thead-light">
                                    <tr>
                                        <th>tahun anggaran</th>
                                        <th>total</th>
                                        <th>belum bisa proses</th>
                                        <th>proses</th>
                                        <th>sudah bast</th>
                                    </tr>
                                </thead>
                                <tbody id="show_data_tahun_anggaran">

                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                            <p class="description">Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                        </div>
                        <div class="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                            <p class="description">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>

<!-- Modal -->
<div class="modal fade bd-example-modal-xl" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModal1Label" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModal1Label">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-striped" id="mydata">
                    <thead>
                        <tr>
                            <th>nama bangunan</th>
                            <th>status huni</th>
                            <th>posisi dokumen aset</th>
                        </tr>
                    </thead>
                    <tbody id="show_data">

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade bd-example-modal-xl" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModal2Label" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModal2Label">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-striped" id="bbp">
                    <thead>
                        <tr>
                            <th>nama bangunan</th>

                            <th>posisi dokumen aset</th>
                        </tr>
                    </thead>
                    <tbody id="show_data_bbp">

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade bd-example-modal-xl" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModal3Label">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-striped" id="proses">
                    <thead>
                        <tr>
                            <th>nama bangunan</th>

                            <th>posisi dokumen aset</th>
                        </tr>
                    </thead>
                    <tbody id="show_data_proses">

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade bd-example-modal-xl" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModal4Label" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModal4Label">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-striped" id="bast">
                    <thead>
                        <tr>
                            <th>nama bangunan</th>

                            <th>posisi dokumen aset</th>
                        </tr>
                    </thead>
                    <tbody id="show_data_bast">

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>