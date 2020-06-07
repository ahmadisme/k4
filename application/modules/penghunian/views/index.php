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
            <div class="card">
                <div class="card-body">
                    <div id="container"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">

    </div>