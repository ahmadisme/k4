<?php
class welcome_model extends CI_Model
{
    public function get_data()
    {
        $id_page = "15";
        $hasil = $this->db->get_where('tb_provinsi', ['id_provinsi' => $id_page]);
        return $hasil->result();
    }

    public function get_id()
    {
        $this->db->from('tb_provinsi');
        $query = $this->db->get();
        return $query;
    }

    public function get_nama_provinsi($id)
    {
        $data = $this->db->get_where('tb_provinsi', ['id_provinsi' => $id]);
        return $data->result();
    }

    public function jumlah_tb()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get('tb_bangunan');
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }

    public function jumlah_belum_bisa_bast()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' => "1"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }

    public function jumlah_proses_setneg()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' =>  "5"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }


    public function jumlah_proses_kemenkeu()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' =>  "2"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }
    public function jumlah_pengembalian()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' =>  "4"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }
    public function jumlah_proses_satker()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' =>  "6"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }
    public function jumlah_sekjen()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' =>  "7"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }
    public function jumlah_setditjen()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' =>  "8"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }

    public function jumlah_proses_lengkap()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' => "3"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }
    public function jumlah_proses_pembuatan_bast()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' =>  "9"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }

    public function jumlah_sudah_bast()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_rusun' => "10"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }

    public function jumlah_huni()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_huni' => "1"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }

    public function jumlah_belum_huni()
    {
        $this->db->select_sum('tb');
        $query = $this->db->get_where('tb_bangunan', ['status_huni' => "0"]);
        if ($query->num_rows() > 0) {
            return $query->row()->tb;
        } else {
            return 0;
        }
    }
}
