<!DOCTYPE html>
<html lang="en">

<head>
    <title>Penghunian dan Pengelolaan</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--===============================================================================================-->
    <link rel="icon" type="image/png" href="<?= base_url('assets/img/') ?>logoo.png" />
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/login2/') ?>vendor/bootstrap/css/bootstrap.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/login2/') ?>fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/login2/') ?>vendor/animate/animate.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/login2/') ?>vendor/select2/select2.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/login2/') ?>css/util.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/login2/') ?>css/main.css">
    <!--===============================================================================================-->
</head>

<body>


    <div class="size1 bg0 where1-parent">

        <div class="flex-c-m bg-img1 size2 where1 overlay1 where2 respon2" style="background-image: url('<?= base_url('assets/login2/') ?>images/bg2.jpg');">

        </div>

        <!-- Form -->
        <div class="size3 flex-col-sb flex-w p-l-75 p-r-75 p-t-45 p-b-45 respon1">
            <div class="wrap-pic1">
                <img src="<?= base_url('assets/img/') ?>logoo.png" alt="LOGO" width="100" height="100">
            </div>

            <div class="p-t-50 p-b-60">
                <p class="m1-txt1 p-b-36">
                    SIRUSUN v3.0 is <span class="m1-txt2">Coming Soon</span>, please wait patiently before we take off!
                </p>

                <p class="m1-txt1 p-b-36">
                    <span class="m1-txt2">Admin Only</span>
                </p>

                <form class="contact100-form validate-form" action="<?= base_url('auth') ?>" method="post">
                    <div class="wrap-input100 m-b-10 validate-input" data-validate="Name is required">
                        <input class="s2-txt1 placeholder0 input100" type="email" name="email" id="email" value="<?= set_value('email') ?>" placeholder="Email">
                        <?= form_error('email', '<small class="text-danger pl-3">', '</small>') ?>
                        <span class="focus-input100"></span>
                    </div>

                    <div class="wrap-input100 m-b-20 validate-input" data-validate="Email is required: ex@abc.xyz">
                        <input class="s2-txt1 placeholder0 input100" type="password" name="password" id="password" placeholder="Password">
                        <?= form_error('password', '<small class="text-danger pl-3">', '</small>') ?>
                        <span class="focus-input100"></span>
                    </div>

                    <div class="w-full">
                        <button type="submit" class="flex-c-m s2-txt2 size4 bg1 bor1 hov1 trans-04">
                            Cussss
                        </button>
                    </div>
                </form>

                <p class="s2-txt3 p-t-18">
                    For further information about the website, kindly ask me Joe, ATA Subdit 4 Penghunian dan Pengelolaan Direktorat Rumah Susun or Estio ATA Subdit 1 Perencanaan.
                </p>
            </div>

            <div class="flex-w">
                <!-- <a href="https://www.facebook.com/ahmad.imaduddin" class="flex-c-m size5 bg3 how1 trans-04 m-r-5">
                    <i class="fa fa-facebook"></i>
                </a>

                <a href="https://twitter.com/ahmadbale" class="flex-c-m size5 bg4 how1 trans-04 m-r-5">
                    <i class="fa fa-twitter"></i>
                </a>

                <a href="https://www.instagram.com/anotherpieceof.u/?hl=en" class="flex-c-m size5 bg5 how1 trans-04 m-r-5">
                    <i class="fa fa-instagram"></i>
                </a> -->
            </div>
        </div>
    </div>





    <!--===============================================================================================-->
    <script src="<?= base_url('assets/login2/') ?>vendor/jquery/jquery-3.2.1.min.js"></script>
    <!--===============================================================================================-->
    <script src="<?= base_url('assets/login2/') ?>vendor/bootstrap/js/popper.js"></script>
    <script src="<?= base_url('assets/login2/') ?>vendor/bootstrap/js/bootstrap.min.js"></script>
    <!--===============================================================================================-->
    <script src="<?= base_url('assets/login2/') ?>vendor/select2/select2.min.js"></script>
    <!--===============================================================================================-->
    <script src="<?= base_url('assets/login2/') ?>vendor/countdowntime/moment.min.js"></script>
    <script src="<?= base_url('assets/login2/') ?>vendor/countdowntime/moment-timezone.min.js"></script>
    <script src="<?= base_url('assets/login2/') ?>vendor/countdowntime/moment-timezone-with-data.min.js"></script>
    <script src="<?= base_url('assets/login2/') ?>vendor/countdowntime/countdowntime.js"></script>
    <script>
        $('.cd100').countdown100({
            /*Set Endtime here*/
            /*Endtime must be > current time*/
            endtimeYear: 0,
            endtimeMonth: 0,
            endtimeDate: 35,
            endtimeHours: 18,
            endtimeMinutes: 0,
            endtimeSeconds: 0,
            timeZone: ""
            // ex:  timeZone: "America/New_York"
            //go to " http://momentjs.com/timezone/ " to get timezone
        });
    </script>
    <!--===============================================================================================-->
    <script src="<?= base_url('assets/login2/') ?>vendor/tilt/tilt.jquery.min.js"></script>
    <script>
        $('.js-tilt').tilt({
            scale: 1.1
        })
    </script>
    <!--===============================================================================================-->
    <script src="<?= base_url('assets/login2/') ?>js/main.js"></script>

</body>

</html>