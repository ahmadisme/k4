<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Penghunian extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('Penghunian_Model');
    }
    public function index()
    {
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $data['jumlah_tb'] = $this->db->query('SELECT tb, sum(tb) AS total FROM tb_bangunan')->row();
        $data['huni'] = $this->Penghunian_Model->jumlah_huni();
        $data['belum_huni'] = $this->Penghunian_Model->jumlah_belum_huni();

        $data['rekap_tahun_anggaran'] = $this->db->query('SELECT ta,
            sum(tb) AS total,
            sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
            sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            GROUP BY ta')->result();

        $data['rekap_penerima_manfaat'] = $this->db->query('SELECT nama_penerima_manfaat,id_penerima_manfaat,
            sum(tb) AS total,
            sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
            sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            GROUP BY nama_penerima_manfaat')->result();

        $data['aceh'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "1"')->row();

        $data['kaltim'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "2"')->row();

        $data['jateng'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "3"')->row();

        $data['bengkulu'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "4"')->row();

        $data['banten'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "5"')->row();

        $data['kalbar'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "6"')->row();

        $data['babel'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "7"')->row();

        $data['bali'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "8"')->row();

        $data['jatim'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "9"')->row();

        $data['kalsel'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "10"')->row();

        $data['ntt'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "11"')->row();

        $data['sulsel'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "12"')->row();


        $data['kepri'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "13"')->row();

        $data['papbar'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "14"')->row();

        $data['sumut'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "15"')->row();

        $data['riau'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "16"')->row();

        $data['sulut'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "17"')->row();

        $data['malut'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "18"')->row();

        $data['sumbar'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "19"')->row();

        $data['maluku'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "20"')->row();

        $data['ntb'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "21"')->row();

        $data['sultra'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "22"')->row();

        $data['sulteng'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "23"')->row();

        $data['papua'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "24"')->row();

        $data['jabar'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "25"')->row();

        $data['lampung'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "26"')->row();

        $data['jakarta'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "27"')->row();

        $data['gorontalo'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "28"')->row();

        $data['yogya'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "29"')->row();

        $data['kalteng'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "30"')->row();

        $data['sumsel'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "31"')->row();

        $data['sulbar'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "32"')->row();

        $data['jambi'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "33"')->row();

        $data['kaltara'] = $this->db->query('SELECT tb,
sum(tb) AS total,
sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
FROM tb_bangunan
WHERE id_provinsi = "34"')->row();


        $this->load->view('layout/header', $data);
        $this->load->view('index', $data);
        $this->load->view('layout/footer', $data);
    }
}
