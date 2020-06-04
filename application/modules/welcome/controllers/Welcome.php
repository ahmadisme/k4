<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('welcome_model');
    }
    public function index()
    {
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $data['id_provinsi'] = $this->welcome_model->get_id();
        $data['jumlah_huni'] = $this->welcome_model->jumlah_huni();
        $data['jumlah_belum_huni'] = $this->welcome_model->jumlah_belum_huni();
        $data['jumlah_tb'] = $this->db->query('SELECT tb, sum(tb) AS total FROM tb_bangunan')->row();

        $data['jumlah_belum_bisa_bast'] = $this->welcome_model->jumlah_belum_bisa_bast();
        $data['jumlah_proses_setneg'] = $this->welcome_model->jumlah_proses_setneg();
        $data['jumlah_proses_kemenkeu'] = $this->welcome_model->jumlah_proses_kemenkeu();
        $data['jumlah_pengembalian'] = $this->welcome_model->jumlah_pengembalian();
        $data['jumlah_proses_satker'] = $this->welcome_model->jumlah_proses_satker();
        $data['jumlah_sekjen'] = $this->welcome_model->jumlah_sekjen();
        $data['jumlah_setditjen'] = $this->welcome_model->jumlah_setditjen();
        $data['jumlah_proses_lengkap'] = $this->welcome_model->jumlah_proses_lengkap();
        $data['jumlah_proses_pembuatan_bast'] = $this->welcome_model->jumlah_proses_pembuatan_bast();
        $data['jumlah_sudah_bast'] = $this->welcome_model->jumlah_sudah_bast();


        $this->load->view('layout/header', $data);
        $this->load->view('blank', $data);
        $this->load->view('layout/footer', $data);
    }

    public function get_data()
    {
        $data = $this->welcome_model->get_data();
        echo json_encode($data);
    }

    public function get_nama_provinsi()
    {
        $id = $this->input->post('id');
        $data = $this->welcome_model->get_nama_provinsi($id);
        echo json_encode($data);
    }
}
