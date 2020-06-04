<?php
class Penghunian_Model extends CI_Model
{

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

    public function get_data()
    {

        $hasil = $this->db->query('SELECT * FROM tb_bangunan GROUP BY penerima_manfaat');
        return $hasil->result();
    }
}
