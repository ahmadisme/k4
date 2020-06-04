<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Penghunian extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        // $this->load->model('Penghunian_Model');
        // $this->load->model('Pengelolaan_Model');
        $this->load->library('upload');
    }

    public function index()
    {
        if ($this->session->userdata('email')) {
            is_logged_in();
        } else {
            $data['title'] = "Penghunian";
            $data['user'] = $this->session->userdata('email');

            $data['daftar_ta'] = $this->db->get('tb_tahun_anggaran')->result();
            $data['daftar_penerima_manfaat'] = $this->db->get('tb_penerima_manfaat')->result();



            $data['jumlah_tb'] = $this->db->query('SELECT ta,tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan')->row();

            $data['rekap_tahun_anggaran'] = $this->db->query('SELECT ta,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM v_rusun
            GROUP BY ta')->result();

            $data['rekap_penerima_manfaat'] = $this->db->query('SELECT ta,nama_penerima_manfaat,penerima_manfaat,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM v_rusun
            GROUP BY nama_penerima_manfaat')->result();

            $data['aceh'] = $this->db->query('SELECT tb,
                sum(tb) AS total,
                sum(case when status_huni= "1" then tb else 0 end) AS huni,
                sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "1"')->row();

            $data['kaltim'] = $this->db->query('SELECT tb,
                sum(tb) AS total,
                sum(case when status_huni= "1" then tb else 0 end) AS huni,
                sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "2"')->row();

            $data['jateng'] = $this->db->query('SELECT tb,
                sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "3"')->row();

            $data['bengkulu'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "4"')->row();

            $data['banten'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "5"')->row();

            $data['kalbar'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "6"')->row();

            $data['babel'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "7"')->row();

            $data['bali'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "8"')->row();

            $data['jatim'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "9"')->row();

            $data['kalsel'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "10"')->row();

            $data['ntt'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "11"')->row();

            $data['sulsel'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "12"')->row();


            $data['kepri'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "13"')->row();

            $data['papbar'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "14"')->row();

            $data['sumut'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "15"')->row();

            $data['riau'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "16"')->row();

            $data['sulut'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "17"')->row();

            $data['malut'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "18"')->row();

            $data['sumbar'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "19"')->row();

            $data['maluku'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "20"')->row();

            $data['ntb'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "21"')->row();

            $data['sultra'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "22"')->row();

            $data['sulteng'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "23"')->row();

            $data['papua'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "24"')->row();

            $data['jabar'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "25"')->row();

            $data['lampung'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "26"')->row();

            $data['jakarta'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "27"')->row();

            $data['gorontalo'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "28"')->row();

            $data['yogya'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "29"')->row();

            $data['kalteng'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "30"')->row();

            $data['sumsel'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "31"')->row();

            $data['sulbar'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "32"')->row();

            $data['jambi'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "33"')->row();

            $data['kaltara'] = $this->db->query('SELECT tb,
            sum(tb) AS total,
            sum(case when status_huni= "1" then tb else 0 end) AS huni,
            sum(case when status_huni= "0" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            WHERE provinsi = "34"')->row();


            $this->output->enable_profiler(TRUE);
            $this->load->view('layout/header', $data);
            $this->load->view('index', $data);
            $this->load->view('layout/footer', $data);
        }
    }
}
