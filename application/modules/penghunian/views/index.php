<!-- Header -->
<div class="header bg-default pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
                <?= $this->session->flashdata('message') ?>
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Penghunian</h6>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Page content -->
<div class="container-fluid mt--6">
    <!-- Table -->
    <div class="row">
        <div class="col-4">
            <div class="card">
                <!-- Card body -->
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="#" class="">
                                <i class="fas fa-school fa-4x text-default"></i>
                            </a>
                        </div>
                        <div class="col ml--2">
                            <h4 class="mb-0">
                                <a href="#!">Jumlah TB</a>
                            </h4>
                            <p class="text-xl text-default mb-0">
                                <font style="font-weight: bold;"><?= $jumlah_tb->total ?></font>
                            </p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card">
                <!-- Card body -->
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="#" class="">
                                <i class="fa fa-user fa-4x text-green" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div class="col ml--2">
                            <h4 class="mb-0">
                                <a href="#!">Terhuni</a>
                            </h4>
                            <p class="text-xl text-default mb-0">
                                <font style="font-weight: bold;"><?= $huni ?></font>
                            </p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card">
                <!-- Card body -->
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="#" class="">
                                <i class="fa fa-times fa-4x text-danger" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div class="col ml--2">
                            <h4 class="mb-0">
                                <a href="#!">Belum Huni</a>
                            </h4>
                            <p class="text-xl text-default mb-0">
                                <font style="font-weight: bold;"><?= $belum_huni ?></font>
                            </p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-12">
                            <div class="nav-wrapper">
                                <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link mb-sm-3 mb-md-0 bg-gradient-info active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><img src="<?= base_url('assets') ?>/img/flat.png" width="42" height="50">
                                            <h3>
                                                <font color="white"> Penghunian Tahun Anggaran</font>
                                            </h3>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link mb-sm-3 mb-md-0 bg-gradient-info" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><img src="<?= base_url('assets') ?>/img/flat.png" width="42" height="50">
                                            <h3>
                                                <font color="white"> Penghunian Penerima Manfaat</font>
                                            </h3>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link mb-sm-3 mb-md-0 bg-gradient-info" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><img src="<?= base_url('assets') ?>/img/flat.png" width="42" height="50">
                                            <h3>
                                                <font color="white"> Peta Persebaran</font>
                                            </h3>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card-body">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                            <table class="table table-hover" id="3">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Tahun Anggaran</th>
                                        <th>Jumlah TB Huni</th>
                                        <th>Jumlah TB Belum Huni</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($rekap_tahun_anggaran as $rta) { ?>
                                        <tr>
                                            <td><?= $rta->ta ?></td>
                                            <td><?= $rta->huni ?></td>
                                            <td><?= $rta->belum_huni ?></td>
                                            <td><a href="<?= base_url('penghunian/penghunian_tahun_anggaran/') . $rta->ta ?>" type="button" class="btn btn-primary btn-sm">Detail</a></td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                            <table class="table table-hover" id="7">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Penerima Manfaat</th>
                                        <th>Jumlah TB Huni</th>
                                        <th>Jumlah TB Belum Huni</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($rekap_penerima_manfaat as $rpm) { ?>
                                        <tr>
                                            <td><?= $rpm->nama_penerima_manfaat ?></td>
                                            <td><?= $rpm->huni ?></td>
                                            <td><?= $rpm->belum_huni ?></td>
                                            <td><a href="<?= base_url('penghunian/penghunian_penerima_manfaat/') . $rpm->id_penerima_manfaat ?>" type="button" class="btn btn-primary btn-sm">Detail</a></td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                            <div id="container"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>