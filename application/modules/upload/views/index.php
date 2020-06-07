<!-- Header -->
<div class="header bg-default pb-6">

    <div class="container-fluid">

        <div class="header-body">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
                </div>
            </div>
            <?= $this->session->flashdata('message') ?>
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
                            <p class="text-sm text-muted mb-0"></p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-sm btn-primary">Go to Dashboard</button>
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
                            <p class="text-sm text-muted mb-0"></p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>
                        <div class="col-auto">
                            <a href="<?= base_url('penghunian') ?>" type="button" class="btn btn-sm btn-primary">Go to Dashboard</a>
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
                            <p class="text-sm text-muted mb-0"></p>
                            <span class="text-success">●</span>
                            <small>Active</small>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-sm btn-primary">Go to Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <!-- Card header -->
                <div class="card-header bg-default">
                    <!-- Title -->
                    <h5 class="h3 mb-0">
                        <font style="color:white">Data Info</font>
                    </h5>
                </div>
                <!-- Card body -->
                <div class="card-body">
                    <!-- List group -->
                    <form action="<?= base_url('upload/do_upload_bangunan') ?>" method="post" enctype="multipart/form-data">
                        <div class="custom-file">
                            <input type="file" class="form-control" id="customFileLang" name="bangunan">
                        </div>
                        <div class="mt-3">
                            <button type="submit" class="btn btn-default">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>