<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Upload extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->library('upload');
        $this->load->library(array('PHPExcel', 'PHPExcel/IOFactory'));
    }
    public function index()
    {
        $data['title']      = "SIRUSUN v3.0";
        $data['title2']     = "Dashboard";
        $this->load->view('layout/header', $data);
        $this->load->view('index', $data);
        $this->load->view('layout/footer', $data);
    }

    public function do_upload_bangunan()
    {
        $fileName = time() . $_FILES['bangunan']['name'];

        $config['upload_path'] = './uploads/'; //buat folder dengan nama uploads di root folder
        $config['file_name'] = $fileName;
        $config['allowed_types'] = 'xls|xlsx|csv';
        $config['max_size'] = 10000;

        $this->load->library('upload');
        $this->upload->initialize($config);

        if (!$this->upload->do_upload('bangunan'))
            $this->upload->display_errors();

        $media = $this->upload->data('bangunan');

        $inputFileName = './uploads/' . $config['file_name'];

        try {
            $inputFileType = IOFactory::identify($inputFileName);
            $objReader = IOFactory::createReader($inputFileType);
            $objPHPExcel = $objReader->load($inputFileName);
        } catch (Exception $e) {
            die('Error loading file "' . pathinfo($inputFileName, PATHINFO_BASENAME) . '": ' . $e->getMessage());
        }

        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();

        for ($row = 2; $row <= $highestRow; $row++) {                  //  Read a row of data into an array                 
            $rowData = $sheet->rangeToArray(
                'A' . $row . ':' . $highestColumn . $row,
                NULL,
                TRUE,
                FALSE
            );

            //Sesuaikan sama nama kolom tabel di database                                
            $data = array(
                "id" => $rowData[0][0],
                "nama_bangunan" => $rowData[0][1],
                "alamat" => $rowData[0][2],
                "id_provinsi" => $rowData[0][3],
                "nama_provinsi" => $rowData[0][4],
                "kota" => $rowData[0][5],
                "longitude_bangunan" => $rowData[0][6],
                "latitude_bangunan" => $rowData[0][7],
                "kontak" => $rowData[0][8],
                "ta" => $rowData[0][9],
                "tb" => $rowData[0][10],
                "jumlah_unit" => $rowData[0][11],
                "status_huni" => $rowData[0][12],
                "jumlah_unit_huni" => $rowData[0][13],
                "id_penerima_aset" => $rowData[0][14],
                "nama_penerima_aset" => $rowData[0][15],
                "ppk" => $rowData[0][16],
                "tipe_unit" => $rowData[0][17],
                "id_penerima_manfaat" => $rowData[0][18],
                "nama_penerima_manfaat" => $rowData[0][19],
                "id_posisi_dokumen_aset" => $rowData[0][20],
                "nama_posisi_dokumen_aset" => $rowData[0][21],
                "id_status_bangunan" => $rowData[0][22],
                "nama_status_bangunan" => $rowData[0][23],
                "nilai_kontrak" => $rowData[0][24],



                "fc_sertifikat_tanah" => $rowData[0][25],
                "sk_kebenaran_sertifikat_tanah" => $rowData[0][26],
                "fc_imb" => $rowData[0][27],
                "sk_kebenaran_imb" => $rowData[0][28],
                "kuasa_pengguna" => $rowData[0][29],
                "pengguna" => $rowData[0][30],
                "akta_pendirian" => $rowData[0][31],
                "sptj_mutlak" => $rowData[0][32],
                "sk_pengelola" => $rowData[0][33],
                "si_permohonan_penghunian" => $rowData[0][34],
                "form_masalah_penghunian" => $rowData[0][35],
                "surat_permohonan_penghunian" => $rowData[0][36],


                "keterangan" => $rowData[0][37],

            );


            $insert = $this->db->insert("tb_bangunan", $data);
            $this->session->set_flashdata('message', '<div class="alert alert-success" role="alert">Data Berhasil di Upload!</div>');
        }
        redirect('upload');
    }
}
