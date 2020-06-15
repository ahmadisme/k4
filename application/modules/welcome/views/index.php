<!-- Header -->
<div class="header bg-default pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
                </div>
            </div>

            <?php if ($this->session->flashdata('message')) : ?>
                <div class="flash-data" data-flashdata=" <?= $this->session->flashdata('message') ?>"></div>
            <?php endif; ?>
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
                                <a href="#!">Penghunian</a>
                            </h4>
                            <p class="text-xl text-default mb-0">
                                <font style="font-weight: bold;"><?= $huni ?></font>
                            </p>
                            <span class="text-success">●</span>
                            <small>Terhuni</small>
                        </div>
                        <div class="col-auto">
                            <a href="<?= base_url('penghunian') ?>" class="btn btn-sm btn-primary">Go to Dashboard</a>
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
                                <i class="fa fa-check fa-4x text-success" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div class="col ml--2">
                            <h4 class="mb-0">
                                <a href="#!">Pengelolaan</a>
                            </h4>
                            <p class="text-xl text-default mb-0">
                                <font style="font-weight: bold;"><?= $belum_huni ?></font>
                            </p>
                            <span class="text-success">●</span>
                            <small>Sudah BAST</small>
                        </div>
                        <div class="col-auto">
                            <a href="<?= base_url('pengelolaan') ?>" class="btn btn-sm btn-primary">Go to Dashboard</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-7">
            <div class="card bg-pink">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="text-light text-white text-uppercase ls-1 mb-1">Overview</h6>
                            <h5 class="h1 text-white mb-0">Diagram Penghunian</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="penghunian" class="chart-canvas"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-5">
            <div class="card">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
                            <h5 class="h1 mb-0">Overview Penghunian</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-auto">
                        <table class="table table-hover" id="1" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Tahun Anggaran</th>
                                    <th>Jumlah TB Huni</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($tb_huni as $th) { ?>
                                    <tr>
                                        <td><?= $th->ta ?></td>
                                        <td><?= $th->huni ?></td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-5">
            <div class="card">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
                            <h5 class="h1 mb-0">Overview Pengelolaan</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-auto">
                        <table class="table table-hover" id="2" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Tahun Anggaran</th>
                                    <th>Jumlah TB BAST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($tb_bast as $tb) { ?>
                                    <tr>
                                        <td><?= $tb->ta ?></td>
                                        <td><?= $tb->bast ?></td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-7">
            <div class="card bg-info">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="text-light text-white text-uppercase ls-1 mb-1">Overview</h6>
                            <h5 class="h1 text-white mb-0">Diagram Pengelolaan</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="pengelolaan" class="chart-canvas"></div>
                </div>
            </div>
        </div>
    </div>