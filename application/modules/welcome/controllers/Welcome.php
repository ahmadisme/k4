<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        // $this->load->model('welcome_model');
    }
    public function index()
    {
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $this->load->view('layout/header', $data);
        $this->load->view('blank', $data);
        $this->load->view('layout/footer', $data);
    }
}
