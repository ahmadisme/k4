<!-- Header -->
<div class="header bg-default pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">

                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Penghunian Penerima Manfaat <?= $penerima_manfaat->nama_penerima_manfaat ?></h6>
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
                                <font style="font-weight: bold;"></font>
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
                                <font style="font-weight: bold;"></font>
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
                                <font style="font-weight: bold;"></font>
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
            <div class="nav-wrapper">
                <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="ni ni-cloud-upload-96 mr-2"></i>Terhuni</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i class="ni ni-bell-55 mr-2"></i>Belum Huni</a>
                    </li>
                </ul>
            </div>
            <div class="card shadow">
                <div class="card-body">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                            <table class="table table-hover" id="1">
                                <thead>
                                    <tr>
                                        <th>Lokasi</th>
                                        <th>TB</th>
                                        <th>Penghunian</th>
                                        <th>Posisi Dokumen Aset</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($tb_huni as $th) { ?>
                                        <tr>
                                            <td><?= $th->nama_bangunan ?></td>
                                            <td><?= $th->tb ?></td>
                                            <td><?= $th->status_huni ?></td>
                                            <td><?= $th->nama_posisi_dokumen_aset ?></td>
                                            <td><a href="<?= base_url('detail/detail_tb/') . $th->id ?>" type="button" class="btn btn-default btn-sm">Detail</a></td>
                                        </tr>
                                    <?php } ?>

                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                            <table class="table table-hover" id="2">
                                <thead>
                                    <tr>
                                        <th>Lokasi</th>
                                        <th>TB</th>
                                        <th>Penghunian</th>
                                        <th>Posisi Dokumen Aset</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($tb_belum_huni as $tbh) { ?>
                                        <tr>
                                            <td><?= $tbh->nama_bangunan ?></td>
                                            <td><?= $tbh->tb ?></td>
                                            <td><?= $tbh->status_huni ?></td>
                                            <td><?= $tbh->nama_posisi_dokumen_aset ?></td>
                                            <td><a href="<?= base_url('detail_tb/') . $tbh->id ?>" type="button" class="btn btn-default btn-sm">Detail</a></td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>