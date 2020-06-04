<!-- Header -->
<div class="header bg-default pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
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
                            <p class="text-sm text-muted mb-0"><?= $jumlah_tb->total ?></p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-sm btn-primary">Add</button>
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
                            <p class="text-sm text-muted mb-0"><?= $jumlah_huni ?></p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-sm btn-primary">Add</button>
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
                                <a href="#!">BAST</a>
                            </h4>
                            <p class="text-sm text-muted mb-0"><?= $jumlah_proses_pembuatan_bast + $jumlah_sudah_bast ?></p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-sm btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-3">
            <div class="card">
                <!-- Card header -->
                <div class="card-header">
                    <!-- Title -->
                    <h5 class="h3 mb-0">Data Info</h5>
                </div>
                <!-- Card body -->
                <div class="card-body">
                    <!-- List group -->
                    <ul class="list-group list-group-flush list my--3">
                        <li class="list-group-item px-0">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <!-- Avatar -->
                                    <!-- <a href="#" class="avatar rounded-circle">
                                        <img alt="Image placeholder" src="../../assets/img/theme/bootstrap.jpg">
                                    </a> -->
                                </div>
                                <div class="col">
                                    <h5>Argon Design System</h5>
                                    <select name="provinsi" id="provinsi">
                                        <?php foreach ($id_provinsi->result() as $row) : ?>
                                            <option value="<?= $row->id ?>"><?= $row->id ?></option>
                                        <?php endforeach ?>
                                    </select>
                                    <br><br>
                                    <select name="nama_provinsi" id="nama_provinsi">
                                        <option value="0"></option>
                                    </select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-9">
            <div class="card">
                <!-- Card header -->
                <div class="card-header">
                    <!-- Title -->
                    <h5 class="h3 mb-0">Peta Infografis</h5>
                </div>
                <!-- Card body -->
                <div class="card-body">
                    <!-- List group -->
                    <ul class="list-group list-group-flush list my--3">
                        <li class="list-group-item px-0">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <table class="table table-hover" id="mydata" style="width: 100%;">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>id_provinsi</th>
                                                <th>nama_provinsi</th>
                                            </tr>
                                        </thead>
                                        <tbody id="show_data">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>





    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card bg-pink">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="text-light text-white text-uppercase ls-1 mb-1">Overview</h6>
                            <h5 class="h1 text-white mb-0">Penghunian</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="penghunian" class="chart-canvas"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card bg-gradient-info">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="text-uppercase text-white text-muted ls-1 mb-1">Overview</h6>
                            <h5 class="h1 text-white mb-0">Pengelolaan</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="pengelolaan" class="chart-canvas"></div>
                </div>
            </div>
        </div>
    </div>