<!-- Header -->
<div class="header pb-3 d-flex align-items-center" style="min-height: 300px; background-image: url(<?= base_url('assets/img/gdg.jpeg') ?>); background-size: cover; background-position: center top;">
    <!-- Mask -->
    <span class="mask bg-gradient-default opacity-8"></span>
    <!-- Header container -->
    <div class="container-fluid d-flex align-items-center">
        <div class="row">
            <div class="col-lg-12 col-md-5">
                <h1 class="display-2 text-white">Penghunian Provinsi <?= $provinsi->nama_provinsi ?> Tahun Anggaran <?= $ta ?> Penerima Manfaat <?= $penerima_manfaat->nama_penerima_manfaat ?></h1>
            </div>
        </div>
    </div>
</div>
<!-- Page content -->
<div class="container-fluid mt--6">
    <div class="row">

        <div class="col-xl-12 order-xl-1">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card card-pricing bg-gradient-success border-0 text-center mb-4">
                        <div class="card-body px-lg-7">
                            <div class="display-2 text-white"><?= $jumlah_tb->huni ?></div>
                            <h2 class=" text-white">TB terhuni</h2>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card card-pricing bg-gradient-danger border-0 text-center mb-4">
                        <div class="card-body px-lg-7">
                            <div class="display-2 text-white"><?= $jumlah_tb->belum_huni ?></div>
                            <h2 class=" text-white">TB belum terhuni</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Detail</h3>
                        </div>

                    </div>
                </div>
                <div class="card-body">
                    <div class="nav-wrapper">
                        <ul class="nav nav-pills nav-fill flex-column flex-md-row " id="tabs-icons-text" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 lebar100 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="ni ni-cloud-upload-96 mr-2"></i>Huni</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 lebar100" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i class="ni ni-bell-55 mr-2"></i>Belum huni</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                            <table class="table align-items-center" id="1">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Lokasi</th>
                                        <th>TB</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($tb_huni as $th) { ?>
                                        <tr>
                                            <td><?= $th->nama_bangunan ?></td>
                                            <td><?= $th->tb ?></td>
                                            <td><a href="<?= base_url('detail/detail_tb/') . $th->id ?>" type="button" class="btn btn-default btn-sm">Detail</a></td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                            <table class="table table-hover" id="2">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Lokasi</th>
                                        <th>TB</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($tb_belum_huni as $tbh) { ?>
                                        <tr>
                                            <td><?= $tbh->nama_bangunan ?></td>
                                            <td><?= $tbh->tb ?></td>
                                            <td><a href="<?= base_url('detail/detail_tb/') . $tbh->id ?>" type="button" class="btn btn-default btn-sm">Detail</a></td>
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